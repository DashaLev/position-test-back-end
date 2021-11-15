const { User } = require('../dataBase');
const { ErrorHandler, NOT_FOUND_STATUS, BAD_REQUEST_STATUS, USER_NOT_FOUND, CONFLICT_STATUS,
    USERNAME_ALREADY_EXISTS, EMAIL_ALREADY_EXISTS
} = require('../errors');

module.exports = {
    checkIfEmailUnique: async (req, res, next) => {
        try {
            const { user_name, email } = req.body;

            const userUnique = await User.findOne( { $or: [ { user_name }, { email } ] });

            if (userUnique) {
                if (userUnique.user_name === user_name) {
                    throw new ErrorHandler(USERNAME_ALREADY_EXISTS, CONFLICT_STATUS);
                }

                if (userUnique.email === email) {
                    throw new ErrorHandler(EMAIL_ALREADY_EXISTS, CONFLICT_STATUS);
                }
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserExist: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            const user = await User.findById(user_id);

            if (!user) {
                throw new ErrorHandler(USER_NOT_FOUND, NOT_FOUND_STATUS);
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    validationMiddleware: (validationFunction) => (req, res, next) => {
        try {
            const { error, value } = validationFunction.validate(req.body);

            if (error) {
                throw new ErrorHandler(error.details[0].message, BAD_REQUEST_STATUS);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    }
};
