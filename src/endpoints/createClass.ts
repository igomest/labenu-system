import { Request, Response } from "express"
import { connection } from "../data/connection"
import { CLASS_TYPE } from "../enum"
import { createClassInput } from "../types"

let errorCode = 422

export default async function createClass(req: Request, res: Response): Promise<void> {
    try {

        const input: createClassInput = {
            id: req.body.id,
            nome: req.body.nome,
            data_inicio: req.body.data_inicio,
            data_fim: req.body.data_fim,
            modulo: 0,
            tipo: req.body.type
        }

        if (!input.id || !input.nome || !input.data_inicio || !input.data_fim || !input.tipo) {
            errorCode = 422
            throw new Error("Preencha os campos corretamente")
        }

        if (input.tipo !== CLASS_TYPE.UNABRIDGED && input.tipo !== CLASS_TYPE.NIGHTLY) {
            throw new Error("Os valores possíveis são 'integral' ou 'noturno'")
        }

        if (input.tipo === CLASS_TYPE.NIGHTLY) {
            input.nome = input.nome += "-na-night"
        }

        await connection.raw(`
            INSERT INTO turma (id, nome, data_inicio, data_fim, modulo)
            VALUES(
                ${input.id},
               "${input.nome}",
               "${input.data_inicio}",
               "${input.data_fim}",
               "${input.data_fim}",
               ${input.modulo}
            )
        `)

        res.status(201)
            .send({ message: "Turma criada com sucesso" })

    } catch (error: any) {
        res.status(errorCode)
            .send({ message: error.message})
    }
}