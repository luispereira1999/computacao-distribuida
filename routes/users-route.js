const express = require("express");
const router = express.Router();
const userController = require("../controllers/users-controller");
const validateLogin = require("../middlewares/authenticate");
const validateUser = require("../middlewares/active");
const validateType = require("../middlewares/type");
const globalConfig = require("../utils/global-config.json");

const multer = require("multer");
const path = require("path");
const fs = require("fs");
const storage = multer.diskStorage({
   destination: async (req, file, cb) => {
      const uploadsPath = globalConfig.path.UPLOADS;
      const photosPath = globalConfig.path.UPLOADS + globalConfig.path.PHOTOS;
      const drivingLicensesPath = globalConfig.path.UPLOADS + globalConfig.path.DRIVING_LICENSES;

      createFolderIfNotExists(uploadsPath);
      createFolderIfNotExists(photosPath);
      createFolderIfNotExists(drivingLicensesPath);

      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg")
         cb(null, photosPath);
      else if (file.mimetype == "application/pdf")
         cb(null, drivingLicensesPath);
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
   if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "application/pdf")
      cb(null, true);
   else
      cb(null, false);
};
const upload = multer({
   "storage": storage,
   "fileFilter": fileFilter
});


router.get("/account", [validateLogin, validateUser], userController.account);
router.get("/get-user/:id", userController.getUser);
router.get("/get-merchants/:quantity", userController.getMerchants);
router.get("/accepted", [validateLogin, validateUser, validateType.checkAdmin], userController.getByAccepted);
router.get("/not-accepted", [validateLogin, validateUser, validateType.checkAdmin], userController.getByNotAccepted);
router.put("/edit-data", [validateLogin, validateUser], userController.editData);
router.patch("/edit-password", [validateLogin, validateUser], userController.editPassword);
router.patch("/edit-photo", [upload.single("file"), validateLogin, validateUser], userController.editPhoto);
router.patch("/edit-driving-license", [upload.single("file"), validateLogin, validateUser, validateType.checkDriver], userController.editDrivingLicense);
router.patch("/accept/:id", [validateLogin, validateUser, validateType.checkAdmin], userController.accept);
router.patch("/set-admin/:id", [validateLogin, validateUser, validateType.checkAdmin], userController.setAdmin);
router.patch("/remove-admin/:id", [validateLogin, validateUser, validateType.checkAdmin], userController.removeAdmin);
router.delete("/delete", [validateLogin, validateUser], userController.delete);

module.exports = router;


function createFolderIfNotExists(path) {
   if (!fs.existsSync(path))
      fs.mkdirSync(path);
}