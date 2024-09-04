import { useEffect, useRef } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import SingleElement from '../singleElement/SingleElement';
import SelectingArea from './canvasElements/SelectingArea';
import {
  onMouseUpAtom,
  elementsAtom,
  onMouseDownAtom,
  onMouseMoveAtom,
  isDraggingAtom,
  isDrawingAtom,
  keyPressedAtom,
  canvasViewBoxAtom,
  zoomCanvasAtom,
  creationInitialElementAtom,
  selectingAreaAtom,
  grabCanvasAtom,
  resizeVectorAtom,
} from '../../store/store';
import { ElemenEvent, ZoomCanvasFn } from '../../types/CommonTypes';
import { transformCoordinates } from '../../assets/utilities';

const Canvas = () => {
  const elements = useAtomValue(elementsAtom);
  const isDragging = useAtomValue(isDraggingAtom);
  const isDrawing = useAtomValue(isDrawingAtom);
  const resizeVector = useAtomValue(resizeVectorAtom);
  const [, onMouseUp] = useAtom(onMouseUpAtom);
  const [, onMouseDown] = useAtom(onMouseDownAtom);
  const [, onMouseMove] = useAtom(onMouseMoveAtom);
  const keyPressed = useAtomValue(keyPressedAtom);
  const canvasViewBox = useAtomValue(canvasViewBoxAtom);
  const [, zoomCanvas] = useAtom(zoomCanvasAtom);
  const [, grabCanvas] = useAtom(grabCanvasAtom);
  const creationInitialElement = useAtomValue(creationInitialElementAtom);
  const selectingArea = useAtomValue(selectingAreaAtom);

  const svgContainerRef = useRef<SVGSVGElement>(null);

  const handleMouseDown = (e: ElemenEvent) => {
    const { transX, transY } = transformCoordinates(
      svgContainerRef.current,
      e.clientX,
      e.clientY,
    );
    onMouseDown({
      x: transX,
      y: transY,
    });
  };

  const handleMouseMove = (e: ElemenEvent) => {
    const { transX, transY } = transformCoordinates(
      svgContainerRef.current,
      e.clientX,
      e.clientY,
    );
    onMouseMove({
      x: transX,
      y: transY,
    });
  };

  // for prevent default browser zoom
  useEffect(() => {
    const handleOnWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (keyPressed.ctrlKey && e.deltaY < 0) {
        zoomCanvas(ZoomCanvasFn.ZOOMUP);
      }
      if (keyPressed.ctrlKey && e.deltaY > 0) {
        zoomCanvas(ZoomCanvasFn.ZOOMDOWN);
      }
      if (!keyPressed.ctrlKey) {
        grabCanvas({ x: 0, y: -e.deltaY });
      }
    };

    const containerElement = svgContainerRef.current;

    if (containerElement) {
      containerElement.addEventListener('wheel', handleOnWheel, {
        passive: false,
      });

      return () => {
        containerElement.removeEventListener('wheel', handleOnWheel);
      };
    }
  }, [keyPressed.ctrlKey, zoomCanvas, grabCanvas]);

  return (
    <svg
      className={`h-screen focus:outline-none ${selectingArea && creationInitialElement.type_name === 'grab' ? 'cursor-grabbing' : creationInitialElement.type_name === 'grab' ? 'cursor-grab' : ''}`}
      id="canvas"
      ref={svgContainerRef}
      onMouseDown={(e) => handleMouseDown(e)}
      onMouseMove={(e) => handleMouseMove(e)}
      onMouseUp={onMouseUp}
      preserveAspectRatio="xMinYMin meet" //for the SVG container to be on the entire screen, while the elements inside kept the proportions and x=0, y=0 viewBox started from the upper left corner
      viewBox={`${canvasViewBox.x} ${canvasViewBox.y} ${canvasViewBox.width} ${canvasViewBox.height}`}
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      tabIndex={0}
    >
      <defs>
        <marker
          id="arrow"
          markerWidth="5"
          markerHeight="5"
          refX="5"
          refY="2.5"
          orient="auto"
        >
          <path d="M 0 0 L 5 2.5 L 0 5" fill="none" stroke="black" />
        </marker>
      </defs>

      {elements.map((element) => (
        <SingleElement key={element.id} element={element} />
      ))}

      {!isDragging &&
        !isDrawing &&
        !resizeVector &&
        creationInitialElement.type_name !== 'grab' && <SelectingArea />}

      {creationInitialElement.type_name === 'image' && (
        <SingleElement
          key={creationInitialElement.id}
          element={creationInitialElement}
        />
      )}
    </svg>
  );
};

export default Canvas;
