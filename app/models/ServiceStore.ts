// stores/ServiceStore.ts
import { types, flow } from "mobx-state-tree";
import { ServiceModel } from "../models/ServiceModel";
import { IService, api } from "../services/api"; // Asegúrate de que IService esté correctamente definido

export const ServiceStore = types.model("ServiceStore", {
  services: types.array(ServiceModel),
  isLoading: types.boolean,
})
.actions(self => ({
  fetchServices: flow(function* () {
    self.isLoading = true;
    try {
      const response = yield api.getServices(); // Reemplaza getNotices por el método correspondiente getServices
      if (response.kind === "ok" && response.datos) {
        self.services = response.datos.map((item: IService) => ServiceModel.create(item));
      } else {
        // Maneja los errores aquí
      }
    } catch (error) {
      console.error("Failed to fetch services: ", error);
    } finally {
      self.isLoading = false;
    }
  }),
}));

export default ServiceStore.create({ services: [], isLoading: false });
