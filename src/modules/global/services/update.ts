import { supabase } from "../../../supabase/supabaseClient";

export const update = async <T extends { id: number  }>(
    tableName: string,
    entity: Partial<T> & { id: number },
    mapper?: (entity: Partial<T>) => Partial<T>
  ): Promise<T | null> => {
    const mappedEntity = mapper ? mapper(entity) : entity;
    const { id, ...entityWithoutId } = mappedEntity;
  
    const { data, error } = await supabase
      .from(tableName)
      .update(entityWithoutId)
      .eq('id', id)
      .select('*')
      .single();
  
    if (error) {
      console.error(`Error updating entity in table "${tableName}":`, error.message);
      throw new Error(`Failed to update entity: ${error.message}`);
    }
  
    return data as T;
  };
  