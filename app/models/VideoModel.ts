// models/VideoModel.ts
import { types } from "mobx-state-tree";

export const VideoModel = types.model("Video", {
  id: types.identifierNumber,
  fecha: types.string,
  titulo: types.string,
  descripcion: types.string,
  link: types.string,
});
