const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products-controller");
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

      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" && req.route.path == "/create")
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


router.get("/", productsController.getAll);
router.get("/:id", productsController.getById);
router.get("/:filter/:name", productsController.getByName);
router.post("/create", [upload.single("file"), validateLogin, validateUser, validateType.checkMerchant], productsController.create);
router.patch("/edit-data/:id", [validateLogin, validateUser, validateType.checkMerchant], productsController.edit);
router.delete("/delete/:id", [validateLogin, validateUser, validateType.checkMerchant], productsController.delete);

module.exports = router;


function createFolderIfNotExists(path) {
   if (!fs.existsSync(path))
      fs.mkdirSync(path);
}