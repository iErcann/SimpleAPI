const db = require("../models");
const User = db.user;


function isEmailValid(email) {
    const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    if (!email)
        return false;

    if (email.length > 254)
        return false;

    var valid = emailRegex.test(email);
    if (!valid)
        return false;

    // Further checking of some things regex can't handle
    var parts = email.split("@");
    if (parts[0].length > 64)
        return false;

    var domainParts = parts[1].split(".");
    if (domainParts.some(function (part) { return part.length > 63; }))
        return false;

    return true;
}

// Used to check if the email & the username are already used
checkDuplicate = (req, res, next) => {
    const { username, email } = req.body;
    User.findOne({
        username
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (user) {
            res.status(400).send({ message: "This username is already used." });
            return;
        }

        if (!isEmailValid(email)) {
            res.status(400).send({ message: "Invalid email." })
            return;
        }

        User.findOne({
            email 
        }).exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (user) {
                res.status(400).send({ message: "This email is already used." });
                return;
            }

            next();
        });
    });
};



module.exports = {
    checkDuplicate
};
