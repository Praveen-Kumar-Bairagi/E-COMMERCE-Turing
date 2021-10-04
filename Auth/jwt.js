 

const jwt = require("jsonwebtoken")
exports.generateAccessToken = (username) => {
    return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1000s' });
}


exports.authenticateToken = (req, res, next) => {
    if (req.headers.cookie == undefined) {
        console.log({ message: 'Token not found' });
        return res.status(403).json({ message: 'JWT EXPIRED' })
    }
const token = req.headers.cookie.split('=')[1]
  jwt.verify(token, process.env.TOKEN_SECRET, (err, data) => {
        if (err) {
            console.log({ message: "JWT expired" });
            return res.status(401).json({ message: "UNAUTHORIZED ACCESS" })
        }
        req.data=data
        next()
    })

}
