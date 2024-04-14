// stores/NoticeStore.ts
import { types, flow } from "mobx-state-tree";
import { NoticeModel } from "../models/NoticeModel";
import { INotice, api } from "../services/api";

export const NoticeStore = types.model("NoticeStore", {
  notices: types.array(NoticeModel),
  isLoading: types.boolean,
})
.actions(self => ({
  fetchNotices: flow(function* () {
    self.isLoading = true;
    try {
      const response = yield api.getNotices();
      if (response.kind === "ok" && response.datos) {
        self.notices = response.datos.map((item: INotice) => NoticeModel.create(item));
      } else {
        // Handle errors
      }
    } catch (error) {
      console.error("Failed to fetch notices: ", error);
    } finally {
      self.isLoading = false;
    }
  }),
}));

export default NoticeStore.create({ notices: [], isLoading: false });
