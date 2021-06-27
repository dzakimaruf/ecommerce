const products_images = (sequelize, DataTypes) => {
  const Products_images = sequelize.define('products_images', {
    prim_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    prim_filename: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    prim_filesize: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    prim_filetype: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    prim_primary: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    prim_prod_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'products',
        key: 'prod_id'
      }
    }
  }, {
    sequelize,
    tableName: 'products_images',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "products_images_pkey",
        unique: true,
        fields: [
          { name: "prim_id" },
        ]
      },
    ]
  });
  Products_images.associate = models => {
    Products_images.belongsTo(models.Products,{foreignKey: 'prim_prod_id'});
  };
  return Products_images
};
export default products_images; 