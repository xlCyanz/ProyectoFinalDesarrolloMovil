// models/NoticeModel.ts
import { types } from "mobx-state-tree";

export const NoticeModel = types.model("Notice", {
  id: types.identifierNumber,
  fecha: types.string,
  titulo: types.string,
  contenido: types.string,
  foto: types.string,
});
