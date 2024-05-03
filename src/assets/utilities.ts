export const transformCoordinates = (canvas: SVGSVGElement | null, x: number, y: number) => {
  let transX = 0, transY = 0
  if (canvas) {
    const CTM = canvas.getScreenCTM();
    if (CTM) {
      transX = (x - CTM.e) / CTM.a;
      transY = (y - CTM.f) / CTM.d;
    }
  }
  return { transX, transY };
}

export const useUpdateXYAndDistance = (prevX?: number, prevY?: number, nextX?: number, nextY?: number) => {
  if (!prevX || !prevY || !nextX || !nextY) return { newX: 0, newY: 0, newWidth: 0, newHeight: 0 }

  let newX = prevX
  let newWidth = nextX - prevX
  if (newWidth < 0) {
    newX = prevX + newWidth
    newWidth = Math.abs(newWidth)
  }

  let newHeight = nextY - prevY
  let newY = prevY
  if (newHeight < 0) {
    newY = prevY + newHeight
    newHeight = Math.abs(newHeight)
  }

  return { newX, newY, newWidth, newHeight }
}