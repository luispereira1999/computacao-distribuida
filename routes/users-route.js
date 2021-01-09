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


router.post("/account", [validateLogin, validateUser], userController.view);
router.patch("/edit-data", [validateLogin, validateUser], userController.editData);
router.put("/edit-photo", [upload.single("file"), validateLogin, validateUser], userController.editPhoto);
router.put("/edit-driving-license", [upload.single("file"), validateLogin, validateUser, validateType.checkDriver], userController.editDrivingLicense);
router.get("/not-accepted", [validateLogin, validateUser, validateType.checkAdmin], userController.getByNotAccepted);
router.put("/accept/:id", [validateLogin, validateUser, validateType.checkAdmin], userController.accept);
router.put("/set-admin/:id", [validateLogin, validateUser, validateType.checkAdmin], userController.setAdmin);
router.put("/remove-admin/:id", [validateLogin, validateUser, validateType.checkAdmin], userController.removeAdmin);
router.delete("/delete", [validateLogin, validateUser], userController.delete);

module.exports = router;


function createFolderIfNotExists(path) {
   if (!fs.existsSync(path))
      fs.mkdirSync(path);
}