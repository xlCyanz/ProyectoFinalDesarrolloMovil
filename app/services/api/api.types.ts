import { ApiResponse } from "apisauce"

/**
 * These types indicate the shape of the data you expect to receive from your
 * API endpoint, assuming it's a JSON object like we have.
 */

export type ApiResponseValues<T = never> = ApiResponse<{
  data: T;
  datos: T;
  exito: boolean;
  mensaje: string;
}>

export interface IVolunteer {
  dni: string;
  email: string;
  password: string;
  lastName: string;
  firstName: string;
  phoneNumber: string;
}

export interface IVolunteerNews {
  id: string;
  foto: string;
  fecha: string;
  titulo: string;
  contenido: string;
}

export interface IMember {
  id: string;
  foto: string;
  nombre: string;
  cargo: string;
}

export interface IHostel {
  lat: string;
  lng: string;
  ciudad: string;
  codigo: string;
  edificio: string;
  telefono: string;
  capacidad: string;
  coordinador: string;
}

export interface INews {
  id: string;
  foto: string;
  fecha: string;
  titulo: string;
  contenido: string;
}

/**
 * The options used to configure apisauce.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number
}
