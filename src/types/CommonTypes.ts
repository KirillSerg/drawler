export interface Element {
  id: string;
  type: "free" | "rect" | "ellipse" | "line" | "polygon" | "foreignObject";
  x: number;
  y: number;
  width: number;
  height: number;
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  points: string;  //"x,y x,y x,y ..."
  textvalue: string;
  stroke: string;
  strokeWidth: number;
  fill: string;
  fontSize: string;
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
  | React.MouseEvent<SVGTextElement, MouseEvent>
  | React.MouseEvent<SVGForeignObjectElement, MouseEvent>
