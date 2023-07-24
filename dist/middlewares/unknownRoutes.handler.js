"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnknownRoutesHandler = void 0;
const exceptions_1 = require("../utils/exceptions");
/**
 * Pour toutes les autres routes non définies, on retourne une erreur
 */
const UnknownRoutesHandler = () => {
    throw new exceptions_1.NotFoundException(`La resource demandée n'existe pas`);
};
exports.UnknownRoutesHandler = UnknownRoutesHandler;
