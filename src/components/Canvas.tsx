import { useRef } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import SingleElement from './SingleElement';
import SelectingArea from './SelectingArea';
import {
  onMouseUpAtom,
  elementsAtom,
  onMouseDownAtom,
  onMouseMoveAtom,
  deleteElementsAtom,
  isDraggingAtom,
  isDrawingAtom,
} from '../store/store';
import { ElemenEvent } from '../types/CommonTypes';
import { transformCoordinates } from '../assets/utilities';

const Canvas = () => {
  const elements = useAtomValue(elementsAtom);
  const isDragging = useAtomValue(isDraggingAtom);
  const isDrawing = useAtomValue(isDrawingAtom);
  const [, onMouseUp] = useAtom(onMouseUpAtom);
  const [, onMouseDown] = useAtom(onMouseDownAtom);
  const [, onMouseMove] = useAtom(onMouseMoveAtom);
  const [, deleteElements] = useAtom(deleteElementsAtom);

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

  const handleKeyPress = (key: string) => {
    if (key === 'Delete') deleteElements();
  };

  return (
    <svg
      id="canvas"
      ref={svgContainerRef}
      onMouseDown={(e) => handleMouseDown(e)}
      onMouseMove={(e) => handleMouseMove(e)}
      onMouseUp={onMouseUp}
      onKeyDown={(e) => handleKeyPress(e.key)}
      preserveAspectRatio="xMinYMin meet" //for the SVG container to be on the entire screen, while the elements inside kept the proportions and x=0, y=0 viewBox started from the upper left corner
      viewBox="0 0 1920 1080"
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
        <SingleElement
          key={element.id}
          element={element}
          svgContainerRef={svgContainerRef.current}
        />
      ))}

      {!isDragging && !isDrawing && <SelectingArea />}
    </svg>
  );
};

export default Canvas;
