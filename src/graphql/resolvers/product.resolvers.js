const ProductService = require('../../services/product.service')
const service = new ProductService();

const getProduct = async (_, { id }) => {
    return await service.findOne(id);
  // return {
  //   id,
  //   name: 'iPhone',
  //   price: 2699000.00,
  //   description: 'gomeliando',
  //   image: 'https://image.assas',
  //   createdAt: new Date().toISOString(),
  // }
}

const getProducts = async () => {
  // return [];
  return await service.find({});
}

const addProduct = async (_, { dto }) => {
  const newProduct = await service.create(dto);
  return newProduct;
}

const updateProduct = async (_, {id, dto}) => {
  return await service.update(id, dto);
}

const deleteProduct = async (_, { id }) => {
  await service.delete(id);
  return id;
}

const getProductsByCategory = async (parent) => { // El contexto viene ahi con la info del padre!
  const id = parent.dataValues.id;
  return service.getByCategory(id);
}
module.exports = { getProduct, getProducts, addProduct, updateProduct, deleteProduct, getProductsByCategory }
