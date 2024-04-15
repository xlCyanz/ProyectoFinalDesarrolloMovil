import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { VolunteeringStoreModel } from "./VolunteeringStore"
import { MemberStoreModel } from "./MemberStore"
import { HostelStoreModel } from "./HostelStore"
import { NewsStoreModel } from "./NewsStore"
import { ServiceStoreModel } from "./ServiceStore"
import { VideoStoreModel } from "./VideoStore"
import { MeasureStoreModel } from "./MeasureStore"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
    volunteerStore: types.optional(VolunteeringStoreModel, {}),
    memberStore: types.optional(MemberStoreModel, {}),
    hostelStore: types.optional(HostelStoreModel, {}),
    newsStore: types.optional(NewsStoreModel, {}),
    servicesStore: types.optional(ServiceStoreModel, {}),
    videosStore: types.optional(VideoStoreModel, {}),
    measuresStore: types.optional(MeasureStoreModel, {}),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> { }
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> { }
