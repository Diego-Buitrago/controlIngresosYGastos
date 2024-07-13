"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res) => {
    console.error(err.stack);
    res.status(500).send('Algo salio mal!');
};
exports.default = errorHandler;
