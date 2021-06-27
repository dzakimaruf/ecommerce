import { sequelize } from '../../config/config-db';
import Shopping_cart from '../models/Shopping_cart';
import Line_items from '../models/line_items';


const createc = async (req, res, next) => {
    try {
        const user = req.user
        let cart = req.cart
        if (!cart) {
            cart = await req.context.models.Shopping_cart.create(
                {
                    shop_status: "open",
                    shop_user_id: user.user_id,
                    shop_created_on: new Date()
                }
            );
        }
        req.cart = cart
        next()
    } catch (error) {
        return res.send(error)
    }
}

const findOne = async (req, res, next) => {
    try {

        const shopping_cart = await req.context.models.Shopping_cart.findOne({

            include: {
                all: true,
            },
            where: {
                shop_user_id: req.params.id,
                shop_status: "open"
            }
        });
        req.cart = shopping_cart
        next();

    } catch (error) {
        console.log(error)
    }
}


const update = async (req, res) => {
    const { shop_id, shop_created_on, shop_status, shop_user_id } = req.body;
    const shopping_cart = await req.context.models.Shopping_cart.update(
        {
            shop_id: shop_id,
            shop_created_on: shop_created_on,
            shop_status: shop_status,
            shop_user_id: shop_user_id,
        },
        { returning: true, where: { shop_id: req.params.id } }
    );
    return res.send(shopping_cart);
}

const update1 = async (req, res, next) => {
    const { shop_id } = req.data;
    const shopping_cart = await req.context.models.Shopping_cart.update(
        {
            shop_id: shop_id,
            shop_status: "closed",
        },
        { returning: true, where: { shop_id: shop_id } }
    );

    next();
}
const findOne1 = async (req, res) => {
    const shopping_cart = await req.context.models.Shopping_cart.findOne({
        include: {
            all: true
        },
        where: {
            shop_user_id: req.params.id,
            shop_status: "open"
        }
    });
    return res.send(shopping_cart);
}
const checkCart = async (req, res, next) => {
    const shopping_cart = await req.context.models.Shopping_cart.findOne({
        include: [{
            all: true
        }],
        where: {
            shop_user_id: req.body.order_user_id,
            shop_status: "open"
        }
    });
    req.data = {
        shop_id: shopping_cart.shop_id,
        item: shopping_cart.line_items,
        qty: shopping_cart.lite_id
    }

    next();
}

const remove = async (req, res) => {
    await req.context.models.Shopping_cart.destroy({
        where: { shop_id: req.params.id }
    }).then(result => {
        console.log(result);
        return res.send("delete " + result + " rows.");
    });

}
export default {
    createc,
    findOne,
    findOne1,
    checkCart,
    update1,
    update,
    remove
}