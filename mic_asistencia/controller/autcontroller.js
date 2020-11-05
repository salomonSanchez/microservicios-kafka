const jwt = require('jsonwebtoken');

function isAuthorized(req, res, next) {
    if (typeof req.headers.authorization !== "undefined") {
        let authHeader = req.headers.authorization.split(" ");
        if (authHeader.length == 2) {
            let token = authHeader[1];
            let privateKey = "PASSWORD";

            jwt.verify(token, privateKey, { algorithm: "HS256" }, (err, decoded) => {
                if (err) {
                    res.status(500).json({ error: "NoToken no valido" })
                }
                console.log(decoded);
                return next();
            })
        } else {
            res.status(500).json({ error: "Token de autorización incorrecta; example : Bearer {token}" });
        }

    } else {
        res.status(500).json({ error: "No tiene autorizacion" });
    }
}

module.exports = isAuthorized;