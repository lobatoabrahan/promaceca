// services/realtimeBank.ts

import { supabase } from "../../../supabase/supabaseClient";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const subscribeToBankChanges = (onUpdate: (payload: any) => void) => {
  const channel = supabase.channel('public:res_bank');

  channel
    .on('postgres_changes', { event: '*', schema: 'public', table: 'res_bank' }, onUpdate)
    .subscribe();

  return channel;
};
