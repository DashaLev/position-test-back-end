module.exports = {
    userNormalizer: (userNormalize = {}) => {
        const fieldsToRemove = [
            'password'
        ];

        fieldsToRemove.forEach((field) => {
            delete userNormalize[field];
        });

        return userNormalize;
    }
};
