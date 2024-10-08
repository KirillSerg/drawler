export interface Element {
  id: string;
  type_name: ElementsTypeName;
  type: "grab" | "free" | "rect" | "ellipse" | "line" | "polygon" | "foreignObject" | "path" | "image";
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
  href: string | ArrayBuffer | null;
  markerEnd: string;
  stroke: string;
  strokeWidth: number;
  strokeDasharray: string;
  strokeLinecap: 'butt' | 'round' | 'square' | 'inherit' | undefined;
  fill: string;
  fontSize: string;
  opacity: string;
  connectedlines: {
    element: Element;
    byStart: boolean;
    byEnd: boolean;
  }[]
}

export interface ElementProps {
  id?: string;
  types: Element['type'][];
  type_name?: Element['type_name']
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  cx?: number;
  cy?: number;
  rx?: number;
  ry?: number;
  x1?: number;
  y1?: number;
  x2?: number;
  y2?: number;
  points?: string; //"x,y x,y x,y ..."
  textvalue?: string;
  d?: string;
  href?: string | ArrayBuffer | null;
  markerEnd?: string;
  isSelected?: boolean;
  stroke?: string;
  strokeWidth?: number;
  strokeDasharray?: string;
  strokeLinecap?: 'butt' | 'round' | 'square' | 'inherit';
  fill?: string;
  fontSize?: string;
  opacity?: string;
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
  | React.MouseEvent<SVGPathElement, MouseEvent>
  | React.MouseEvent<SVGImageElement, MouseEvent>

export const ELEMENT_TYPE_VARIANTS = {
  grab: "grab",
  free: 'free',
  rect: 'rect',
  ellipse: 'ellipse',
  polygon: 'polygon',
  line: 'line',
  arrow_line: 'line',
  text: "foreignObject",
  pencil: "path",
  image: "image",
};

export type ElementsTypeName = keyof typeof ELEMENT_TYPE_VARIANTS;

export type CanvasViewBox = {
  x: number,
  y: number,
  percentage: number,
  width: number,
  height: number
}

export enum ZoomCanvasFn {
  ZOOMUP,
  ZOOMDOWN,
  ZOOMRESET,
}
