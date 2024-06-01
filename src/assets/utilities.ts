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
  if (!prevX || !prevY || !nextX || !nextY) return { newX: 0, newY: 0, newWidth: 0, newHeight: 0, newRX: 0, newRY: 0 }

  let newX = prevX
  let newWidth = nextX - prevX
  let newRX = (nextX - prevX) / 2
  if (newWidth < 0) {
    newX = prevX + newWidth
    newWidth = Math.abs(newWidth)
    newRX = Math.abs(newRX)
  }

  let newHeight = nextY - prevY
  let newY = prevY
  let newRY = (nextY - prevY) / 2
  if (newHeight < 0) {
    newY = prevY + newHeight
    newHeight = Math.abs(newHeight)
    newRY = Math.abs(newRY)
  }

  return { newX, newY, newWidth, newHeight, newRX, newRY }
}

export const getTrianglePointsArrFromString = (stringPoints: string) => {
  const firstArrLevel = stringPoints.split(" ")
  const ArrOfXYPairArr = firstArrLevel.map(xy => xy.split(","))
  return ArrOfXYPairArr
}

export const getPencilPointsArrFromString = (stringPoints: string) => {
  const trimmedStart = stringPoints.slice(2)
  const firstArrLevel = trimmedStart.split(" L ")
  const ArrOfXYPairArr = firstArrLevel.map(xy => xy.split(" "))
  return ArrOfXYPairArr
}
