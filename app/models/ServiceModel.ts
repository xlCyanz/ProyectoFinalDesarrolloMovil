// models/ServiceModel.ts
import { types } from "mobx-state-tree";

export const ServiceModel = types.model("Service", {
  id: types.identifierNumber,
  nombre: types.string,
  descripcion: types.string,
  foto: types.string,
});
