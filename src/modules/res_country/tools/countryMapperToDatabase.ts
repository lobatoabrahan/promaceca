import { CountryToDatabase } from "../types/CountryTypes";

/**
 * Convierte datos de la base de datos a la entidad `Country` y lanza un error si `name` es `undefined`.
 * @param data - Datos provenientes de la base de datos.
 * @returns - Entidad `Country` con valores `undefined` convertidos a `null`.
 * @throws - Error si `name` es `undefined`.
 */
export const countryMapperToDatabase = (data: Partial<CountryToDatabase>): CountryToDatabase => {
  if (data.name === undefined) {
    throw new Error('The "name" field is required.');
  }

  return {
    name: data.name,
    code: data.code,
    phone_code: data.phone_code,
    currency_id: data.currency_id,
    create_date: data.create_date,
    write_date: data.write_date,
    create_uid: data.create_uid,
    write_uid: data.write_uid,
  };
};
