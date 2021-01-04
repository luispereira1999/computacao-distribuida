const express = require("express");
const router = express.Router();
const userController = require("../controllers/users-controller");
const validateLogin = require("../middlewares/authenticate");
const validateUser = require("../middlewares/active");
const validateType = require("../middlewares/type");

const multer = require("multer");
const path = require("path");
const fs = require("fs");
const storage = multer.diskStorage({
   destination: async (req, file, cb) => {
      const uploadsPath = "./back-end/uploads/";
      const photosPath = "./back-end/uploads/photos/";

      createFolderIfNotExists(uploadsPath);
      createFolderIfNotExists(photosPath);

      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg")
         cb(null, photosPath);
      else
         cb(null, "");
   },

   filename: async (req, file, cb) => {
      var fileExtension = path.extname(file.originalname)
      var currentDate = new Date();
      var formatDate = currentDate.getDate() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getFullYear() + "_" + currentDate.getHours() + "_" + currentDate.getMinutes() + "_" + currentDate.getSeconds();

      cb(null, formatDate + fileExtension);
   }
});

const fileFilter = async (req, file, cb) => {
   if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg")
      cb(null, true);
   else
      cb(null, false);
};
const upload = multer({
   "storage": storage,
   "fileFilter": fileFilter
});


router.post("/account", [validateLogin, validateUser], userController.view);
router.patch("/edit-photo", [upload.single("file"), validateLogin, validateUser], userController.editPhoto);
router.get("/not-accepted", [validateLogin, validateUser, validateType.checkAdmin], userController.getByNotAccepted);
router.patch("/accept/:id", [validateLogin, validateUser, validateType.checkAdmin], userController.accept);
router.patch("/set-admin/:id", [validateLogin, validateUser, validateType.checkAdmin], userController.setAdmin);
router.patch("/remove-admin/:id", [validateLogin, validateUser, validateType.checkAdmin], userController.removeAdmin);
router.delete("/delete/:id", [validateLogin, validateUser, validateType.checkAdmin], userController.delete);

module.exports = router;


function createFolderIfNotExists(path) {
   if (!fs.existsSync(path))
      fs.mkdirSync(path);
}