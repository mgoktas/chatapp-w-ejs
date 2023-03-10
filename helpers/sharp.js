const sharp = require("sharp");
const path = require('path')

exports.reSizeImage = async function reSizeImage(file) {
  try {
    const metadata = await sharp(file).metadata();
    await sharp(file)
      .resize({
        width: 100,
        height: 100
      })
      .toFile('./public/images/' + path.parse(file).name + '0.' + metadata.format);
  } catch (error) {
    console.log(error);
  }
}

module.exports