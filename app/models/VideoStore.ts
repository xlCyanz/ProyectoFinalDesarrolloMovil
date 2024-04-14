// stores/VideoStore.ts
import { types, flow } from "mobx-state-tree";
import { VideoModel } from "../models/VideoModel";
import { IVideo, api } from "../services/api"; // Asegúrate de que IVideo esté correctamente definido

export const VideoStore = types.model("VideoStore", {
  videos: types.array(VideoModel),
  isLoading: types.boolean,
})
.actions(self => ({
  fetchVideos: flow(function* () {
    self.isLoading = true;
    try {
      const response = yield api.getVideos(); // Asume que hay un método getVideos en tu api
      if (response.kind === "ok" && response.datos) {
        self.videos = response.datos.map((item: IVideo) => VideoModel.create(item));
      } else {
        // Maneja los errores aquí
      }
    } catch (error) {
      console.error("Failed to fetch videos: ", error);
    } finally {
      self.isLoading = false;
    }
  }),
}));

export default VideoStore.create({ videos: [], isLoading: false });
