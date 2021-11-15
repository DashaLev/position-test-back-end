const { NODE_ENV, MONGO_CONNECT_URL, PORT, ALLOWED_ORIGIN } = require('./config');
const { EMAIL_REGEXP, PASSWORD_REGEXP, CREATED_STATUS, NO_CONTENT_STATUS } = require('./constants');

module.exports = {
    userTypes: require('./user-types.enum'),

    NODE_ENV,
    MONGO_CONNECT_URL,
    PORT,
    ALLOWED_ORIGIN,

    EMAIL_REGEXP,
    PASSWORD_REGEXP,

    CREATED_STATUS,
    NO_CONTENT_STATUS,
};
