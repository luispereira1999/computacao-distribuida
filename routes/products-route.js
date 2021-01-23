const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products-controller");
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
      const productsPath = globalConfig.path.UPLOADS + globalConfig.path.PRODUCTS;

      createFolderIfNotExists(uploadsPath);
      createFolderIfNotExists(productsPath);

      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg")
         cb(null, productsPath);
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


router.get("/", [validateLogin, validateUser], productsController.getByMerchant);
router.get("/:filter/:merchant", productsController.getByName);
router.post("/create", [upload.single("file"), validateLogin, validateUser, validateType.checkMerchant], productsController.create);
router.put("/edit-data/:id", [validateLogin, validateUser, validateType.checkMerchant], productsController.editData);
router.patch("/edit-photo/:id", [upload.single("file"), validateLogin, validateUser, validateType.checkMerchant], productsController.editPhoto);
router.delete("/delete/:id", [validateLogin, validateUser, validateType.checkMerchant], productsController.delete);

module.exports = router;


function createFolderIfNotExists(path) {
   if (!fs.existsSync(path))
      fs.mkdirSync(path);
}