export interface IGeometry {
  coordinates: number[][];
  type: string;
}

export interface IManeuver {
  bearing_after: number;
  bearing_before: number;
  location: number[];
  type: string;
}

export interface IIntersection {
  out: number;
  entry: boolean[];
  bearings: number[];
  location: number[];
  in?: number;
}

export interface IStep {
  geometry: IGeometry;
  maneuver: IManeuver;
  mode: string;
  driving_side: string;
  name: string;
  intersections: IIntersection[];
  weight: number;
  duration: number;
  distance: number;
}

export interface ILeg {
  steps: IStep[];
  summary: string;
  weight: number;
  duration: number;
  distance: number;
}

export interface IRoute {
  legs: ILeg[];
  weight_name: string;
  weight: number;
  duration: number;
  distance: number;
}

export interface IWaypoint {
  hint: string;
  distance: number;
  name: string;
  location: number[];
}

export interface IResponseRoute {
  code: string;
  routes: IRoute[];
  waypoints: IWaypoint[];
}
