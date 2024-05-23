import { atom } from "jotai";
import { Area, Coordinates, Element } from "../types/CommonTypes";
import { atomWithStorage } from 'jotai/utils'
import { getPointsArrFromString, useUpdateXYAndDistance } from "../assets/utilities";

const initialElement: Element = {
  type: "rect",
  id: "",
  x: 0,
  y: 0,
  width: 100,
  height: 50,
  cx: 0,
  cy: 0,
  rx: 0.5,
  ry: 0.5,
  x1: 0,
  y1: 0,
  x2: 0,
  y2: 0,
  points: "",
  textvalue: "",
  markerEnd: "",
  stroke: 'black',
  strokeWidth: 4,
  fill: 'transparent',
  fontSize: "28px",
}

export const initialElementAtom = atom<Element>(initialElement)
export const creatingElementTypeAtom = atom<Element["type"]>("free")
export const elementsAtom = atomWithStorage<Element[]>("elements", [])
export const selectedElementAtom = atom<Element | null>(null)
export const selectingAreaAtom = atom<Area | null>(null)
export const isDraggingAtom = atom(false)
export const isDrawingAtom = atom(
  (get) => get(creatingElementTypeAtom) === "free" ? false : true
)

export const updateElementsAtom = atom(
  null,
  (_get, set, updatedElement: Element) => {
    // console.log("updateElementsAtom")
    set(elementsAtom, (prev) => prev.map((el) =>
      el.id === updatedElement.id ? updatedElement : el,
    ))
  }
)

export const deleteElementsAtom = atom(
  null,
  (get, set) => {
    const selectedElement = get(selectedElementAtom)
    set(elementsAtom, (prev) => prev.filter((el) => el.id !== selectedElement?.id))
    set(selectedElementAtom, null)
  }
)

export const onMouseDownAtom = atom(
  null,
  (get, set, update: Coordinates) => {
    console.log("onMouseDownAtom")
    if (!get(isDraggingAtom) && !get(isDrawingAtom)) {
      set(selectedElementAtom, null)
    }
    set(selectingAreaAtom, {
      startX: update.x,
      startY: update.y,
      endX: update.x,
      endY: update.y
    })
    if (get(isDrawingAtom)) {
      const creatingElementType = get(creatingElementTypeAtom)
      const newEl = {
        ...get(initialElementAtom),
        type: creatingElementType,
        id: crypto.randomUUID(),
        x: update.x,
        y: update.y,
        cx: update.x,
        cy: update.y,
        x1: update.x,
        y1: update.y,
        x2: update.x,
        y2: update.y,
        // points: `${}`,
        // fontSize: ,
      }
      set(elementsAtom, (prev) => [...prev, newEl])
      set(selectedElementAtom, newEl)
    }
  }
)

export const onDragStartAtom = atom(
  null,
  (get, set, update: { element: Element, position: Coordinates }) => {
    console.log("onDragStartAtom")
    if (!get(isDrawingAtom)) {
      set(selectedElementAtom, update.element)
      set(isDraggingAtom, true)
    }
  }
)

export const onMouseMoveAtom = atom(
  null,
  (get, set, update: Coordinates) => {
    console.log("onMouseMoveAtom")
    const selectingArea = get(selectingAreaAtom)
    const selectedElement = get(selectedElementAtom)
    if (selectingArea) {
      // if Drag&drop
      if (get(isDraggingAtom) && selectedElement) {
        // rect
        const newX = selectedElement.x + (update.x - selectingArea.startX)
        const newY = selectedElement.y + (update.y - selectingArea.startY)
        // ellipse
        const newCX = selectedElement.cx + (update.x - selectingArea.startX)
        const newCY = selectedElement.cy + (update.y - selectingArea.startY)
        // line
        const newX1 = selectedElement.x1 + (update.x - selectingArea.startX)
        const newY1 = selectedElement.y1 + (update.y - selectingArea.startY)
        const newX2 = selectedElement.x2 + (update.x - selectingArea.startX)
        const newY2 = selectedElement.y2 + (update.y - selectingArea.startY)
        // triangle(polygon)
        const newPointsArr = getPointsArrFromString(selectedElement.points).map((point) =>
          [
            +point[0] + (update.x - selectingArea.startX),
            +point[1] + (update.y - selectingArea.startY)
          ]
        )
        const newPoints = newPointsArr.map(points => points.join()).join(" ")

        set(updateElementsAtom, {
          ...selectedElement,
          x: newX,
          y: newY,
          cx: newCX,
          cy: newCY,
          y1: newY1,
          x1: newX1,
          y2: newY2,
          x2: newX2,
          points: newPoints,
        })
      }

      // if drawwing
      if (get(isDrawingAtom) && selectedElement) {
        const { newX, newY, newWidth, newHeight, newRX, newRY } = useUpdateXYAndDistance(
          selectedElement.x,
          selectedElement.y,
          update.x,
          update.y
        )
        set(updateElementsAtom, {
          ...selectedElement,
          x: newX,
          y: newY,
          width: newWidth,
          height: newHeight,
          cx: selectedElement.cx + (update.x - selectedElement.x) / 2,
          cy: selectedElement.cy + (update.y - selectedElement.y) / 2,
          rx: selectedElement.type === "ellipse" ? newRX : selectedElement.rx,
          ry: selectedElement.type === "ellipse" ? newRY : selectedElement.ry,
          x2: update.x,
          y2: update.y,
          // left-bottom, top, right-bottom
          points: `${selectedElement.x},${update.y} ${selectedElement.x + ((update.x - selectedElement.x) / 2)},${selectedElement.y} ${update.x},${update.y}`,
          fontSize: (newHeight / 1.5).toString(), // i don't know why but 1.5 is working good
        })
      }
      set(selectingAreaAtom, { ...selectingArea, endX: update.x, endY: update.y })
    }
  }
)

export const onMouseUpAtom = atom(
  null,
  (_get, set) => {
    console.log("onMouseUpAtom")
    set(creatingElementTypeAtom, "free")
    set(isDraggingAtom, false)
    set(selectingAreaAtom, null)
    set(initialElementAtom, initialElement)
  }
)
