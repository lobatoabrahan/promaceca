export interface RealtimePayload<T> {
    eventType: 'INSERT' | 'UPDATE' | 'DELETE';
    new: T;
    old?: T;
  }