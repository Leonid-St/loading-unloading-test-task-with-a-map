export interface IChangePointPayload {
  recordId: number;
  pointId: number;
  type: 'loadPoint' | 'unloadPoint';
}
