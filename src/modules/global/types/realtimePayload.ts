export interface RealTimePayLoadTypes<T> {
    eventType: 'INSERT' | 'UPDATE' | 'DELETE';
    new: T;
    old?: T;
  }