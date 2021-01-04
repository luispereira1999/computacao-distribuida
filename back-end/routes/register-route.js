const express = require("express");
const router = express.Router();
const registerController = require("../controllers/register-controller");

const multer = require("multer");
const path = require("path");
const fs = require("fs");
const storage = multer.diskStorage({
   destination: async (req, file, cb) => {
      const uploadsPath = "./back-end/uploads/";
      const photosPath = "./back-end/uploads/photos/";
      const drivingLicensesPath = "./back-end/uploads/driving-licenses/";

      createFolderIfNotExists(uploadsPath);
      createFolderIfNotExists(photosPath);
      createFolderIfNotExists(drivingLicensesPath);

      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" && req.route.path == "/merchant")
         cb(null, photosPath);
      else if (file.mimetype == "application/pdf" && req.route.path == "/driver")
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
   if (file.mimetype == "application/pdf" || file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg")
      cb(null, true);
   else
      cb(null, false);
};
const upload = multer({
   "storage": storage,
   "fileFilter": fileFilter
});


router.post("/client", registerController.registerClient);
router.post("/merchant", upload.single("file"), registerController.registerMerchant);
router.post("/driver", upload.single("file"), registerController.registerDriver);
router.post("/admin", registerController.registerAdmin);

module.exports = router;


function createFolderIfNotExists(path) {
   if (!fs.existsSync(path))
   fs.mkdirSync(folder);
}