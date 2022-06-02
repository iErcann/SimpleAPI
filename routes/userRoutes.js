const userController = require("../controllers/userController");
const { verifyToken } = require("../middlewares/authMiddleware");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/users", [verifyToken], userController.allAccess);
  app.get("/user/:username", [verifyToken], userController.user);
};
