import { Instance, SnapshotOut, types } from "mobx-state-tree"

import { api } from "../services/api"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { VideoModel } from "./VideoModel";

export const VideoStoreModel = types
  .model("VideoStore")
  .props({
    videos: types.array(VideoModel)
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    async fetchVideos() {
      const response = await api.getVideos();
      store.setProp("videos", response.data ?? []);
    },
    async getOneVideo(id: string) {
      return store.videos.find((video) => video.id === id);
    },
  }))
  .views((store) => ({
    get videosList() {
      return store.videos ?? []
    }
  }))

export interface VideoStore extends Instance<typeof VideoStoreModel> { }
export interface VideoStoreSnapshot extends SnapshotOut<typeof VideoStoreModel> { }
