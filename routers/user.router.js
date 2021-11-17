const userRouter = require('express').Router();

const { userController } = require('../controllers');
const { userMiddleware } = require('../middlewares');
const { createUserValidator, updateUserValidator } = require('../validators');

userRouter.get('/',
    userController.getUsers);

userRouter.post('/',
    userMiddleware.validationMiddleware(createUserValidator),
    userMiddleware.checkIfEmailUnique,
    userController.createUser);

userRouter.get('/:user_id',
    userMiddleware.checkUserExist,
    userController.getUser);

userRouter.put('/:user_id',
    userMiddleware.validationMiddleware(updateUserValidator),
    userMiddleware.checkUserExist,
    userMiddleware.checkUserPassword,
    userController.updateUser);

userRouter.delete('/:user_id',
    userMiddleware.checkUserExist,
    userMiddleware.checkUserPassword,
    userController.deleteUser);

module.exports = userRouter;
