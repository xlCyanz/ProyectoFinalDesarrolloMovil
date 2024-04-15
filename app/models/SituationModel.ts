import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

export const SituationModel = types
    .model("Situation")
    .props({
        foto: types.string,
        id: types.identifier,
        titulo: types.string,
        latitud: types.string,
        longitud: types.string,
        descripcion: types.string,
        estado: types.optional(types.string, ""),
        fecha: types.optional(types.string, "")
    })

export interface Situation extends Instance<typeof SituationModel> { }
export interface SituationSnapshotOut extends SnapshotOut<typeof SituationModel> { }
export interface SituationSnapshotIn extends SnapshotIn<typeof SituationModel> { }