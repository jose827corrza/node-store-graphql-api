const boom = require("@hapi/boom")

async function checkJwtGpl(context) {
  const { user } = await context.authenticate('jwt', {session: false});
  if (!user){
    throw boom.unauthorized('JWT is not valid');
  }
  return user;
}

module.exports = checkJwtGpl;
