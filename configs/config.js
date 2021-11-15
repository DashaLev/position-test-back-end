module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'dev',

    MONGO_CONNECT_URL: process.env.MONGO_CONNECT_URL,
    PORT: process.env.PORT || 5000,
    ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN,
};
