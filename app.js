const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

require('dotenv').config();

const { MONGO_CONNECT_URL, NODE_ENV, PORT, ALLOWED_ORIGIN } = require('./configs');
const { DEFAULT_ERR_STATUS, ErrorHandler, CORS_NOT_ALLOWED } = require('./errors');
const { userRouter } = require('./routers');

const app = express();

mongoose.connect(MONGO_CONNECT_URL);

app.use(helmet());
app.use(cors({ origin: _configureCors }));
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
}));

if (NODE_ENV === 'dev') {
    const morgan = require('morgan');

    app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);

// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || DEFAULT_ERR_STATUS)
        .json({
            message: err.message
        });
});

app.listen(PORT,() => {
    console.log(`App listen ${PORT}`);
});

function _configureCors(origin, callback) {
    if (NODE_ENV === 'dev') {
        return callback(null, true);
    }

    const whiteList = ALLOWED_ORIGIN.split(';');

    if (!whiteList.includes(origin)) {
        return callback(new ErrorHandler(CORS_NOT_ALLOWED), false);
    }

    return callback(null, true);
}
