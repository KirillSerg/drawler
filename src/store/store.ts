import { atom } from "jotai";
import { Area, Coordinates, Element } from "../types/CommonTypes";
import { atomWithStorage } from 'jotai/utils'

const initialElement: Element = {
  type: "rect",
  id: '',
  x: 0,
  y: 0,
  width: 1,
  height: 1,
  cx: 0,
  cy: 0,
  rx: 0.5,
  ry: 0.5,
  x1: 0,
  y1: 0,
  x2: 0,
  y2: 0,
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
      const newEl = {
        ...initialElement,
        type: creatingElementType,
        id: crypto.randomUUID(),
        x: update.x,
        y: update.y,
        cx: update.x,
        cy: update.y,
        x1: update.x,
        y1: update.y,
        x2: update.x,
        y2: update.y
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
    if (selectingArea) {
      const selectedElement = get(selectedElementAtom)
      if (get(isDraggingAtom) && selectedElement) {
        const newX = selectedElement.x + (update.x - selectingArea.startX)
        const newY = selectedElement.y + (update.y - selectingArea.startY)
        const newCX = selectedElement.cx + (update.x - selectingArea.startX)
        const newCY = selectedElement.cy + (update.y - selectingArea.startY)
        const newX1 = selectedElement.x1 + (update.x - selectingArea.startX)
        const newY1 = selectedElement.y1 + (update.y - selectingArea.startY)
        const newX2 = selectedElement.x2 + (update.x - selectingArea.startX)
        const newY2 = selectedElement.y2 + (update.y - selectingArea.startY)
        set(updateElementsAtom, { ...selectedElement, x: newX, y: newY, cx: newCX, cy: newCY, y1: newY1, x1: newX1, y2: newY2, x2: newX2 })
      }
      if (get(isDrawingAtom) && selectedElement) {
        let newX = selectedElement.x
        let newWidth = update.x - selectedElement.x
        let newRX = (update.x - selectedElement.x) / 2
        if (newWidth < 0) {
          newX = selectedElement.x + newWidth
          newWidth = Math.abs(newWidth)
          newRX = Math.abs(newRX)
        }
        let newHeight = update.y - selectedElement.y
        let newY = selectedElement.y
        let newRY = (update.y - selectedElement.y) / 2
        if (newHeight < 0) {
          newY = selectedElement.y + newHeight
          newHeight = Math.abs(newHeight)
          newRY = Math.abs(newRY)
        }

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
          y2: update.y
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
  }
)
