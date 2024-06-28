"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarioController = void 0;
const usuarioModelo_1 = __importDefault(require("../models/usuarioModelo"));
const utils_1 = require("../utils/utils");
class UsuarioController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield usuarioModelo_1.default.list();
                return res.json(result);
            }
            catch (error) {
                return res.status(500).json({ message: `${error.message}` });
            }
        });
    }
    add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = req.body;
                var encytedText = yield utils_1.utils.hashPassword(newUser.password);
                newUser.password = encytedText;
                yield usuarioModelo_1.default.add(newUser);
                return res.json({ message: "Usuario agregado", code: 0 });
            }
            catch (error) {
                if (error.message === "El usuario con este email ya existe") {
                    return res.status(400).json({ message: error.message });
                }
                return res.status(500).json({ message: error.message });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userUpdate = req.body;
                var encytedText = yield utils_1.utils.hashPassword(userUpdate.password);
                userUpdate.password = encytedText;
                yield usuarioModelo_1.default.update(userUpdate);
                return res.json({ message: "Usuario actualizado", code: 0 });
            }
            catch (error) {
                if (error.message === "El usuario con este email no existe") {
                    return res.status(404).json({ message: error.message });
                }
                return res.status(500).json({ message: error.message });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                yield usuarioModelo_1.default.delete(email);
                return res.json({ message: "Usuario eliminado", code: 0 });
            }
            catch (error) {
                if (error.message === "El usuario con este email no existe") {
                    return res.status(404).json({ message: error.message });
                }
                return res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.usuarioController = new UsuarioController();
//# sourceMappingURL=usuarioController%20.js.map