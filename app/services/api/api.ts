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
  IPrecautionaryMeasures,
  IService,
  ISituationIn,
  ISituationOut,
  IVideo,
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
  getsauce: ApisauceInstance
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
    this.getsauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: 'application/json',
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

  async reportSituationVolunteer(token: string, values: ISituationIn): Promise<{ message: string; success: boolean }> {
    const reportSituation = new FormData();

    reportSituation.append("token", token);
    reportSituation.append("titulo", values.title);
    reportSituation.append("foto", values.photoBase64);
    reportSituation.append("latitud", values.latitude);
    reportSituation.append("longitud", values.longitude);
    reportSituation.append("descripcion", values.description);

    const { data }: ApiResponseValues<any> = await this.postsauce.post("nueva_situacion.php", reportSituation);
    return { message: data?.mensaje ?? "", success: data?.exito ?? false }
  }

  async getSituations(token: string): Promise<{ message: string; data: ISituationOut[]; success: boolean }> {
    const reportSituation = new FormData();

    reportSituation.append("token", token);

    const { data }: ApiResponseValues<any> = await this.postsauce.post("situaciones.php", reportSituation);
    return { message: data?.mensaje ?? "", data: data?.datos ?? [], success: data?.exito ?? false }
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
    const { data }: ApiResponseValues<INews[]> = await this.getsauce.get("noticias.php");
    return { success: data?.exito ?? false, data: data?.datos ?? [] }
  }

  async getServices(): Promise<{ success: boolean, data: IService[] }> {
    const { data }: ApiResponseValues<IService[]> = await this.getsauce.get("servicios.php");
    return { success: data?.exito ?? false, data: data?.datos ?? [] }
  }

  async getVideos(): Promise<{ success: boolean, data: IVideo[] }> {
    const { data }: ApiResponseValues<IVideo[]> = await this.getsauce.get("videos.php");
    return { success: data?.exito ?? false, data: data?.datos ?? [] }
  }

  async getMeasures(): Promise<{ success: boolean, data: IPrecautionaryMeasures[] }> {
    const { data }: ApiResponseValues<IPrecautionaryMeasures[]> = await this.getsauce.get("medidas_preventivas.php");
    return { success: data?.exito ?? false, data: data?.datos ?? [] }
  }
}

// Singleton instance of the API for convenience
export const api = new Api()
