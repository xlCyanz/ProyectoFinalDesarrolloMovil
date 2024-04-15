import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

export const ServiceModel = types
    .model("Service")
    .props({
        id: types.identifier,
        nombre: types.string,
        descripcion: types.string,
        foto: types.string,
    })

export interface Service extends Instance<typeof ServiceModel> { }
export interface ServiceSnapshotOut extends SnapshotOut<typeof ServiceModel> { }
export interface ServiceSnapshotIn extends SnapshotIn<typeof ServiceModel> { }