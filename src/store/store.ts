import { atom } from "jotai";
import { Area, Coordinates, Element } from "../types/Common";
import { atomWithStorage } from 'jotai/utils'

const initialElement: Element = {
  type: "rect",
  id: '',
  x: 0,
  y: 0,
  width: 1,
  height: 1,
  cx: 960,
  cy: 540,
  rx: 25,
  ry: 15,
  x1: 960,
  y1: 540,
  x2: 1060,
  y2: 540,
  stroke: 'black',
  strokeWidth: 4,
  fill: 'none',
}

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
    if (!get(isDraggingAtom)) {
      set(selectedElementAtom, null)
    }
    set(selectingAreaAtom, {
      startX: update.x,
      startY: update.y,
      endX: 0,
      endY: 0
    })
    if (get(isDrawingAtom)) {
      const creatingElementType = get(creatingElementTypeAtom)
      const newEl = { ...initialElement, type: creatingElementType, id: crypto.randomUUID(), x: update.x, y: update.y }
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
    if (selectingArea) {
      const selectedElement = get(selectedElementAtom)
      if (get(isDraggingAtom) && selectedElement) {
        const newX = ((selectedElement.x || 0) + (update.x - selectingArea.startX))
        const newY = ((selectedElement.y || 0) + (update.y - selectingArea.startY))
        const newCX = ((selectedElement.cx || 0) + (update.x - selectingArea.startX))
        const newCY = ((selectedElement.cy || 0) + (update.y - selectingArea.startY))
        const newX1 = ((selectedElement.x1 || 0) + (update.x - selectingArea.startX))
        const newY1 = ((selectedElement.y1 || 0) + (update.y - selectingArea.startY))
        const newX2 = ((selectedElement.x2 || 0) + (update.x - selectingArea.startX))
        const newY2 = ((selectedElement.y2 || 0) + (update.y - selectingArea.startY))
        set(updateElementsAtom, { ...selectedElement, x: newX, y: newY, cx: newCX, cy: newCY, y1: newY1, x1: newX1, y2: newY2, x2: newX2 })
      }
      if (get(isDrawingAtom) && selectedElement?.x && selectedElement.y) {
        let newX = selectedElement.x
        let newWidth = update.x - selectedElement.x
        if (newWidth < 0) {
          newX = selectedElement.x + newWidth
          newWidth = Math.abs(newWidth)
        }

        let newHeight = update.y - selectedElement.y
        let newY = selectedElement.y
        if (newHeight < 0) {
          newY = selectedElement.y + newHeight
          newHeight = Math.abs(newHeight)
        }
        set(updateElementsAtom, { ...selectedElement, x: newX, y: newY, width: newWidth, height: newHeight })
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
  }
)
