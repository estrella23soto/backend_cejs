"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
class Authroutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/', authController_1.authController.iniciarSesion);
    }
}
const authroutes = new Authroutes();
exports.default = authroutes.router;
//# sourceMappingURL=authRoutes.js.map