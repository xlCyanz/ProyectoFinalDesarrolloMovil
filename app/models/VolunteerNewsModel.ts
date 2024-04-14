import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

export const VolunteerNewsModel = types
    .model("VolunteerNews")
    .props({
        id: types.identifier,
        foto: types.string,
        fecha: types.string,
        titulo: types.string,
        contenido: types.string,
    })

export interface VolunteerNews extends Instance<typeof VolunteerNewsModel> { }
export interface VolunteerNewsSnapshotOut extends SnapshotOut<typeof VolunteerNewsModel> { }
export interface VolunteerNewsSnapshotIn extends SnapshotIn<typeof VolunteerNewsModel> { }