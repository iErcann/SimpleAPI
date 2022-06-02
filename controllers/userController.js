const db = require("../models");
const User = db.user;

const allAccess = (req, res) => {
    User.find({}).select("-password").exec((err, docs) => {
        if (err) {
            throw err;
        }
        res.status(200).send(docs);
    })
};


const user = (req, res) => {
    const { username } = req.params;
    User.findOne({ username: username }).select("-password").exec((err, user) => {
        if (err) {
            throw err;
        }
        if (user) {
            res.status(200).send(user);
        } else {
            res.status(400).send("No user found with that name.");
        }
    });
};

module.exports = {
    user, allAccess
};
