import { atom } from "jotai";
import { Area, CanvasViewBox, Coordinates, Element, ZoomCanvasFn } from "../types/CommonTypes";
import { atomWithStorage } from 'jotai/utils'
import { getPencilPointsArrFromString, getTrianglePointsArrFromString, useUpdateXYAndDistance } from "../assets/utilities";

const initialElement: Element = {
  type: "free",
  type_name: "free",
  id: "",
  x: 0,
  y: 0,
  width: 150,
  height: 150,
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
  d: "",
  href: null,
  markerEnd: "",
  stroke: 'black',
  strokeWidth: 4,
  fill: 'none',
  fontSize: "28px",
}
const initialCanvasViewBox = {
  x: 0,
  y: 0,
  percentage: 100,
  width: 1920,
  height: 1080,
}

export const creationInitialElementAtom = atom<Element>(initialElement)

export const elementsAtom = atomWithStorage<Element[]>("elements", [])

export const selectedElementAtom = atom<Element[] | []>([])

export const selectingAreaAtom = atom<Area | null>(null)

export const isDraggingAtom = atom(false)

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
        set(creationInitialElementAtom, initialElement)
        break;
      case (key.key === "+" && key.ctrlKey):
        set(zoomCanvasAtom, ZoomCanvasFn.ZOOMUP)
        break;
      case (key.key === "-" && key.ctrlKey):
        set(zoomCanvasAtom, ZoomCanvasFn.ZOOMDOWN)
        break;
      case (!key.ctrlKey && creationInitialElement.type_name === "grab"):
        set(creationInitialElementAtom, initialElement)
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
    ) set(selectedElementAtom, (prev) => {
      return prev?.map(el => el.id === updatedElement.id ? updatedElement : el) || null
    })
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
  }
)

export const onMouseDownAtom = atom(
  null,
  (get, set, update: Coordinates) => {
    // console.log("onMouseDownAtom")
    if (!get(isDraggingAtom) && !get(isDrawingAtom) && !get(keyPressedAtom).ctrlKey) {
      set(selectedElementAtom, [])
    }
    set(selectingAreaAtom, {
      startX: update.x,
      startY: update.y,
      endX: update.x,
      endY: update.y
    })
    if (get(isDrawingAtom)) {
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
      set(selectedElementAtom, (prev) => [...prev, newEl])
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
  (get, set, update: { element: Element, position: Coordinates }) => {
    // console.log("onDragStartAtom")
    if (!get(isDrawingAtom)) {
      if (get(keyPressedAtom).ctrlKey) {
        set(selectedElementAtom, (prev) => [...prev, update.element])
      } else {
        set(selectedElementAtom, [update.element])
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
          const newPoints = newTrianglePointsArr.map(points => points.join()).join(" ")
          // pencil
          const newPencilPointsArr = getPencilPointsArrFromString(selectedEl.d).map((point) =>
            [
              +point[0] + (update.x - selectingArea.startX),
              +point[1] + (update.y - selectingArea.startY)
            ]
          )
          const newPathData = "M " + newPencilPointsArr.map(points => points.join(" ")).join(" L ")

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
            points: newPoints,
            d: newPathData,
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
            width: newWidth,
            height: newHeight,
            cx: selectedEl.cx + (update.x - selectedEl.x) / 2,
            cy: selectedEl.cy + (update.y - selectedEl.y) / 2,
            rx: selectedEl.type === "ellipse" ? newRX : selectedEl.rx,
            ry: selectedEl.type === "ellipse" ? newRY : selectedEl.ry,
            x2: update.x,
            y2: update.y,
            // left-bottom, top, right-bottom
            points: `${selectedEl.x},${update.y} ${selectedEl.x + ((update.x - selectedEl.x) / 2)},${selectedEl.y} ${update.x},${update.y}`,
            fontSize: (newHeight / 1.5).toString(), // i don't know why but 1.5 is working good
            d: selectedEl.d + ` L ${update.x} ${update.y}`
          })
        }
      })

      // on move entire canvas
      if (get(creationInitialElementAtom).type_name === "grab") {
        set(grabCanvasAtom, { x: update.x - selectingArea.startX, y: update.y - selectingArea.startY })
      }

      set(selectingAreaAtom, { ...selectingArea, endX: update.x, endY: update.y })
    }

    // this is necessary to display the selected image and to move this image following the cursor
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
    if (selectedElement.length > 0) {
      const newSelectedEl = selectedElement.map((selectedElel) =>
        get(elementsAtom).find(el => el.id === selectedElel.id) || selectedElel)
      set(selectedElementAtom, newSelectedEl)
    }
    set(isDraggingAtom, false)
    set(selectingAreaAtom, null)

    const isNeedtoResetCreatinType = creationInitialElement.type_name === "pencil" || creationInitialElement.type_name === "grab"
    if (!isNeedtoResetCreatinType) {
      set(creationInitialElementAtom, initialElement)
    }
  }
)

