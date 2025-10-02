type Point = { lat: number; lon: number };
type PolygonCoords = Point[];
type MultiPolygonCoords = Point[][];

export const getCord = (
  coords: number[][][] | number[][]
): { initialCoord: Point; polygon?: PolygonCoords; multiPolygon?: MultiPolygonCoords } => {
  let initialCoord: Point;
  let polygon: PolygonCoords | undefined;
  let multiPolygon: MultiPolygonCoords | undefined;

  if (Array.isArray(coords[0][0])) {
    // coords: number[][][]
    const firstCoord = (coords as number[][][])[0][0]; // always [lon, lat]
    initialCoord = { lat: firstCoord[1], lon: firstCoord[0] };

    multiPolygon = (coords as number[][][]).map(polygon =>
      polygon.map(coord => ({ lat: coord[1], lon: coord[0] }))
    );
  } else {
    // coords: number[][]
    const firstCoord = (coords as number[][])[0]; // always [lon, lat]
    initialCoord = { lat: firstCoord[1], lon: firstCoord[0] };

    polygon = (coords as number[][]).map(coord => ({ lat: coord[1], lon: coord[0] }));
  }

  return { initialCoord, polygon, multiPolygon };
};