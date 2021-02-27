const db = require("../models");
const Rent = db.rent;

const storeRent = (req, res, next) => {
  console.log(JSON.stringify(req.body, null, 2));
  return Rent.create({
      ...req.body
  })
    .then(rent => {
        res.send({ message: rent});
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

module.exports = { storeRent }