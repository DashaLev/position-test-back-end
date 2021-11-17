const bcrypt = require('bcrypt');

const { ErrorHandler, BAD_REQUEST_STATUS, WRONG_PASSWORD } = require('../errors');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),

    compare: async (password, hashPassword) => {
        const isPasswordMatched = await bcrypt.compare(password, hashPassword);

        if (!isPasswordMatched) {
            throw new ErrorHandler(WRONG_PASSWORD, BAD_REQUEST_STATUS);
        }
    }
};
