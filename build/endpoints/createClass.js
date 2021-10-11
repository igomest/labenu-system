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
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("../data/connection");
const enum_1 = require("../enum");
let errorCode = 422;
function createClass(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const input = {
                id: req.body.id,
                nome: req.body.nome,
                data_inicio: req.body.data_inicio,
                data_fim: req.body.data_fim,
                modulo: 0,
                tipo: req.body.type
            };
            if (!input.id || !input.nome || !input.data_inicio || !input.data_fim || !input.tipo) {
                errorCode = 422;
                throw new Error("Preencha os campos corretamente");
            }
            if (input.tipo !== enum_1.CLASS_TYPE.UNABRIDGED && input.tipo !== enum_1.CLASS_TYPE.NIGHTLY) {
                throw new Error("Os valores possíveis são 'integral' ou 'noturno'");
            }
            if (input.tipo === enum_1.CLASS_TYPE.NIGHTLY) {
                input.nome = input.nome += "-na-night";
            }
            yield connection_1.connection.raw(`
            INSERT INTO turma (id, nome, data_inicio, data_fim, modulo)
            VALUES(
                ${input.id},
               "${input.nome}",
               "${input.data_inicio}",
               "${input.data_fim}",
               "${input.data_fim}",
               ${input.modulo}
            )
        `);
            res.status(201)
                .send({ message: "Turma criada com sucesso" });
        }
        catch (error) {
            res.status(errorCode)
                .send({ message: error.message });
        }
    });
}
exports.default = createClass;
