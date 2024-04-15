import { Instance, SnapshotOut, types } from "mobx-state-tree"

import { ISituationIn, IVolunteer, api } from "app/services/api"
import { VolunteerNewsModel } from "./VolunteerNewsModel";
import { withSetPropAction } from "./helpers/withSetPropAction"
import { SituationModel } from "./SituationModel";

export const VolunteeringStoreModel = types
  .model("VolunteeringStore")
  .props({
    authToken: types.maybe(types.string),
    news: types.array(VolunteerNewsModel),
    situations: types.array(SituationModel)
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    async register(volunteer: IVolunteer) {
      return await api.registerVolunteer(volunteer);
    },
    async reportSituation(situation: ISituationIn) {
      return await api.reportSituationVolunteer(store.authToken ?? "", situation);
    },
    async fetchSituations() {
      const response = await api.getSituations(store.authToken ?? "")
      if (response.success) store.setProp("situations", response.data)
      return response;
    },
    async changePassword(oldPassword: string, newPassword: string) {
      const response = await api.changePasswordVolunteer(store.authToken ?? "", oldPassword, newPassword);
      if (response.success) this.logout();
      return response;
    },
    async login(dni: string, password: string) {
      const response = await api.loginVolunteer(dni, password);
      if (response.success) store.setProp("authToken", response.token)
      return response;
    },
    async fetchNews() {
      const response = await api.getVolunteerNews(store.authToken ?? "");
      store.setProp("news", response.data ?? []);
    },
    async getOneNews(id: string) {
      return store.news.find((news) => news.id === id);
    },
    async getOneSituation(id: string) {
      return store.situations.find((situation) => situation.id === id);
    },
    logout() {
      store.authToken = undefined
    },
  }))
  .views((store) => ({
    get isAuthenticated() {
      return !!store.authToken
    },
    get newsList() {
      return store.news ?? []
    },
    get situationsList() {
      return store.situations ?? []
    }
  }))

export interface VolunteeringStore extends Instance<typeof VolunteeringStoreModel> { }
export interface VolunteeringStoreSnapshot extends SnapshotOut<typeof VolunteeringStoreModel> { }
