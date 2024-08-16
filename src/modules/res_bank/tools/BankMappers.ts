import { Bank } from "../types/BankTypes";

/**
 * Convierte datos de la base de datos a la entidad `Bank` y lanza un error si `name` es `undefined`.
 * @param data - Datos provenientes de la base de datos.
 * @returns - Entidad `Bank` con valores `undefined` convertidos a `null`.
 * @throws - Error si `name` es `undefined`.
 */
export const bankMapper = (data: Partial<Bank>): Bank => {
  if (data.name === undefined) {
    throw new Error('The "name" field is required.');
  }

  return {
    id: data.id,  // Valor predeterminado para id
    name: data.name,   // Se asegura que name siempre sea un string
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
    create_date: data.create_date,
    write_date: data.write_date,
    create_uid: data.create_uid,
    write_uid: data.write_uid,
  };
};
