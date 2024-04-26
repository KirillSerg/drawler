export interface Element {
  id: string;
  type: "free" | "rect" | "ellipse" | "line" | "polygon";
  x?: number;
  y?: number;
  cx?: number;
  cy?: number;
  rx?: number;
  ry?: number;
  width?: number;
  height?: number;
  stroke?: string;
  strokeWidth?: number;
  fill?: string;
}

export interface Area {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

export interface Coordinates {
  x: number;
  y: number;
}

export type ElemenEvent =
  React.MouseEvent<SVGRectElement, MouseEvent>
  | React.MouseEvent<SVGEllipseElement, MouseEvent>
  | React.MouseEvent<SVGLineElement, MouseEvent>
  | React.MouseEvent<SVGPolygonElement, MouseEvent>
  | React.MouseEvent<SVGSVGElement, MouseEvent>
