export interface Element {
  id: string;
  type_name: ElementsTypeName;
  type: "free" | "rect" | "ellipse" | "line" | "polygon" | "foreignObject" | "path";
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
  points: string  //"x,y x,y x,y ..."
  textvalue: string;
  d: string;
  markerEnd: string;
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

export const ELEMENT_TYPE_VARIANTS = {
  free: 'free',
  rect: 'rect',
  ellipse: 'ellipse',
  polygon: 'polygon',
  line: 'line',
  arrow_line: 'line',
  text: "foreignObject",
  pencil: "path",
};

export type ElementsTypeName = keyof typeof ELEMENT_TYPE_VARIANTS;

export type CanvasViewBox = {
  x: number,
  y: number,
  percentage: number,
  width: number,
  height: number
}

export enum UpdateCanvasViewBoxFn {
  ZOOMUP,
  ZOOMDOWN,
  DRAGUP,
  DRAGRIGHT,
  DRAGDOWN,
  DRAGLEFT,
  ZOOMRESET,
}
