"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();
exports.db = db;
