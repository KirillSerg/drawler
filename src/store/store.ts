import { atom } from "jotai";
import { Area, CanvasViewBox, Coordinates, Element, ZoomCanvasFn } from "../types/CommonTypes";
import { atomWithStorage } from 'jotai/utils'
import {
  getPencilPointsArrFromString,
  useResizedCoordinates,
  getTrianglePointsArrFromString,
  useUpdateXYAndDistance,
  getPencilSize,
  getBorderRadius
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
  strokeLinecap: "",
  fill: 'none',
  fontSize: "28px",
  opacity: "1",
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
    const selectingArea = get(selectingAreaAtom)

    // update selected el from original element
    if (selectedElement.length > 0) {
      const newSelectedEl = selectedElement.map((selectedElel) =>
        get(elementsAtom).find(el => el.id === selectedElel.id) || selectedElel)
      set(selectedElementAtom, newSelectedEl)
    }

    // multy select by selectingArea
    if (!get(isDraggingAtom) && !get(isDrawingAtom)) {
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
          }
        })
      }
    }

    set(resizeVectorAtom, "")
    set(isDraggingAtom, false)
    set(selectingAreaAtom, null)

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
    })
  }
)