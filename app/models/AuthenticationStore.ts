import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { IVolunteer, api } from "app/services/api"

export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .props({
    authToken: types.maybe(types.string),
  })
  .actions(withSetPropAction)
  .actions(() => ({
    async register(volunteer: IVolunteer) {
      return await api.register(volunteer);
    },
    async login(dni: string, password: string) {
      const response = await api.login(dni, password);
      console.log("🚀 ~ register ~ response:", response)
      return false;
    }
  }))
  .views((store) => ({
    get isAuthenticated() {
      return !!store.authToken
    },
    // get validationError() {
    //   if (store.authEmail.length === 0) return "can't be blank"
    //   if (store.authEmail.length < 6) return "must be at least 6 characters"
    //   if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(store.authEmail))
    //     return "must be a valid email address"
    //   return ""
    // },
  }))
  .actions(() => ({
    // setAuthToken(value?: string) {
    //   store.authToken = value
    // },
    // setAuthEmail(value: string) {
    //   store.authEmail = value.replace(/ /g, "")
    // },
    // logout() {
    //   store.authToken = undefined
    //   store.authEmail = ""
    // },
  }))

export interface AuthenticationStore extends Instance<typeof AuthenticationStoreModel> {}
export interface AuthenticationStoreSnapshot extends SnapshotOut<typeof AuthenticationStoreModel> {}
