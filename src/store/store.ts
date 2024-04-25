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
  stroke: 'black',
  strokeWidth: 8,
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
      if (get(isDraggingAtom) && selectedElement?.x && selectedElement.y) {
        const newX = selectedElement.x + (update.x - selectingArea.startX)
        const newY = selectedElement.y + (update.y - selectingArea.startY)
        set(updateElementsAtom, { ...selectedElement, x: newX, y: newY })
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
    // if (get(isDrawingAtom)) {
    //   const newEl = get(elementsAtom)[get(elementsAtom).length - 1]
    //   set(selectedElementAtom, newEl)
    // }
    set(creatingElementTypeAtom, "free")
    set(isDraggingAtom, false)
    set(selectingAreaAtom, null)
  }
)
