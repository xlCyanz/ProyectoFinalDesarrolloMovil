import { Instance, SnapshotOut, types } from "mobx-state-tree"

import { api } from "../services/api"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { NewsModel } from "./NewsModel";

export const NewsStoreModel = types
  .model("News")
  .props({
    news: types.array(NewsModel)
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    async fetchNews() {
      const response = await api.getNews();
      store.setProp("news", response.data ?? []);
    },
    async getOneNews(id: string) {
      return store.news.find((news) => news.id === id);
    },
  }))
  .views((store) => ({
    get newsList() {
      return store.news ?? []
    }
  }))

export interface News extends Instance<typeof NewsModel> { }
export interface NewsSnapshot extends SnapshotOut<typeof NewsModel> { }
