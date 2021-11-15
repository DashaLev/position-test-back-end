const { User } = require('../dataBase');
const { CREATED_STATUS, NO_CONTENT_STATUS } = require('../configs');
const { passwordService } = require('../services');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await User.find();

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    getUser: (req, res) => {
        const user = req.user;

        res.json(user);
    },

    createUser: async (req, res, next) => {
        try {
            const { password } = req.body;

            const hashedPassword = await passwordService.hash(password);

            const newUser = await User.create({ ...req.body, password: hashedPassword });

            res.status(CREATED_STATUS).json(newUser);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            const { first_name, last_name } = req.body;

            const updatedUser = await User
                .findByIdAndUpdate(user_id, { first_name, last_name }, { new: true });

            res.status(CREATED_STATUS).json(updatedUser);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const { _id } = req.user;

            await User.deleteOne({ _id });

            res.sendStatus(NO_CONTENT_STATUS);
        } catch (e) {
            next(e);
        }
    }
};
