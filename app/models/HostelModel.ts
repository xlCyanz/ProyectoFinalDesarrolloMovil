import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

export const HostelModel = types
    .model("Hostel")
    .props({
        ciudad: types.identifier,
        codigo: types.string,
        edificio: types.string,
        coordinador: types.string,
        telefono: types.string,
        capacidad: types.string,
        lat: types.string,
        lng: types.string,
    })

export interface Hostel extends Instance<typeof HostelModel> { }
export interface HostelSnapshotOut extends SnapshotOut<typeof HostelModel> { }
export interface HostelSnapshotIn extends SnapshotIn<typeof HostelModel> { }