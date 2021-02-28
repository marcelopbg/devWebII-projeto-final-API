const db = require("../models");
const House = db.house;
const { Op } = require("sequelize");

const getHouses = (req, res, next) => {
    if (req.query) {
        let mappedWhere = {}
        Object.entries(req.query).map(([key, value]) => {
            if (Array.isArray(value)) {
                if (value[0] === "between") {
                    mappedWhere[key] = { [Op.between]: [value[1], value[2]] }
                }
                if (value[0] == "dateRangeBetween") {
                    mappedWhere.availableForRentStartDate = { [Op.lte]: new Date(value[1]) };
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

const storeHouse = (req, res, next) => {
    if (req.files.file) {
        const apiUrl = req.protocol+"://"+req.headers.host;
        uploadHousePicture(req.files.file, apiUrl).then(response => {
            return House.create({
                ...req.body,
                imageUrl: response
            })
                .then(house => {
                    res.send({ message: house });
                })
                .catch(err => {
                    res.status(500).send({ message: err.message });
                });
        })
        return;
    }
    return House.create({
        ...req.body
    })
        .then(house => {
            res.send({ message: house });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

const uploadHousePicture = (file, apiUrl) => {
    return new Promise((resolve) => {
        const { INIT_CWD } = process.env;
        let imageFile = file;
        const fileName = `${imageFile.name.slice(0, imageFile.name.lastIndexOf('.'))}-${new Date().getTime()}`;
        const ext = imageFile.name.slice(imageFile.name.lastIndexOf('.'), imageFile.name.length);
        imageFile.mv(`${INIT_CWD}/public/${fileName}${ext}`, () => {
            resolve(`${apiUrl}/public/${fileName}${ext}`);
        });
    })
}
module.exports = { getHouses, storeHouse }