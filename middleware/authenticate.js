let jwt = require("jsonwebtoken");

let authenticate = async (req, res, next) => {
    try {
        let token = req.headers.authorization?.split(" ")[1];

        if (token) {
            let decode = jwt.verify(token, process.env.SECRET_KEY_FOR_LOGIN_VERIFY);
            console.log(decode);

            if (decode) {
                req.userID = decode.userID;
                next();
            } else {
                res.status(401).send({ msg: "Invalid token" });
            }
        } else {
            res.status(401).send({ msg: "No token provided" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ msg: "Internal server error" });
    }
};

module.exports = {
    authenticate
};
