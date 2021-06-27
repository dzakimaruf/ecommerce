const line_items = (sequelize, DataTypes) => {
    const Line_items = sequelize.define('line_items', {
        lite_id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        lite_qty: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        lite_status: {
            type: DataTypes.STRING(15),
            allowNull: true
        },
        lite_order_name: {
            type: DataTypes.STRING(50),
            allowNull: true,
            references: {
                model: 'orders',
                key: 'order_name'
            }
        },
        lite_price: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        lite_prod_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'products',
                key: 'prod_id'
            },
            unique: "line_items_lite_shop_id_lite_prod_id_key"
        },
        lite_shop_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'shopping_cart',
                key: 'shop_id'
            },
            unique: "line_items_lite_shop_id_lite_prod_id_key"
        }
    }, {
        sequelize,
        tableName: 'line_items',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "line_items_lite_shop_id_lite_prod_id_key",
                unique: true,
                fields: [
                    { name: "lite_shop_id" },
                    { name: "lite_prod_id" },
                ]
            },
            {
                name: "line_items_pkey",
                unique: true,
                fields: [
                    { name: "lite_id" },
                ]
            },
        ]
    });
    Line_items.associate = models => {
        Line_items.belongsTo(models.Orders, { foreignKey: 'lite_order_name' });
        Line_items.belongsTo(models.Products, { foreignKey: 'lite_prod_id' });
        Line_items.belongsTo(models.Shopping_cart, { foreignKey: 'lite_shop_id' });
    };
    return Line_items
};
export default line_items;