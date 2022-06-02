const db = require("../models");
const User = db.user;

// Used to check if the email & the username are already used
checkDuplicate = (req, res, next) => {
    const { username } = req.body;
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
        User.findOne({
            email: req.body.email
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
