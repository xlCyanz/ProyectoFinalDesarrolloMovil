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
  IVolunteer,
} from "./api.types"
import { GeneralApiProblem } from "./apiProblem"

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

  async register(volunteer: IVolunteer): Promise<boolean | GeneralApiProblem> {
    const newVolunteer = new FormData();

    newVolunteer.append("cedula", volunteer.dni);
    newVolunteer.append("correo", volunteer.email);
    newVolunteer.append("clave", volunteer.password);
    newVolunteer.append("nombre", volunteer.first_name);
    newVolunteer.append("apellido", volunteer.last_name);
    newVolunteer.append("telefono", volunteer.phone_number);

    const { data }: ApiResponseValues = await this.postsauce.post("registro.php", newVolunteer);

    return data?.exito ?? false;
  }

  async login(dni: string, password: string): Promise<{ token: string, success: boolean } | GeneralApiProblem> {
    const loginVolunteer = new FormData();

    loginVolunteer.append("cedula", dni);
    loginVolunteer.append("clave", password);

    const { data }: ApiResponseValues = await this.postsauce.post("iniciar_sesion.php", loginVolunteer);

    return { token: "", success: data?.exito ?? false }
  }
}

// Singleton instance of the API for convenience
export const api = new Api()
