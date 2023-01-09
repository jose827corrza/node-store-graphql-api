const boom = require('@hapi/boom');

const CategoryService = require('../../services/category.service')
const checkRolesGql = require('../../utils/checkRolesGpl')
const checkJwtGql = require('../../utils/checkJwtGpl')
const service = new CategoryService();

const addCategory = async (_, {dto}, context) => {
  const user = await checkJwtGql(context);
  if (!user){
    throw boom.unauthorized('JWT is not valid');
  }
  checkRolesGql(user, 'admin')
  return await service.create(dto);
}

const allCategories = async () => {
  return await service.find();
}

const categoryById = async (_, { id }) => {
  return await service.findOne(id);
}

module.exports = { addCategory, allCategories, categoryById }
