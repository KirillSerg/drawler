import { atom } from "jotai";
import { Area, Coordinates, Element } from "../types/Common";
import { atomWithImmer } from "jotai-immer";

const initialElement: Element = {
  type: "rect",
  id: '',
  x: 960,
  y: 540,
  width: 240,
  height: 300,
  stroke: 'black',
  strokeWidth: 8,
  fill: 'none',
}

export const activeElementTypeAtom = atom<Element["type"]>("free")

export const elementsAtom = atomWithImmer<Element[]>([])

export const selectedElementAtom = atom<Element | null>(null)

export const selectingAreaAtom = atom<Area | null>(null)

export const isDrawingAtom = atom(
  (get) => get(activeElementTypeAtom) === "free" ? false : true
)

export const updateElementsAtom = atom(
  null,
  (_get, set, updatedElement: Element) => {
    set(elementsAtom, (prev) => prev.map((el) =>
      el.id === updatedElement.id ? updatedElement : el,
    ))
  }
)

export const isDraggingAtom = atom(false)

export const onMouseDownAtom = atom(
  null,
  (get, set, update: Coordinates) => {
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
  (_get, set, update: { element: Element, position: Coordinates }) => {
    set(selectedElementAtom, update.element)
    set(isDraggingAtom, true)
    set(selectingAreaAtom, {
      startX: update.position.x,
      startY: update.position.y,
      endX: 0,
      endY: 0
    })
  }
)

export const onMouseMoveAtom = atom(
  null,
  (get, set, update: Coordinates) => {
    const selectingArea = get(selectingAreaAtom)
    if (selectingArea) {
      const selectedElement = get(selectedElementAtom)
      if (get(isDraggingAtom) && selectingArea && selectedElement?.x && selectedElement.y) {
        const newX = update.x - selectingArea.startX + selectedElement.x
        const newY = update.y - selectingArea.startY + selectedElement.y
        set(updateElementsAtom, { ...selectedElement, x: newX, y: newY })
      }
      set(selectingAreaAtom, { ...selectingArea, endX: update.x, endY: update.y })
    }
  }
)

export const onMouseUpAtom = atom(
  null,
  (get, set) => {
    if (get(isDrawingAtom)) {
      const activeElementType = get(activeElementTypeAtom)
      const newEl = { ...initialElement, type: activeElementType, id: crypto.randomUUID() }
      set(elementsAtom, (prev) => [...prev, newEl])
      set(selectedElementAtom, newEl)
    }
    set(activeElementTypeAtom, "free")
    set(isDraggingAtom, false)
    set(selectingAreaAtom, null)
  }
)
