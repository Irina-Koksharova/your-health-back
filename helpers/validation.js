const { validationResult } = require('express-validator');
const status = require('./statusCodes');

const validator = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(status.NOT_FOUND).json({ message: errors.array() });
    }
    next();
}

module.exports = validator;
