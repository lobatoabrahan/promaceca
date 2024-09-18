import moment from 'moment';
import { CountryStatesToDatabase, CountryStates } from '../types/CountryTypes';

/**
 * Convierte datos de la base de datos a la entidad `CountryStates` y lanza un error si `name` es `undefined`.
 * @param data - Datos provenientes de la base de datos.
 * @returns - Entidad `CountryStates` con valores `undefined` convertidos a `null`.
 * @throws - Error si `name` es `undefined`.
 */
export const countryStatesMapperToDatabase = (data: Partial<CountryStatesToDatabase>): CountryStatesToDatabase => {
  if (data.name === undefined) {
    throw new Error('The "name" field is required.');
  }

  return {
    name: data.name,
    code: data.code,
    country_id: data.country_id,
    create_date: data.create_date,
    write_date: data.write_date,
    create_uid: data.create_uid,
    write_uid: data.write_uid,
  };
};

/**
 * Convierte datos de la base de datos a la entidad `CountryStates`, manejando las fechas con `moment`.
 * @param data - Datos provenientes de la base de datos.
 * @returns - Entidad `CountryStates` con las fechas convertidas a objetos `moment`.
 */
export const countryStatesMapperFromDatabase = (data: Partial<CountryStates>): CountryStates => {
  if (data.name === undefined || data.id === undefined) {
    throw new Error('The "name" field is required.');
  }

  return {
    id: data.id,
    name: data.name,
    code: data.code,
    country_id: data.country_id,
    create_date: data.create_date ? moment(data.create_date).toDate() : undefined,
    write_date: data.write_date ? moment(data.write_date).toDate() : undefined,
    create_uid: data.create_uid,
    write_uid: data.write_uid,
  };
};
