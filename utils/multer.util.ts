const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
});

const multerUtil = {
  upload
};
export default multerUtil;