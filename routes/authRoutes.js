const controller = require("../controllers/authController");
const { checkDuplicate } = require("../middlewares/registerMiddleware");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/register",
    [
      checkDuplicate,
    ],
    controller.register
  );
  app.post("/login", controller.login);
  app.post("/signout", controller.signout);

};
