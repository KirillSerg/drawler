import { atom } from "jotai";
import { Area, CanvasViewBox, Coordinates, Element, ZoomCanvasFn } from "../types/CommonTypes";
import { atomWithStorage } from 'jotai/utils'
import {
  getPencilPointsArrFromString,
  useResizedCoordinates,
  getTrianglePointsArrFromString,
  useUpdateXYAndDistance,
  getPencilSize,
  getBorderRadius,
  getConnect,
} from "../assets/utilities";

const initialElement: Element = {
  type: "free",
  type_name: "free",
  id: "",
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  cx: 0,
  cy: 0,
  rx: 0,
  ry: 0,
  x1: 0,
  y1: 0,
  x2: 0,
  y2: 0,
  points: "",
  textvalue: "",
  d: "",
  href: "",
  markerEnd: "",
  stroke: 'black',
  strokeWidth: 4,
  strokeDasharray: "",
  strokeLinecap: undefined,
  fill: 'transparent',
  fontSize: "28px",
  opacity: "1",
  connectedlines: []
}
const initialCanvasViewBox = {
  x: 0,
  y: 0,
  percentage: 100,
  width: 1920,
  height: 1080,
}

export const creationInitialElementAtom = atom<Element>(initialElement)

export const historyAtom = atomWithStorage<Element[][]>("history", [[]])

export const currentHistoryIndexAtom = atomWithStorage<number>("historyIndex", 0)

export const elementsAtom = atomWithStorage<Element[]>("elements", [])

export const selectedElementAtom = atom<Element[] | []>([])

export const selectingAreaAtom = atom<Area | null>(null)

export const isDraggingAtom = atom(false)

export const resizeVectorAtom = atom("")

export const isDrawingAtom = atom(
  (get) => get(creationInitialElementAtom).type_name === "free" ||
    get(creationInitialElementAtom).type_name === "grab" ?
    false :
    true
)

export const keyPressedAtom = atom<{ ctrlKey: boolean; key: string }>({ ctrlKey: false, key: "" })

export const onKeyPressAtom = atom(
  null,
  (get, set, key: { ctrlKey: boolean; key: string }) => {
    // console.info(key)
    set(keyPressedAtom, key)
    const creationInitialElement = get(creationInitialElementAtom)

    switch (true) {
      case key.key === "Delete":
        set(deleteElementsAtom)
        break;
      case (key.key === "Escape"):
        set(creationInitialElementAtom, (prev) => ({
          ...prev,
          type: "free",
          type_name: "free",
          id: "",
        }))
        break;
      case (key.key === "+" && key.ctrlKey):
        set(zoomCanvasAtom, ZoomCanvasFn.ZOOMUP)
        break;
      case (key.key === "-" && key.ctrlKey):
        set(zoomCanvasAtom, ZoomCanvasFn.ZOOMDOWN)
        break;
      case (!key.ctrlKey && creationInitialElement.type_name === "grab"):
        set(creationInitialElementAtom, (prev) => ({
          ...prev,
          type: "free",
          type_name: "free",
          id: "",
        }))
        break;
    }
  }
)

export const canvasViewBoxAtom = atomWithStorage<CanvasViewBox>("canvasViewBox", initialCanvasViewBox)

export const zoomCanvasAtom = atom(
  null,
  (get, set, updateFn: ZoomCanvasFn) => {
    const canvasViewBox = get(canvasViewBoxAtom)

    switch (updateFn) {
      case ZoomCanvasFn.ZOOMDOWN:
        if (canvasViewBox.percentage === 0) return;
        set(canvasViewBoxAtom, {
          ...canvasViewBox,
          percentage: canvasViewBox.percentage - 10,
          width: canvasViewBox.width + 1920 * 0.1,
          height: canvasViewBox.height + 1080 * 0.1,
        })
        break;

      case ZoomCanvasFn.ZOOMUP:
        if (canvasViewBox.percentage === 190) return;
        set(canvasViewBoxAtom, {
          ...canvasViewBox,
          percentage: canvasViewBox.percentage + 10,
          width: canvasViewBox.width - 1920 * 0.1,
          height: canvasViewBox.height - 1080 * 0.1,
        })
        break;

      case ZoomCanvasFn.ZOOMRESET:
        set(canvasViewBoxAtom, initialCanvasViewBox)
        break;
    }
  }
)

export const grabCanvasAtom = atom(
  null,
  (get, set, update: Coordinates) => {
    const canvasViewBox = get(canvasViewBoxAtom)
    set(canvasViewBoxAtom, {
      ...canvasViewBox,
      x: canvasViewBox.x - update.x,
      y: canvasViewBox.y - update.y
    })
  }
)

export const updateElementsAtom = atom(
  null,
  (get, set, updatedElement: Element) => {
    set(elementsAtom, (prev) => prev.map((el) =>
      el.id === updatedElement.id ? updatedElement : el,
    ))
    const isSelected = !!get(selectedElementAtom).find((el) => el.id === updatedElement.id)
    // if changes from inspector
    if (isSelected
      && !get(isDraggingAtom)
      && !get(isDrawingAtom)
      && !get(resizeVectorAtom)
    ) {
      set(selectedElementAtom, (prev) => {
        return prev?.map(el => el.id === updatedElement.id ? updatedElement : el) || null
      })
      if (updatedElement.type_name !== 'text') {
        set(setHistoryAtom)
      }
    }

    // if drawing with pencil we need to put fresh d
    if (updatedElement.type_name === "pencil" && get(isDrawingAtom)) {
      set(selectedElementAtom, (prev) => {
        return prev?.map(el => el.id === updatedElement.id ? updatedElement : el) || null
      })
    }
  }
)

export const deleteElementsAtom = atom(
  null,
  (get, set) => {
    const selectedElement = get(selectedElementAtom)
    set(elementsAtom, (prev) => prev.filter((el) => !selectedElement.find((selectedEl) => selectedEl.id === el.id)))
    set(selectedElementAtom, [])
    set(setHistoryAtom)
  }
)

export const onMouseDownAtom = atom(
  null,
  (get, set, update: Coordinates) => {
    // console.log("onMouseDownAtom")
    if (!get(isDraggingAtom) && !get(isDrawingAtom) && !get(resizeVectorAtom) && !get(keyPressedAtom).ctrlKey) {
      set(selectedElementAtom, [])
    }
    set(selectingAreaAtom, {
      startX: update.x,
      startY: update.y,
      endX: update.x,
      endY: update.y
    })
    if (get(isDrawingAtom) && !get(keyPressedAtom).ctrlKey) {
      const newEl = {
        ...get(creationInitialElementAtom),
        id: crypto.randomUUID(),
        x: update.x,
        y: update.y,
        cx: update.x,
        cy: update.y,
        x1: update.x,
        y1: update.y,
        x2: update.x,
        y2: update.y,
        d: `M ${update.x} ${update.y}`
        // points: `${}`,
        // fontSize: ,
      }
      set(elementsAtom, (prev) => [...prev, newEl])
      set(selectedElementAtom, [newEl])
      set(creationInitialElementAtom, (prev) => {
        return { ...prev, href: "" }
      })
    }

    if (get(keyPressedAtom).ctrlKey && !get(isDraggingAtom)) {
      set(creationInitialElementAtom, {
        ...get(creationInitialElementAtom),
        type: "grab",
        type_name: "grab",
      })
    }
  }
)

export const onDragStartAtom = atom(
  null,
  (get, set, element: Element) => {
    // console.log("onDragStartAtom")
    if (!get(isDrawingAtom)) {
      // if not selected yet this element
      if (!get(selectedElementAtom).find(el => el.id === element.id)) {
        //if multyselect
        if (get(keyPressedAtom).ctrlKey) {
          set(selectedElementAtom, (prev) => [...prev, element])
        } else {
          set(selectedElementAtom, [element])
        }
      }
      set(isDraggingAtom, true)
    }
  }
)

export const onMouseMoveAtom = atom(
  null,
  (get, set, update: Coordinates) => {
    // console.log("onMouseMoveAtom")
    const selectingArea = get(selectingAreaAtom)
    const selectedElement = get(selectedElementAtom)
    if (selectingArea) {
      selectedElement.forEach((selectedEl) => {
        // if Drag&drop
        if (get(isDraggingAtom) && selectedElement.length > 0) {
          // rect
          const newX = selectedEl.x + (update.x - selectingArea.startX)
          const newY = selectedEl.y + (update.y - selectingArea.startY)
          // ellipse
          const newCX = selectedEl.cx + (update.x - selectingArea.startX)
          const newCY = selectedEl.cy + (update.y - selectingArea.startY)
          // line
          const newX1 = selectedEl.x1 + (update.x - selectingArea.startX)
          const newY1 = selectedEl.y1 + (update.y - selectingArea.startY)
          const newX2 = selectedEl.x2 + (update.x - selectingArea.startX)
          const newY2 = selectedEl.y2 + (update.y - selectingArea.startY)
          // triangle(polygon)
          const newTrianglePointsArr = getTrianglePointsArrFromString(selectedEl.points).map((point) =>
            [
              +point[0] + (update.x - selectingArea.startX),
              +point[1] + (update.y - selectingArea.startY)
            ]
          )
          const newTrianglePoints = newTrianglePointsArr.map(points => points.join()).join(" ")
          // pencil
          const newPencilPointsArr = getPencilPointsArrFromString(selectedEl.d).map((point) =>
            [
              point[0] + (update.x - selectingArea.startX),
              point[1] + (update.y - selectingArea.startY)
            ]
          )
          const newPathData = "M " + newPencilPointsArr.map(points => points.join(" ")).join(" L ")

          // drag connected lines and update updated params in this element
          const newConnections = selectedEl.connectedlines.map((connect) => {
            // if line was draged by another conected element, we need that newest coordinates
            const originalLine = get(elementsAtom).find((elem) => elem.id === connect.element.id)
            if (originalLine && connect.byStart && connect.byEnd) {
              const newConnectedLine = {
                ...originalLine,
                x: connect.element.x + (update.x - selectingArea.startX),
                y: connect.element.y + (update.y - selectingArea.startY),
                x1: connect.element.x1 + (update.x - selectingArea.startX),
                y1: connect.element.y1 + (update.y - selectingArea.startY),
                x2: connect.element.x2 + (update.x - selectingArea.startX),
                y2: connect.element.y2 + (update.y - selectingArea.startY),
              }
              set(updateElementsAtom, newConnectedLine)
              return { ...connect, element: newConnectedLine }
            } else if (originalLine && connect.byStart) {
              const newConnectedLine = {
                ...originalLine,
                x: connect.element.x + (update.x - selectingArea.startX),
                y: connect.element.y + (update.y - selectingArea.startY),
                x1: connect.element.x1 + (update.x - selectingArea.startX),
                y1: connect.element.y1 + (update.y - selectingArea.startY),
              }
              set(updateElementsAtom, newConnectedLine)
              return { ...connect, element: newConnectedLine }
            } else if (originalLine && connect.byEnd) {
              const newConnectedLine = {
                ...originalLine,
                x2: connect.element.x2 + (update.x - selectingArea.startX),
                y2: connect.element.y2 + (update.y - selectingArea.startY),
              }
              set(updateElementsAtom, newConnectedLine)
              return { ...connect, element: newConnectedLine }
            } else return connect
          })


          set(updateElementsAtom, {
            ...selectedEl,
            x: newX,
            y: newY,
            cx: newCX,
            cy: newCY,
            y1: newY1,
            x1: newX1,
            y2: newY2,
            x2: newX2,
            points: newTrianglePoints,
            d: newPathData,
            connectedlines: newConnections
          })
        }

        // if drawwing
        if (get(isDrawingAtom) && selectedElement.length > 0) {
          const { newX, newY, newWidth, newHeight, newRX, newRY } = useUpdateXYAndDistance(
            selectedEl.x,
            selectedEl.y,
            update.x,
            update.y
          )
          set(updateElementsAtom, {
            ...selectedEl,
            x: newX,
            y: newY,
            width: selectedEl.type_name === "pencil" ? getPencilSize(selectedEl)?.width : newWidth,
            height: selectedEl.type_name === "pencil" ? getPencilSize(selectedEl)?.height : newHeight,
            cx: selectedEl.cx + (update.x - selectedEl.x) / 2,
            cy: selectedEl.cy + (update.y - selectedEl.y) / 2,
            rx: selectedEl.type === "ellipse" ? newRX : selectedEl.rx !== 0 ? getBorderRadius(newWidth, newHeight) : 0,
            ry: selectedEl.type === "ellipse" ? newRY : selectedEl.ry !== 0 ? getBorderRadius(newWidth, newHeight) : 0,
            x2: update.x,
            y2: update.y,
            // left-bottom, top, right-bottom
            points: `${selectedEl.x},${update.y} ${selectedEl.x + ((update.x - selectedEl.x) / 2)},${selectedEl.y} ${update.x},${update.y}`,
            fontSize: (newHeight / 1.5).toString(), // i don't know why but 1.5 is working good
            d: selectedEl.d + ` L ${update.x} ${update.y}`
          })
        }

        // if resizing
        const resizeVector = get(resizeVectorAtom)
        if (resizeVector && selectingArea) {
          const resizedCoordinates = useResizedCoordinates(selectedEl, update, selectingArea, resizeVector)
          set(updateElementsAtom, {
            ...selectedEl,
            ...resizedCoordinates,
          })
        }
      })

      // on move entire canvas
      if (get(creationInitialElementAtom).type_name === "grab") {
        set(grabCanvasAtom, { x: update.x - selectingArea.startX, y: update.y - selectingArea.startY })
      }

      set(selectingAreaAtom, { ...selectingArea, endX: update.x, endY: update.y })

      // multy select by selectingArea
      const resizeVector = get(resizeVectorAtom)
      if (!get(isDraggingAtom) && !get(isDrawingAtom) && !resizeVector) {
        if (selectingArea) {
          const areaStartX = selectingArea.startX < selectingArea.endX ? selectingArea.startX : selectingArea.endX
          const areaStartY = selectingArea.startY < selectingArea.endY ? selectingArea.startY : selectingArea.endY
          get(elementsAtom).map((element) => {
            // if element in area
            if (
              element.x > areaStartX &&
              element.y > areaStartY &&
              element.x + element.width < areaStartX + Math.abs(selectingArea.endX - selectingArea.startX) &&
              element.y + element.height < areaStartY + Math.abs(selectingArea.endY - selectingArea.startY)
            ) {
              set(selectedElementAtom, (prev) => [...prev, element]);
            } else {
              set(selectedElementAtom, (prev) => prev.filter((el) => element.id !== el.id));
            }
          })
        }
      }
    }

    // this is necessary to display the selected image preview and to move this image following the cursor
    set(creationInitialElementAtom, (prev) => {
      return {
        ...prev,
        x: update.x,
        y: update.y,
      }
    })
  }
)

export const onMouseUpAtom = atom(
  null,
  (get, set) => {
    // console.log("onMouseUpAtom")
    const creationInitialElement = get(creationInitialElementAtom)
    const selectedElement = get(selectedElementAtom)

    // update selected el from original element
    if (selectedElement.length > 0) {
      const newSelectedEl = selectedElement.map((selectedElel) => {
        const updatedMainElement = get(elementsAtom).find(el => el.id === selectedElel.id) || selectedElel
        const updatedConnectedLines = updatedMainElement.connectedlines.map((connect) => {
          const updatedLine = get(elementsAtom).find(el => el.id === connect.element.id) || connect.element
          return { ...connect, element: updatedLine }
        })
        return { ...updatedMainElement, connectedlines: updatedConnectedLines }
      })
      set(selectedElementAtom, newSelectedEl)

      //check and update connections in line-elements
      newSelectedEl.map((line) => {
        if (line.type === "line") {
          const { elementsToConnect, elementsToDisconnect } = getConnect(line, get(elementsAtom))
          // if line was moved out from element, we must remove connetion what was before
          elementsToDisconnect.forEach((element) => {
            const connectedlines = element.connectedlines.filter(
              (connectedline) => connectedline.element.id !== line.id
            )
            set(updateElementsAtom, {
              ...element,
              connectedlines: connectedlines
            })
          })

          // add connect to the element if line in its area
          elementsToConnect.forEach((connect) => {
            const connectedlines = connect.element.connectedlines.filter(
              (connectedline) => connectedline.element.id !== line.id
            )
            set(updateElementsAtom, {
              ...connect.element,
              connectedlines: [...connectedlines, { ...connect, element: line }]
            })
          })
        }
      })
    }

    set(resizeVectorAtom, "")
    set(isDraggingAtom, false)
    set(selectingAreaAtom, null)
    set(setHistoryAtom)

    const isNeedtoResetCreatinType = creationInitialElement.type_name === "pencil" || creationInitialElement.type_name === "grab"
    if (!isNeedtoResetCreatinType) {
      set(creationInitialElementAtom, (prev) => ({
        ...prev,
        type: "free",
        type_name: "free",
        id: "",
      }))
    }
  }
)

export const duplicateAtom = atom(
  null,
  (get, set) => {
    const selectedElement = get(selectedElementAtom)
    set(selectedElementAtom, [])
    selectedElement.forEach((el) => {
      const newTrianglePointsArr = getTrianglePointsArrFromString(el.points).map((point) =>
        [
          +point[0] + 50,
          +point[1] + 50
        ]
      )
      const newTrianglePoints = newTrianglePointsArr.map(points => points.join()).join(" ")
      const newPencilPointsArr = getPencilPointsArrFromString(el.d).map((point) =>
        [
          point[0] + 50,
          point[1] + 50
        ]
      )
      const newPathData = "M " + newPencilPointsArr.map(points => points.join(" ")).join(" L ")

      const duplicatedElemment = {
        ...el,
        id: crypto.randomUUID(),
        x: el.x + 50,
        y: el.y + 50,
        cx: el.cx + 50,
        cy: el.cy + 50,
        x1: el.x1 + 50,
        y1: el.y1 + 50,
        x2: el.x2 + 50,
        y2: el.y2 + 50,
        points: newTrianglePoints,
        d: newPathData,
      }

      set(elementsAtom, prev => [...prev, duplicatedElemment])
      set(selectedElementAtom, prev => [...prev, duplicatedElemment])
      set(setHistoryAtom)
    })
  }
)

export const setLayersAtom = atom(
  null,
  (get, set, direction: string) => {
    const selectedElement = get(selectedElementAtom)
    switch (direction) {
      case "back":
        set(elementsAtom, (prev) => {
          const filteredArray = prev.filter((el) => !selectedElement.find((selectedEl) => selectedEl.id === el.id))
          return [...selectedElement, ...filteredArray]
        })
        break;
      case "backward":
        // spaghetti code / crappy code
        set(elementsAtom, (prev) => {
          const resultArray: typeof prev = []
          const elementsToMove: typeof prev = []
          const indexes: number[] = []
          prev.forEach((el, i) => {
            // filtering and saving index & element to insert
            if (selectedElement.find((selectedEl) => selectedEl.id === el.id && i > 0)) {
              elementsToMove.push(el)
              indexes.push(i)
            } else {
              resultArray.push(el)
            }
          })
          elementsToMove.forEach((el, i) => resultArray.splice(indexes[i] - 1, 0, el))
          return resultArray
        })
        break;
      case "forward":
        // spaghetti code / crappy code
        set(elementsAtom, (prev) => {
          const resultArray: typeof prev = []
          const elementsToMove: typeof prev = []
          const indexes: number[] = []
          prev.forEach((el, i) => {
            if (selectedElement.find((selectedEl) => selectedEl.id === el.id)) {
              elementsToMove.push(el)
              indexes.push(i)
            } else {
              resultArray.push(el)
            }
          })
          elementsToMove.forEach((el, i) => resultArray.splice(indexes[i] + 1, 0, el))
          return resultArray
        })
        break;
      case "front":
        set(elementsAtom, (prev) => {
          const filteredArray = prev.filter((el) => !selectedElement.find((selectedEl) => selectedEl.id === el.id))
          return [...filteredArray, ...selectedElement]
        })
        break;

    }

  }
)

export const setHistoryAtom = atom(
  null,
  (get, set) => {
    set(historyAtom, (prev) => {
      // it's need to cut newest and continue build history chain from some previous snapshot if user was clicked undo btn
      const previousHistoryFromCurrentIndex = prev.slice(get(currentHistoryIndexAtom))
      if (get(elementsAtom) !== previousHistoryFromCurrentIndex[0] && !!get(elementsAtom).length) {
        return [get(elementsAtom), ...previousHistoryFromCurrentIndex]
      } else { return prev }
    })
    set(currentHistoryIndexAtom, 0)
  }
)

export const useHistoryAtom = atom(
  // this call of history (and current history index) is need to enable localStorage and use this history after refresh page when clicking hystory control btn
  (get) => { get(historyAtom), get(currentHistoryIndexAtom) },
  (get, set, direction: number) => {
    const history = get(historyAtom)
    const newIndex = get(currentHistoryIndexAtom) + direction
    const isEndOfHistory = history.length - 1 < newIndex || newIndex < 0
    if (!isEndOfHistory) {
      const snapshot = history[newIndex]
      set(elementsAtom, snapshot)
      set(currentHistoryIndexAtom, newIndex)
    }
  }
)
