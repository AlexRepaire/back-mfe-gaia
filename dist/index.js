"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_1 = __importDefault(require("express"));
const unknownRoutes_handler_1 = require("./middlewares/unknownRoutes.handler");
const exceptions_handler_1 = require("./middlewares/exceptions.handler");
const config_1 = require("./config");
const users_1 = __importDefault(require("./resources/users"));
const auth_1 = __importDefault(require("./resources/auth"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use("/api/users", users_1.default);
app.use("/api/auth", auth_1.default);
app.get("/api/", (req, res) => res.send("🏠"));
/**
 * Pour toutes les autres routes non définies, on retourne une erreur
 */
app.all("*", unknownRoutes_handler_1.UnknownRoutesHandler);
/**
 * Gestion des erreurs
 */
app.use(exceptions_handler_1.ExceptionsHandler);
app.listen(config_1.config.API_PORT, () => console.log("Silence, ça tourne."));
