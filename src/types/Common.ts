export interface Element {
  id: string;
  type: "rect" | "circle" | "line";
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  stroke?: string;
  strokeWidth?: number;
  fill?: string;
}