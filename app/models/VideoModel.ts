import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

export const VideoModel = types
    .model("Video")
    .props({
        link: types.string,
        fecha: types.string,
        id: types.identifier,
        titulo: types.string,
        descripcion: types.string,
    })

export interface Video extends Instance<typeof VideoModel> { }
export interface VideoSnapshotOut extends SnapshotOut<typeof VideoModel> { }
export interface VideoSnapshotIn extends SnapshotIn<typeof VideoModel> { }