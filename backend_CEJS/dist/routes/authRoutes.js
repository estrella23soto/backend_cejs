"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class Authroutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
    }
}
const authroutes = new Authroutes();
exports.default = authroutes.router;
//# sourceMappingURL=authRoutes.js.map