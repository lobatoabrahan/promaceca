import { supabase } from '../../../supabase/supabaseClient';

/**
 * Inserta una nueva entidad en la base de datos.
 * 
 * @param tableName - Nombre de la tabla donde se va a insertar la entidad.
 * @param entity - La entidad que se va a insertar, sin incluir el ID.
 * @param mapper - (Opcional) Función para mapear los datos de la entidad antes de la inserción.
 * 
 * @returns - La entidad insertada con el ID asignado por la base de datos, o `null` si ocurre un error.
 */
export const create = async <T extends object, U extends Omit<T, 'id'>>(
  tableName: string,
  entity: U,
  mapper?: (entity: U) => T
): Promise<T | null> => {
  // Paso 1: Mapear la entidad si se proporciona un mapper
  const mappedEntity = mapper ? mapper(entity) : (entity as unknown as T);

  // Paso 2: Insertar la entidad en la base de datos
  const { data, error } = await supabase
    .from(tableName)
    .insert([mappedEntity])
    .select('*')
    .single();

  // Paso 3: Manejar errores
  if (error) {
    console.error(`Error creating entity in table "${tableName}":`, error.message);
    return null;
  }

  // Paso 4: Retornar la entidad insertada
  return data as T;
};
