export interface EventType {
  name: string;
  id: number;
  type: string;
  status?: string;
  parentEventId?: number;
}
