import { atom } from "jotai";
import { Area, Coordinates, Element } from "../types/Common";
import { atomWithStorage } from 'jotai/utils'

const initialElement: Element = {
  type: "rect",
  id: '',
  x: 960,
  y: 540,
  cx: 960,
  cy: 540,
  rx: 25,
  ry: 15,
  width: 240,
  height: 300,
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
        set(updateElementsAtom, { ...selectedElement, x: newX, y: newY, cx: newCX, cy: newCY })
      }
      set(selectingAreaAtom, { ...selectingArea, endX: update.x, endY: update.y })
    }
  }
)

export const onMouseUpAtom = atom(
  null,
  (get, set) => {
    console.log("onMouseUpAtom")
    if (get(isDrawingAtom)) {
      const creatingElementType = get(creatingElementTypeAtom)
      const newEl = { ...initialElement, type: creatingElementType, id: crypto.randomUUID() }
      set(elementsAtom, (prev) => [...prev, newEl])
      set(selectedElementAtom, newEl)
      set(creatingElementTypeAtom, "free")
    }
    set(isDraggingAtom, false)
    set(selectingAreaAtom, null)
  }
)
