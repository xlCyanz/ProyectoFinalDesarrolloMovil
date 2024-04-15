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

export interface IService {
  id: string;
  foto: string;
  nombre: string;
  descripcion: string;
}

export interface IVideo {
  id: string;
  link: string;
  fecha: string;
  titulo: string;
  descripcion: string;
}

export interface ISituationIn {
  title: string;
  description: string;
  photoBase64: string;
  latitude: string;
  longitude: string;
}

export interface ISituationOut {
  id: string;
  foto: string;
  fecha: string;
  titulo: string;
  estado: string;
  latitud: string;
  longitud: string
  descripcion: string;
}

export interface IPrecautionaryMeasures {
  id: string;
  foto: string;
  titulo: string;
  descripcion: string;
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
