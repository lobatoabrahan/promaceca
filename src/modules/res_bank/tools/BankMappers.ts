// modules/res_bank/tools/bankMappers.ts

import { Bank } from "../../../types";

/**
 * Convierte datos de la base de datos a la entidad `Bank`.
 * @param data - Datos provenientes de la base de datos.
 * @returns - Entidad `Bank`.
 */
export const bankMapper = (data: Bank): Bank => {
  return {
    id: data.id,
    name: data.name,
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