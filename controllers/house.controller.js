const db = require("../models");
const House = db.house;
const { Op } = require("sequelize");
const getHouses = (req, res, next) => {
    if (req.query) {
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

const uploadHousePicture = (req, res, next) => {
    const { INIT_CWD } = process.env;
    let imageFile = req.files.file;
    const fileName = `${imageFile.name.slice(0, imageFile.name.lastIndexOf('.'))}-${new Date().getTime()}`;
    const ext = imageFile.name.slice(imageFile.name.lastIndexOf('.'), imageFile.name.length);
    imageFile.mv(`${INIT_CWD}/public/${fileName}${ext}`, function (err) {
      if (err) {
        return res.status(500).send(err);
      }
      res.json({file: `/public/${fileName}${ext}`});
    });
}

module.exports = { getHouses, uploadHousePicture }