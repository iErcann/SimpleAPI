const db = require("../models");
const config = require("../config");
const User = db.user;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");



const register = (req, res) => {
    console.log(req.body);
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    });
    user.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        user.save((err) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            res.send({ message: "User was registered successfully!" });
        });
    });
};



const login = (req, res) => {
    const { username } = req.body;

    User.findOne({
        username,
    })
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (!user) {
                return res.status(404).send({ message: "User was not found." });
            }
            const passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );
            if (!passwordIsValid) {
                return res.status(401).send({ message: "Invalid password!" });
            }

            // 24 hours
            const token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400,
            });
            req.session.token = token;

            res.status(200).send({
                id: user._id,
                username: user.username,
                email: user.email,
                token: token
            });
        });
};



const signout = async (req, res) => {
    try {
        req.session = null;
        return res.status(200).send({ message: "You've been signed out!" });
    } catch (err) {
        this.next(err);
    }
};

module.exports = {
    register, login, signout
};
