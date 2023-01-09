const { RegularExpression } = require('graphql-scalars')

const {
  getProduct,
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory, } = require('./product.resolvers');
const { login } = require('./auth.resolvers');
const { addCategory, allCategories, categoryById } = require('./category.resolvers');

// Regular expression that checks if the string is min 3
const CategoryNameType = new RegularExpression('CategoryNameType', /^[a-zA-Z0-9]{3,15}$/)

const resolvers = {
  Query: {
    hello: () => 'hola mundito 7w7',
    // Products
    product: getProduct, // Para hacer match en los schemas
    allProducts: getProducts,
    // Categories
    allCategories,
    categoryById,
  },
  Mutation: {
    // Products
    addProduct,
    updateProduct,
    deleteProduct,
    // Auth
    login,
    // Categories
    addCategory,
  },
  CategoryNameType,
  Category: {
    products: getProductsByCategory,
  }
}

module.exports = resolvers;
