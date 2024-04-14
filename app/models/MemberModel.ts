import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

export const MemberModel = types
    .model("Member")
    .props({
        id: types.identifier,
        foto: types.string,
        nombre: types.string,
        cargo: types.string,
    })

export interface Member extends Instance<typeof MemberModel> { }
export interface MemberSnapshotOut extends SnapshotOut<typeof MemberModel> { }
export interface MemberSnapshotIn extends SnapshotIn<typeof MemberModel> { }