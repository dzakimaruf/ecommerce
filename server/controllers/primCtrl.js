import formidable from "formidable";
import fs from "fs";



const pathDir = __dirname + "../../uploads/";

const update = async (req, res) => {
  console.log(req.fileName);
  const result = await req.context.models.Products_images.update(
    { profile: req.fileName },
    { returning: true, where: { prod_id: parseInt(req.params.id) } }
  );
  return res.send(result);
};
const create = async (req, res, next) => {
  // jika gunakan spread operator
  const dataProductsimage = req.dataProductsimage;

  for (const data of dataProductsimage) {
    await createImage(req, res, data);
  }

  // using middleware
  //return res.send(dataProductsimage)
  next()
};
const remove = async (req, res) => {
  const products_images = await req.context.models.Products_images.destroy({
    where: { prim_id: req.params.id },
  });

  return res.send(true);
};


const createImage = async (req, res, data) => {
  const { primId, fileName, fileSize, fileType, primary } = data;
  await req.context.models.Products_images.create({

    prim_filename: fileName,
    prim_filesize: fileSize,
    prim_filetype: fileType,
    prim_primary: primary,
    prim_prod_id: primId
  }).catch((error) => {
    console.log(error);
  });
};

const findAll = async (req, res) => {
  const Products_images = await req.context.models.Products_images.findAll(
    {
      // include: [{
      //     model: req.context.models.Products_images
      // }],
      order: [
        ['prim_prod_id']
      ],
    }
  );
  return res.send(Products_images);
}
//buat image
const findOne = async (req, res) => {
   
  const products_images = await req.context.models.Products_images.findOne({
      include:{
          all:true,
  },
      where: { prim_id: req.params.id }
  });
  return res.send(products_images);

}

const createFileType = async (req, res) => {
  // jika directory belum ada then create new one
  if (!fs.existsSync(pathDir)) {
    fs.mkdirSync(pathDir);
  }

  const form = formidable({
    multiples: true,
    uploadDir: pathDir,
    keepExtensions: true
  });

  form
    .on("filebegin", function (name, file) {
      file.path = pathDir + file.name;

    })
    .parse(req, async (err, fields, files) => {
      if (err) {
        res.status(400).json({
          message: "Image tidak bisa diupload"
        });
      }
      let products_images = new req.context.models.Products_images(fields);
      if (files) {
        products_images.prim_filename = files.image.name;
        products_images.prim_filetype = files.image.type;
        products_images.prim_filesize = files.image.size;

        console.log(products_images);
      }
      try {
        const result = await req.context.models.Products_images.create(products_images.dataValues);
        return res.send(result)
      } catch (error) {
        res.send(error.message)

      }

    });
}

export default {
  update,
  create,
  findAll,
  findOne,
  remove,
  createImage,
  createFileType,
  
};