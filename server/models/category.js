
export default (sequelize, DataTypes) => {
  // defines category attribute
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter a category',
      },
    },
  },
  { paranoid: true }
  );

  // defines associations for category
  Category.associate = (models) => {
    Category.hasMany(models.Book, {
      foreignKey: 'categoryId',
      as: 'books'
    });
  };
  return Category;
};
