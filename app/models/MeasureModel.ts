import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

export const MeasureModel = types
    .model("Measure")
    .props({
        id: types.identifier,
        titulo: types.string,
        descripcion: types.string,
        foto: types.string,
    })

export interface Measure extends Instance<typeof MeasureModel> { }
export interface MeasureSnapshotOut extends SnapshotOut<typeof MeasureModel> { }
export interface MeasureSnapshotIn extends SnapshotIn<typeof MeasureModel> { }