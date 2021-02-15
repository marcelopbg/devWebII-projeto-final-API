const userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  
const adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };

  module.exports = {  userBoard, adminBoard }