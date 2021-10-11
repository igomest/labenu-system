import { CLASS_TYPE } from "./enum";

export type createClassInput = {
   id: number,
   nome: string,
   data_inicio: string,
   data_fim: string,
   modulo: number,
   tipo: CLASS_TYPE
}