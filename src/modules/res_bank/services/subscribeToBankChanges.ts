import { supabase } from "../../../supabase/supabaseClient";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const subscribeToBankChanges = (onUpdate: (payload: any) => void, id?: number) => {
  // Crear un nombre de canal único basado en el ID, o usar un nombre genérico si no hay ID
  const channelName = id ? `public:res_bank_${id}` : 'public:res_bank';
  const channel = supabase.channel(channelName);

  // Si se proporciona un ID, filtra por el ID
  if (id) {
    channel
      .on(
        'postgres_changes', 
        { event: '*', schema: 'public', table: 'res_bank', filter: `id=eq.${id}` }, 
        onUpdate
      )
      .subscribe();
  } else {
    // Si no hay ID, suscríbete a todos los cambios en la tabla
    channel
      .on(
        'postgres_changes', 
        { event: '*', schema: 'public', table: 'res_bank' }, 
        onUpdate
      )
      .subscribe();
  }

  return channel;
};
