import formidable from "formidable";
import fs from "fs";
import path from 'path'

//1.declare pathDir untuk menyimpan image di local storage
const pathDir = path.join(process.cwd(), "/uploads/");

const upload = async (req, res, next) => {
  // jika directory belum ada then create new one
  if (!fs.existsSync(pathDir)) {
    fs.mkdirSync(pathDir);
  }

  const form = formidable({ multiples: true, uploadDir: pathDir });
  form.parse(req);
  form
    .on("fileBegin", (keyName, file) => {
      console.log(keyName, file);
      file.path = path.join(`${pathDir}`, file.name);
    })
    .on("field", (keyName, value) => {
      console.log(keyName, value);
    })
    .on("file", (keyName, file) => {
      console.log(keyName, file.name);
      req.fileName = file.name;
    })
    .on("end", () => {
      console.log("-> upload to storage done");
      next();
      //res.send("File Uploaded Successfully");
    });
};

const uploadMultipart = async (req, res, next) => {
  // jika directory belum ada then create new one
  if (!fs.existsSync(pathDir)) {
    fs.mkdirSync(pathDir);
  }

  const files = [];
  const fields = [];

  const dataFiles = {
    fields: fields,
    files: files,
  };

  //1. gunakan spread operator
  const dataProductsimage = [];
  let multipart = {};
  let primId = undefined;
  let primName = undefined;

  const form = formidable({ multiples: true, uploadDir: pathDir });
  form.parse(req);

  form
    .on("fileBegin", (keyName, file) => {
      file.path = pathDir + file.name;
    })
    .on("field", (keyName, value) => {
      fields.push({ keyName, value });
      //2.gunakan spread operator untuk tambah attribute
      primId = keyName === "prim_prod_id" ? value : primId;
      primName = keyName === "prod_name" ? value : primName;
      multipart = { ...multipart, primId, primName };
    })
    .on("file", (keyName, file) => {
      //file.path = path.join(pathDir, file.name)
      console.log(file);
      const fileName = file.name;
      const fileSize = file.size;
      const fileType = file.type;
      files.push({ keyName, fileName, fileSize,  fileType });
      //3. gunakan spread operator
      multipart = { ...multipart, fileName,  fileSize, fileType };
      dataProductsimage.push(multipart);
    })
    .on("end", () => {
      console.log("-> upload to storage done");
      //2. kirim dataFiles ke function lain di object req
      req.dataFiles = dataFiles;

      //4.gunakan spread operator
      req.dataProductsimage = dataProductsimage;

      next();
    });
};

const download = async (req, res) => {
  const filename = `${pathDir}/${req.params.filename}`;
  res.download(filename);
};

const photo = (req,res)=>{
  return res.sendFile(process.cwd())
}
export default {
  upload,
  download,
  uploadMultipart,
  photo
};