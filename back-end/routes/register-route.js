const express = require("express");
const router = express.Router();
const registerController = require("../controllers/register-controller");

const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
   destination: async (req, file, cb) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" && req.route.path == "/merchant")
         cb(null, "./back-end/uploads/photos/");
      else if
         (file.mimetype == "application/pdf" && req.route.path == "/driver")
         cb(null, "./back-end/uploads/driving-licenses/");
      else {
         cb(null, "");
      }
   },
   filename: async (req, file, cb) => {
      var fileExtension = path.extname(file.originalname)
      var currentDate = new Date();
      var formatDate = currentDate.getDate() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getFullYear() + "_" + currentDate.getHours() + "_" + currentDate.getMinutes();

      cb(null, formatDate + fileExtension);
   },
   onError: (err, next) => {
      console.log("error", err);
      next(err);
   }
})
const fileFilter = async (req, file, cb) => {
   if (file.mimetype == "application/pdf" || file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg")
      cb(null, true);
   else
      cb(null, false);
}
const upload = multer({
   "storage": storage,
   "fileFilter": fileFilter
});

router.post("/client", registerController.registerClient);
router.post("/merchant", upload.single("file"), registerController.registerMerchant);
router.post("/driver", upload.single("file"), registerController.registerDriver);
router.post("/admin", registerController.registerAdmin);

module.exports = router;