import { Area, Coordinates, Element } from "../types/CommonTypes";

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
  const ArrOfXYPairArr = firstArrLevel.map(xy => xy.split(" ").map(coord => Number(coord)))
  return ArrOfXYPairArr
}

export const getPencilSize = (element: Element) => {
  const pointsArr = getPencilPointsArrFromString(element.d)
  let maxX = 0, minX = Infinity, maxY = 0, minY = Infinity
  pointsArr.forEach((point) => {
    if (point[0] > maxX) maxX = +point[0]
    if (point[0] < minX) minX = +point[0]
    if (point[1] > maxY) maxY = +point[1]
    if (point[1] < minY) minY = +point[1]
  })
  return { width: maxX - minX, height: maxY - minY }

}

export const useResizedCoordinates = (
  selectedEl: Element,
  update: Coordinates,
  selectingArea: Area,
  resizeVector: string
) => {
  // rect
  let updatedX = selectedEl.x
  let updatedY = selectedEl.y
  let updatedWidth = selectedEl.width
  let updatedHeight = selectedEl.height
  // ellipse
  let updatedCX = selectedEl.cx
  let updatedRX = selectedEl.rx
  let updatedCY = selectedEl.cy
  let updatedRY = selectedEl.ry
  // line
  let updatedX1 = selectedEl.x1
  let updatedX2 = selectedEl.x2
  // poligon(triangle)
  let updatedTrianglePointsArr = getTrianglePointsArrFromString(selectedEl.points)
  // pencil
  let pencilPointsArr = getPencilPointsArrFromString(selectedEl.d)

  const nordResize = () => {
    if (selectedEl.type !== "line") {
      updatedY = (selectedEl.y + (update.y - selectingArea.startY)) >=
        selectedEl.y + selectedEl.height ?
        selectedEl.y + selectedEl.height :
        selectedEl.y + (update.y - selectingArea.startY)
      updatedHeight = Math.abs(selectedEl.height - (update.y - selectingArea.startY))
      updatedCY = selectedEl.cy + (update.y - selectingArea.startY) / 2
      updatedRY = Math.abs(selectedEl.ry - (update.y - selectingArea.startY) / 2)

      if (+updatedTrianglePointsArr[1][1] < +updatedTrianglePointsArr[0][1]) {
        // left-bottom, top, right-bottom
        updatedTrianglePointsArr = [
          [updatedTrianglePointsArr[0][0], updatedTrianglePointsArr[0][1]],
          [updatedTrianglePointsArr[1][0], `${+updatedTrianglePointsArr[1][1] + (update.y - selectingArea.startY)}`],
          [updatedTrianglePointsArr[2][0], updatedTrianglePointsArr[2][1]]
        ]
      } else {
        updatedTrianglePointsArr = [
          [updatedTrianglePointsArr[0][0], `${+ updatedTrianglePointsArr[0][1] + (update.y - selectingArea.startY)}`],
          [updatedTrianglePointsArr[1][0], updatedTrianglePointsArr[1][1]],
          [updatedTrianglePointsArr[2][0], `${+ updatedTrianglePointsArr[2][1] + (update.y - selectingArea.startY)}`]
        ]
      }

      // get the percentage of each pencil point from the height of the element respectively
      pencilPointsArr = pencilPointsArr.map((point) =>
        [point[0], point[1] + ((update.y - selectingArea.startY) * (1 - ((point[1] - selectedEl.y) / selectedEl.height)))]    //* (selectedEl.y+selectedEl.height)]
      )
    }
  }
  const southResize = () => {
    if (selectedEl.type !== "line") {
      updatedY = selectedEl.y >=
        (selectedEl.y + selectedEl.height + (update.y - selectingArea.startY)) ?
        (selectedEl.y + selectedEl.height + (update.y - selectingArea.startY)) :
        selectedEl.y
      updatedHeight = Math.abs(selectedEl.height + (update.y - selectingArea.startY))
      updatedCY = selectedEl.cy + (update.y - selectingArea.startY) / 2
      updatedRY = Math.abs(selectedEl.ry + (update.y - selectingArea.startY) / 2)

      if (+updatedTrianglePointsArr[1][1] > +updatedTrianglePointsArr[0][1]) {
        // left-bottom, top, right-bottom
        updatedTrianglePointsArr = [
          [updatedTrianglePointsArr[0][0], updatedTrianglePointsArr[0][1]],
          [updatedTrianglePointsArr[1][0], `${+updatedTrianglePointsArr[1][1] + (update.y - selectingArea.startY)}`],
          [updatedTrianglePointsArr[2][0], updatedTrianglePointsArr[2][1]]
        ]
      } else {
        updatedTrianglePointsArr = [
          [updatedTrianglePointsArr[0][0], `${+ updatedTrianglePointsArr[0][1] + (update.y - selectingArea.startY)}`],
          [updatedTrianglePointsArr[1][0], updatedTrianglePointsArr[1][1]],
          [updatedTrianglePointsArr[2][0], `${+ updatedTrianglePointsArr[2][1] + (update.y - selectingArea.startY)}`]
        ]
      }

      // get the percentage of each pencil point from the and height of the element respectively
      pencilPointsArr = pencilPointsArr.map((point) =>
        [point[0], point[1] + ((update.y - selectingArea.startY) * ((point[1] - selectedEl.y) / selectedEl.height))]    //* (selectedEl.y+selectedEl.height)]
      )
    }
  }
  const eastResize = () => {
    updatedX = selectedEl.x >=
      (selectedEl.x + selectedEl.width + (update.x - selectingArea.startX)) ?
      (selectedEl.x + selectedEl.width + (update.x - selectingArea.startX)) :
      selectedEl.x
    updatedWidth = Math.abs(selectedEl.width + (update.x - selectingArea.startX))
    updatedCX = selectedEl.cx + (update.x - selectingArea.startX) / 2
    updatedRX = Math.abs(selectedEl.rx + (update.x - selectingArea.startX) / 2)
    updatedX2 = selectedEl.x2 + (update.x - selectingArea.startX)

    if (+updatedTrianglePointsArr[0][0] < +updatedTrianglePointsArr[2][0]) {
      // left-bottom, top, right-bottom
      updatedTrianglePointsArr = [
        [updatedTrianglePointsArr[0][0], updatedTrianglePointsArr[0][1]],
        [`${+updatedTrianglePointsArr[1][0] + (update.x - selectingArea.startX) / 2}`, updatedTrianglePointsArr[1][1]],
        [`${+ updatedTrianglePointsArr[2][0] + (update.x - selectingArea.startX)}`, updatedTrianglePointsArr[2][1]]
      ]
    } else {
      updatedTrianglePointsArr = [
        [`${+updatedTrianglePointsArr[0][0] + (update.x - selectingArea.startX)}`, updatedTrianglePointsArr[0][1]],
        [`${+updatedTrianglePointsArr[1][0] + (update.x - selectingArea.startX) / 2}`, updatedTrianglePointsArr[1][1]],
        [updatedTrianglePointsArr[2][0], updatedTrianglePointsArr[2][1]]
      ]
    }

    // get the percentage of each point from the width and height of the element respectively
    pencilPointsArr = pencilPointsArr.map((point) =>
      [point[0] + ((update.x - selectingArea.startX) * ((point[0] - selectedEl.x) / selectedEl.width)), point[1]]
    )
  }
  const westResize = () => {
    updatedX = (selectedEl.x + (update.x - selectingArea.startX)) >=
      selectedEl.x + selectedEl.width ?
      selectedEl.x + selectedEl.width :
      selectedEl.x + (update.x - selectingArea.startX)
    updatedWidth = Math.abs(selectedEl.width - (update.x - selectingArea.startX))
    updatedCX = selectedEl.cx + (update.x - selectingArea.startX) / 2
    updatedRX = Math.abs(selectedEl.rx - (update.x - selectingArea.startX) / 2)
    updatedX1 = selectedEl.x1 + (update.x - selectingArea.startX)

    if (+updatedTrianglePointsArr[0][0] > +updatedTrianglePointsArr[2][0]) {
      // left-bottom, top, right-bottom
      updatedTrianglePointsArr = [
        [updatedTrianglePointsArr[0][0], updatedTrianglePointsArr[0][1]],
        [`${+updatedTrianglePointsArr[1][0] + (update.x - selectingArea.startX) / 2}`, updatedTrianglePointsArr[1][1]],
        [`${+ updatedTrianglePointsArr[2][0] + (update.x - selectingArea.startX)}`, updatedTrianglePointsArr[2][1]]
      ]
    } else {
      updatedTrianglePointsArr = [
        [`${+updatedTrianglePointsArr[0][0] + (update.x - selectingArea.startX)}`, updatedTrianglePointsArr[0][1]],
        [`${+updatedTrianglePointsArr[1][0] + (update.x - selectingArea.startX) / 2}`, updatedTrianglePointsArr[1][1]],
        [updatedTrianglePointsArr[2][0], updatedTrianglePointsArr[2][1]]
      ]
    }

    // get the percentage of each point from the width and height of the element respectively
    pencilPointsArr = pencilPointsArr.map((point) =>
      [point[0] + ((update.x - selectingArea.startX) * (1 - ((point[0] - selectedEl.x) / selectedEl.width))), point[1]]
    )
  }

  switch (resizeVector) {
    case "nord":
      nordResize()
      break;
    case "south":
      southResize()
      break;
    case "east":
      eastResize()
      break;
    case "west":
      westResize()
      break;
    case "nordwest":
      nordResize()
      westResize()
      break;
    case "nordeast":
      nordResize()
      eastResize()
      break;
    case "southeast":
      southResize()
      eastResize()
      break;
    case "southwest":
      southResize()
      westResize()
      break;
  }

  return ({
    x: updatedX,
    y: updatedY,
    width: updatedWidth,
    height: updatedHeight,
    cx: updatedCX,
    rx: selectedEl.type === "ellipse" ? updatedRX : selectedEl.rx !== 0 ? updateBorderRadius(updatedWidth, updatedHeight) : 0,
    cy: updatedCY,
    ry: selectedEl.type === "ellipse" ? updatedRY : selectedEl.ry !== 0 ? updateBorderRadius(updatedWidth, updatedHeight) : 0,
    x1: updatedX1,
    x2: updatedX2,
    points: updatedTrianglePointsArr.map(points => points.join()).join(" "),
    d: "M " + pencilPointsArr.map(points => points.join(" ")).join(" L "),
    fontSize: (updatedHeight / 1.5).toString(),
  })
}

export const updateBorderRadius = (width: number, height: number) => {
  return width < height ? width * 0.2 : height * 0.2
}