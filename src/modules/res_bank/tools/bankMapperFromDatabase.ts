import moment from 'moment';
import { Bank } from "../types/BankTypes";

/**
 * Convierte datos de la base de datos a la entidad `Bank`, manejando las fechas con `moment`.
 * @param data - Datos provenientes de la base de datos.
 * @returns - Entidad `Bank` con las fechas convertidas a objetos `moment`.
 */
export const bankMapperFromDatabase = (data: Partial<Bank>): Bank => {
  if (data.name === undefined || data.id === undefined) {
    throw new Error('The "name" field is required.');
  }

  return {
    id: data.id,  // Valor predeterminado para id
    name: data.name,  // Se asegura que name siempre sea un string
    street: data.street,
    street2: data.street2,
    zip: data.zip,
    city: data.city,
    state: data.state,
    country: data.country,
    email: data.email,
    phone: data.phone,
    active: data.active,
    bic: data.bic,
    create_date: data.create_date ? moment(data.create_date).toDate() : undefined,
    write_date: data.write_date ? moment(data.write_date).toDate() : undefined,
    create_uid: data.create_uid,
    write_uid: data.write_uid,
  };
};
