const jwt = require("jsonwebtoken");
const secret = require("../config/auth.secret");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      message: "Token não recebido!"
    });
  }

  jwt.verify(token, secret, (err, decoded) => {
    console.log(err);
    if (err) {
      return res.status(401).send({
        message: "Ação não autorizada!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "Administrador") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Ação exclusiva para administrador!"
      });
      return;
    })
  });
};

isUser = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "Corretor") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "É necessário ser corretor para executar esta ação "
      });
    });
  });
};

isUserOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "Administrador" || roles[i].name === "Corretor") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "É necessário ser administrador ou moderador para executar esta ação"
      });
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isUser: isUser,
  isUserOrAdmin: isUserOrAdmin
};
module.exports = authJwt;
