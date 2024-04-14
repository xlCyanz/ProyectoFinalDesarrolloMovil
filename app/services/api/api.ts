/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 *
 * See the [Backend API Integration](https://docs.infinite.red/ignite-cli/boilerplate/app/services/Services.md)
 * documentation for more details.
 */
import {
  ApisauceInstance,
  create,
} from "apisauce"
import Config from "../../config"
import type {
  ApiConfig,
  ApiResponseValues,
  IHostel,
  IMember,
  INews,
  IVolunteer,
  IVolunteerNews,
} from "./api.types"

/**
 * Configuring the apisauce instance.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
}

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class Api {
  postsauce: ApisauceInstance
  // getsauce: ApisauceInstance
  config: ApiConfig

  /**
   * Set up our API instance. Keep this lightweight!
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
    this.postsauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  async registerVolunteer(volunteer: IVolunteer): Promise<boolean> {
    const newVolunteer = new FormData();

    newVolunteer.append("cedula", volunteer.dni);
    newVolunteer.append("correo", volunteer.email);
    newVolunteer.append("clave", volunteer.password);
    newVolunteer.append("nombre", volunteer.firstName);
    newVolunteer.append("apellido", volunteer.lastName);
    newVolunteer.append("telefono", volunteer.phoneNumber);

    const { data }: ApiResponseValues = await this.postsauce.post("registro.php", newVolunteer);

    return data?.exito ?? false;
  }

  async loginVolunteer(dni: string, password: string): Promise<{ token: string, message: string; success: boolean }> {
    const loginVolunteer = new FormData();

    loginVolunteer.append("cedula", dni);
    loginVolunteer.append("clave", password);

    const { data }: ApiResponseValues<any> = await this.postsauce.post("iniciar_sesion.php", loginVolunteer);
    return { token: data?.datos.token, message: data?.mensaje ?? "", success: data?.exito ?? false }
  }

  async changePasswordVolunteer(token: string, oldPassword: string, newPassword: string): Promise<{ success: boolean, message: string }> {
    const changePasswordVolunteer = new FormData();

    changePasswordVolunteer.append("token", token);
    changePasswordVolunteer.append("clave_anterior", oldPassword);
    changePasswordVolunteer.append("clave_nueva", newPassword);

    const { data }: ApiResponseValues<any> = await this.postsauce.post("cambiar_clave.php", changePasswordVolunteer);
    return { success: data?.exito ?? false, message: data?.mensaje ?? "" }
  }

  async getVolunteerNews(token: string): Promise<{ success: boolean, data: IVolunteerNews[] }> {
    const formData = new FormData();

    formData.append("token", token);

    const { data }: ApiResponseValues<IVolunteerNews[]> = await this.postsauce.post("noticias_especificas.php", formData);
    return { success: data?.exito ?? false, data: data?.datos ?? [] }
  }

  async getMembers(): Promise<{ success: boolean, data: IMember[] }> {
    const { data }: ApiResponseValues<IMember[]> = await this.postsauce.post("miembros.php");
    return { success: data?.exito ?? false, data: data?.datos ?? [] }
  }

  async getHostels(): Promise<{ success: boolean, data: IHostel[] }> {
    const { data }: ApiResponseValues<IHostel[]> = await this.postsauce.post("albergues.php");
    return { success: data?.exito ?? false, data: data?.datos ?? [] }
  }

  async getNews(): Promise<{ success: boolean, data: INews[] }> {
    const { data }: ApiResponseValues<INews[]> = await this.postsauce.get("noticias.php");
    return { success: data?.exito ?? false, data: data?.datos ?? [] }
  }
}

// Singleton instance of the API for convenience
export const api = new Api()
