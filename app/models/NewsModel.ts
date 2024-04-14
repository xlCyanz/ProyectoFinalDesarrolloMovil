import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

export const NewsModel = types
    .model("News")
    .props({
        id: types.identifier,
        foto: types.string,
        fecha: types.string,
        titulo: types.string,
        contenido: types.string,
    })

export interface News extends Instance<typeof NewsModel> { }
export interface NewsSnapshotOut extends SnapshotOut<typeof NewsModel> { }
export interface NewsSnapshotIn extends SnapshotIn<typeof NewsModel> { }