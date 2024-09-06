import { supabase } from '../../../supabase/supabaseClient';

/**
 * Inserta una nueva entidad en la base de datos.
 * 
 * @param tableName - Nombre de la tabla donde se va a insertar la entidad.
 * @param entity - La entidad que se va a insertar, sin incluir el ID.
 * @param mapper - (Opcional) Función para mapear los datos de la entidad antes de la inserción.
 * @param mapperFromDatabase - (Opcional) Función para mapear los datos devueltos por la base de datos.
 * 
 * @returns - La entidad insertada con el ID asignado por el servidor.
 */
export const create = async <T extends { id: number }, U>(
  tableName: string,
  entity: U,
  mapper?: (entity: U) => Partial<U>,
  mapperFromDatabase?: (data: Partial<T>) => T
): Promise<T> => {
  // Paso 1: Mapear la entidad si se proporciona un mapper
  const mappedEntity = mapper ? mapper(entity) : (entity as unknown as Partial<U>);

  const storedUser = localStorage.getItem('user');
  if (!storedUser) {
    throw new Error('No se encontró el usuario en el localStorage');
  }
  const user = JSON.parse(storedUser);

  // Paso 2: Insertar la entidad en la base de datos
  const { data, error } = await supabase
    .from(tableName)
    .insert([{
      ...mappedEntity,
      create_uid: user.id,
      write_uid: user.id,
      create_date: new Date(),
      write_date: new Date(),
    }])
    .select('*')
    .single();

  // Paso 3: Manejar errores
  if (error) {
    console.error(`Error creando entidad en la tabla "${tableName}":`, error.message);
    throw new Error(`Falló la creación de la entidad en la tabla "${tableName}": ${error.message}`);
  }

  // Paso 4: Verificar que el resultado contiene un ID y retornar la entidad insertada
  if (data) {
    return mapperFromDatabase ? mapperFromDatabase(data) : (data as T);
  } else {
    throw new Error('Falló la creación de la entidad: No se retornó ID.');
  }
};
