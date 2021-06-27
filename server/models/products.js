const products = (sequelize, DataTypes) => {
  const Products = sequelize.define('products', {
    prod_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    prod_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    prod_desc: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    prod_price: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    prod_stock: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    prod_expire: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    prod_weight: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    prod_category: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    prod_brand: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    prod_condition: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    prod_total_sold: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    prod_rating: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    prod_views: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    prod_user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    }
  }, {
    sequelize,
    tableName: 'products',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "products_pkey",
        unique: true,
        fields: [
          { name: "prod_id" },
        ]
      },
    ]
  });
  Products.associate = models => {
    Products.hasMany(models.Line_items,{foreignKey: 'lite_prod_id', onDelete: 'CASCADE'});
    Products.hasMany(models.Products_images,{foreignKey: 'prim_prod_id', onDelete: 'CASCADE'});
    Products.belongsTo(models.Users,{foreignKey: 'prod_user_id'});
  };
  
  return Products
};

export default products;


