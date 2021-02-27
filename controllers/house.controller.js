const db = require("../models");
const House = db.house;
const { Op } = require("sequelize");
const getHouses = (req, res, next) => {
    if (req.query) {
        console.log(req.query);
        let mappedWhere = {}
        Object.entries(req.query).map(([key, value]) => {
            if (Array.isArray(value)) {
                if(value[0] === "between") {
                    mappedWhere[key] = { [Op.between]: [value[1], value[2]] }
                }
                if(value[0] == "dateRangeBetween") {
                    mappedWhere.availableForRentStartDate = {[Op.lte]: new Date(value[1])};
                    mappedWhere.availableForRentEndDate = { [Op.gte]: new Date(value[2]) }
                }
            } else {
                mappedWhere[key] = value;
            }
            console.log(mappedWhere);
        })
        House.findAll({
            where:
                mappedWhere
        }).then(houses => {
            res.send(houses);
        })
            .catch(function (err) {
                console.log('DB ERROR: ' + err.message);
                res.status(500);
                next(err);
            });
        return;
    }
    House.findAll().then(houses => {
        res.send(houses);
    })
        .catch(function (err) {
            console.log('DB ERROR: ' + err.message);
            res.status(500);
            next(err);
        });
};


const storeHouse = (req, res, next) => {
    return House.create({
        ...req.body
    })
        .then(house => {
            res.send({ message: house});
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
 }

module.exports = { getHouses, storeHouse }