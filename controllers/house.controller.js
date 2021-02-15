const db = require("../models");
const House = db.house;

const getHouses = (req, res, next) => {
    House.findAll().then(houses => {
       res.send(houses);
    })
    .catch(function(err){
        console.log('DB ERROR: '+err.message);
        res.status(500);
        next(err);
    });
  };

  module.exports = {  getHouses }