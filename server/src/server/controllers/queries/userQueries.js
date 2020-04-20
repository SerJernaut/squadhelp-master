const bd = require('../../models/index');
const UserNotFoundError = require('../../errors/UserNotFoundError');
const NotFoundError = require('../../errors/NotFoundError');
const ServerError = require('../../errors/ServerError');
const bcrypt = require('bcrypt');

module.exports.updateUser = async (data, userId, transaction) => {
  const [updatedCount, [updatedUser]] = await bd.Users.update(data,
    { where: { id: userId }, returning: true, transaction });
  if (updatedCount !== 1) {
    throw new ServerError('cannot update user');
  }
  return updatedUser.dataValues;
};

module.exports.findUser = async (predicate, transaction) => {
  const result = await bd.Users.findOne({ where: predicate, transaction });
  if ( !result) {
    throw new UserNotFoundError('user with this data didn`t exist');
  } else {
    return result.get({ plain: true });
  }
};

module.exports.userCreation = async (data) => {
  const newUser = await bd.Users.create(data);
  if ( !newUser) {
    throw new ServerError('server error on user creation');
  } else {
    return newUser.get({ plain: true });
  }
};

module.exports.passwordCompare = async (pass1, pass2) => {
  const passwordCompare = await bcrypt.compare(pass1, pass2);
  if ( !passwordCompare) {
    throw new UserNotFoundError('Wrong password');
  }
};

module.exports.findTransactionHistory = async (userId) => {
  const result = await bd.Transactions.findAll({
    where: {
      userId
    }
  });
  if (result.length > 0) {
    return result;
  }
  throw new NotFoundError();
}

module.exports.findTransactionStatementsByFilter = async (filter) => {
  const result = await bd.Transactions.findAll(filter);
  if (result.length > 0) {
    return result;
  }
  throw new NotFoundError();
}

