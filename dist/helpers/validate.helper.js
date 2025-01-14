"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateEmail = (email) => {
    return email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};
const validatePassowrd = (password) => {
    return password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
};
const validateArray = (array) => {
    return typeof array !== "object" || !array.length;
};
const validateHelper = {
    validateEmail,
    validatePassowrd,
    validateArray
};
exports.default = validateHelper;
