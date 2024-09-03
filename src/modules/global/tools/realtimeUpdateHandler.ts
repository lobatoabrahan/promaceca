import { RealTimePayLoadTypes } from '../../global/types/realtimePayload';

interface Identifiable {
  id: number;
}


export const realtimeUpdateHandler = <T extends Identifiable>(
  setState: React.Dispatch<React.SetStateAction<T[]>>
) => {
  return (payload: RealTimePayLoadTypes<T>) => {
    switch (payload.eventType) {
      case 'INSERT':
        setState(prev => [...prev, payload.new]);
        break;
      case 'UPDATE':
        setState(prev => prev.map(item => item.id === payload.new.id ? payload.new : item));
        break;
      case 'DELETE':
        setState(prev => prev.filter(item => item.id !== payload.old?.id));
        break;
      default:
        break;
    }
  };
};
