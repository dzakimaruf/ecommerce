import { sequelize } from '../../config/config-db';
import errorHandler from './../helpers/dbErrorHandler';
import { Op } from 'sequelize';


const create = async (req, res) => {
    const products = await req.context.models.Products.create({
        prod_id: req.body.prod_id,
        prod_name: req.body.prod_name,
        prod_desc: req.body.prod_desc,
        prod_price: req.body.prod_price,
        prod_stock: req.body.prod_stock,
        prod_expire: req.body.prod_expire,
        prod_weight: req.body.prod_weight,
        prod_category: req.body.prod_category,
        prod_brand: req.body.prod_brand,
        prod_condition: req.body.prod_condition,
        prod_total_sold: req.body.prod_total_sold,
        prod_rating: req.body.prod_rating,
        prod_views:req.body.prod_views,
        prod_user_id:req.body.prod_user_id
    });
    return res.send(products);
}

const update = async (req, res) => {
    const products = await req.context.models.Products.update(
        {
            prod_id: req.body.prod_id,
            prod_name: req.body.prod_name,
            prod_desc: req.body.prod_desc,
            prod_price: req.body.prod_price,
            prod_stock: req.body.prod_stock,
            prod_expire: req.body.prod_expire,
            prod_weight: req.body.prod_weight,
            prod_category: req.body.prod_category,
            prod_brand: req.body.prod_brand,
            prod_condition: req.body.prod_condition,
            prod_total_sold: req.body.prod_total_sold,
            prod_rating: req.body.prod_rating,
            prod_views:req.body.prod_views,
            prod_user_id:req.body.prod_user_id

        },
        { returning: true, where: { prod_id: req.params.id } }
    );
    return res.send(products);
}

const findAll = async (req, res) => {
    const products = await req.context.models.Products.findAll(
        {
            include: [{
                all: true
            }]
        }
    );
    return res.send(products);
}
const findOne = async (req, res, next) => {
    try {
        const products = await req.context.models.Products.findOne({
            include: [{ all: true }],
            where: { prod_id: req.body.prod_id }
        });
        req.products = products
        next()
    } catch (error) {
        console.log(error);
    }

}
const findOne1 = async (req, res, next) => {
    const { item } = req.data

    let price = 0;
    let discount = 0;

    for (let x of item) {
        const products = await req.context.models.Products.findOne({
            //create body cors_id 
            where: { prod_id: x.lite_prod_id }
        })
        price = products.prod_price

        if (x.lite_qty > 2) {
            discount = price * 0.05;
        }
    }

    req.price = {
        harga: price,
        discount: discount
    }

    next()
}

const remove = async (req, res) => {
    await req.context.models.Products.destroy({
        where: { prod_id: req.params.id }
    }).then(result => {
        console.log(result);
        return res.send("delete " + result + " rows.");
    });

}
const rawSQL = async (req, res) => {
    await sequelize.query('SELECT * FROM regions where prod_id = :prodId',
        { replacements: { prodId: parseInt(req.params.id) }, type: sequelize.QueryTypes.SELECT }
    ).then(result => {
        return res.send(result);
    })
}
const findOne2 = async (req, res) => {

    const products = await req.context.models.Products.findOne({
        include: {
            all: true,
        },
        where: { prod_id: req.params.id }
    });
    return res.send(products);

}
//1. Upload Photo
const createImages = async (req, res, next) => {

    const workingDir = process.cwd()+"../../uploads/";

     if (!fs.existsSync(workingDir)) {
        fs.mkdirSync(workingDir);
    } 

    const form = formidable({
        multiples: true,
        uploadDir: workingDir,
        keepExtensions: true
    });

    form
    .on('fileBegin', function (name, file) {
        file.path = workingDir + file.name;
    })
    .parse(req, async (err, fields, files) => {
        const prim = fields;
        //const empImage = files;

        // insert into employee models

        const prims ={
            prod_id : prim.prod_id,
            primImages : files
        }
        req.prims = prims;
        next();
    })
}
const check = async (req, res) => {
    const result = await req.context.models.Products.findOne({
        where: { prod_id: req.params.id }
    });
    return res.send(result);
}
const findAllSearch = async (req, res) => { 
    const {prod_title} = req.query
    try {
        const product = await req.context.models.Products.findAll(
            { where : {prod_title: {[Op.iLike]: `%${prod_title}%`}},
                include: [{
                    model: req.context.models.Products_images
                }],
            }
            );
            return res.send(product);
    } catch (error) {
        return res.send(error)
    }   
  }

export default {
    findAll,
    findOne,
    findOne1,
    findOne2,
    create,
    createImages,
    update,
    remove,
    rawSQL,
    check,
    findAllSearch
}