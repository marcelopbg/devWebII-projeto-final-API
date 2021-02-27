const authJwt = require("../middleware/authJwt");
const controller = require("../controllers/house.controller");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/house",
    [authJwt.verifyToken,
    authJwt.isUserOrAdmin],
    controller.getHouses
  );

  app.post('/api/house/upload',
    controller.uploadHousePicture
  );
};