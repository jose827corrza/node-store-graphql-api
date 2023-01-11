const boom = require('@hapi/boom')

const checkRolesGql = require('../../utils/checkRolesGpl')
const checkJwtGql = require('../../utils/checkJwtGpl')
const ProductService = require('../../services/product.service')
const service = new ProductService();

const getProduct = async (_, { id }) => {
    return await service.findOne(id);
}

const getProducts = async () => {
  return await service.find({});
}

const addProduct = async (_, { dto }, context) => {
  const user = await checkJwtGql(context);
  if (!user){
    throw boom.unauthorized('JWT is not valid');
  }
  checkRolesGql(user, 'admin')
  const newProduct = await service.create(dto);
  return newProduct;
}

const updateProduct = async (_, {id, dto}, context) => {
  const user = await checkJwtGql(context);
  if (!user){
    throw boom.unauthorized('JWT is not valid');
  }
  checkRolesGql(user, 'admin')
  return await service.update(id, dto);
}

const deleteProduct = async (_, { id }, context) => {
  const user = await checkJwtGql(context);
  if (!user){
    throw boom.unauthorized('JWT is not valid');
  }
  checkRolesGql(user, 'admin')
  await service.delete(id);
  return id;
}

const getProductsByCategory = async (parent) => { // El contexto viene ahi con la info del padre!
  const id = parent.dataValues.id;
  return service.getByCategory(id);
}
module.exports = { getProduct, getProducts, addProduct, updateProduct, deleteProduct, getProductsByCategory }
