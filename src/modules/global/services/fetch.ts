import { supabase } from '../../../supabase/supabaseClient';

export const fetch = async <T>(
  tableName: string,
  mapper?: (data: T) => T
): Promise<T[]> => {
  const { data, error } = await supabase
    .from(tableName)
    .select('*');

  if (error) throw new Error(error.message);

  // Si se proporciona un mapper, se aplicará a cada elemento de los datos
  if (mapper) {
    return data.map(mapper);
  }

  return data as T[];
};
