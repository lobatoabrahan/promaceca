import { supabase } from '../../../supabase/supabaseClient';

/**
 * Obtiene una entidad por su ID desde la base de datos.
 * 
 * @param id - El ID de la entidad a buscar.
 * @param tableName - El nombre de la tabla desde la cual se obtiene la entidad.
 * @param mapper - (Opcional) Función para mapear los datos devueltos por la base de datos.
 * 
 * @returns - La entidad encontrada, o `null` si no se encuentra.
 */
export const fetchById = async <T>(
  id: number,
  tableName: string,
  mapper?: (data: T) => T
): Promise<T | null> => {
  const { data, error } = await supabase
    .from(tableName)
    .select('*')
    .eq('id', id)
    .single(); // Utiliza .single() para obtener un solo registro

  if (error) {
    console.error(`Error fetching entity by ID from table "${tableName}":`, error.message);
    throw new Error(`Failed to fetch entity by ID from table "${tableName}": ${error.message}`);
  }

  // Si no se encontró ninguna entidad, devuelve null
  if (!data) {
    return null;
  }

  // Aplica el mapper si está definido
  return mapper ? mapper(data) : (data as T);
};
