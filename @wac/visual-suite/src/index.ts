interface VisualConfigDataParams {
  [key: string]: string;
}

export interface VisualConfigDataSubConfig {
  code: string;
  name: string;
  description: string;
  eventId: number;
  enableVisualTracking: boolean,
  params?: VisualConfigDataParams[];
}

export interface VisualConfig {
  id: number;
  selector: string;
  scope: 'global' | 'local';
  dispatchEventName: string;
  config: VisualConfigDataSubConfig;
}

export interface EventDistroyObject {
  destroy: () => void;
}

export interface EventCancelObject {
  cancel: () => void;
}

export { delegate } from './delegate'
export { Interceptor } from './interceptor'
