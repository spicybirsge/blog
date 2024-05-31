const AUTHORIZATION_KEY = process.env.AUTHORIZATION_KEY;
const safeCompare = require('safe-compare');
const authorize = async(req, res , next) => {
    const authHeader = req.header("authorization")
    if(!authHeader) {
        return res.status(401).json({success: false, message: "Unauthorized", code: 401})
    }
    const token = authHeader.split(' ')[1];

    const isTokenCorrect = safeCompare(token, AUTHORIZATION_KEY);

    /*For anyone wondering why we use safe compare instead of directly checking if it is equal it is for
    preventing a vulnerabuility called 'timing attack'. Refer to https://snyk.io/blog/node-js-timing-attack-ccc-ctf/ for more
    information if you are interested!
    */

    if(!isTokenCorrect) {
        return res.status(401).json({success: false, message: "Unauthorized", code: 401})
    }

    return next()
}

module.exports = authorize;