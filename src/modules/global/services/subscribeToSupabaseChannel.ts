import { supabase } from '../../../supabase/supabaseClient';

const subscribeToSupabaseChannel = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUpdate: (payload: any) => void,
  table: string,
  id?: number
) => {
  // Create a unique channel name based on the ID, or use a generic name if no ID is provided
  const channelName = id ? `public:${table}_${id}` : `public:${table}`;
  const channel = supabase.channel(channelName);

  // Subscribe to changes in the '${table}' table, with optional filtering by ID
  channel
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: table,
        ...(id && { filter: `id=eq.${id}` }),
      },
      onUpdate
    )
    .subscribe();

  return channel;
};

export default subscribeToSupabaseChannel;
