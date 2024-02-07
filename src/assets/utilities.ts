export const transformCoordinates = (canvas: SVGSVGElement | null, x: number, y: number) => {
  let transX = 0, transY = 0
  if (canvas) {
    const CTM = canvas.getScreenCTM();
    if (CTM) {
      transX = (x - CTM.e) / CTM.a;
      transY = (y - CTM.f) / CTM.d;
    }
  }
  return { transX: transX, transY: transY };
}