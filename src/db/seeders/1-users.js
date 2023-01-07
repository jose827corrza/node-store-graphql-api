const bcrypt = require('bcrypt');
const { USER_TABLE } = require('./../models/user.model');

module.exports = {
  up: async (queryInterface) => {
    if (queryInterface.context) {
      queryInterface = queryInterface.context;
    }
    return queryInterface.bulkInsert(USER_TABLE, [
      {
        email: 'jose96corrza@gmail.com',
        password: await bcrypt.hash('josedevnode123', 10),
        role: 'admin',
        created_at: new Date()
      },
      {
        email: 'customer@mail.com',
        password: await bcrypt.hash('customer123', 10),
        role: 'customer',
        created_at: new Date()
      }
    ]);
  },
  down: (queryInterface) => {
    if (queryInterface.context) {
      queryInterface = queryInterface.context;
    }
    return queryInterface.bulkDelete(USER_TABLE, null, {});
  }
};
