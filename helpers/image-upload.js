const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: async function(req, file, cb) {
        cb(null, 'public/images/');
    },
    filename: async function(req, file, cb) {
        var date = await new Date()
        date = await date.toString()

        var file = await path.parse(file.originalname).name + "-" + date + '-'  + path.extname(file.originalname)
        await cb(null, file);
        
    }
});

const upload = multer({
    storage: storage
});

module.exports.upload = upload;