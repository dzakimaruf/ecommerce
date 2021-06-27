import Sequelize from 'sequelize';
import { sequelize } from '../../config/config-db';
import users from './users';
import orders from './orders';
import line_items from './line_items';
import products from './products';
import shopping_cart from './shopping_cart';
import products_images from './products_images';


const models = {
    Users: users(sequelize, Sequelize),
    Products: products(sequelize, Sequelize),
    Orders: orders(sequelize, Sequelize),
    Shopping_cart: shopping_cart(sequelize, Sequelize),
    Line_items: line_items(sequelize, Sequelize),
    Products_images: products_images(sequelize, Sequelize),
}

Object.keys(models).forEach(key => {
    if ('associate' in models[key]) {
        models[key].associate(models);
    }
});

export default models;