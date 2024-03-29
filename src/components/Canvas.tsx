import { useRef } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import SingleElement from './SingleElement';
import {
  onMouseUpAtom,
  elementsAtom,
  onMouseDownAtom,
  onMouseMoveAtom,
} from '../store/store';
import { ElemenEvent } from '../types/Common';
import { transformCoordinates } from '../assets/utilities';

const Canvas = () => {
  const elements = useAtomValue(elementsAtom);
  const [, onMouseUp] = useAtom(onMouseUpAtom);
  const [, onMouseDown] = useAtom(onMouseDownAtom);
  const [, onMouseMove] = useAtom(onMouseMoveAtom);

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

  return (
    <svg
      ref={svgContainerRef}
      onMouseDown={(e) => handleMouseDown(e)}
      onMouseMove={(e) => handleMouseMove(e)}
      onMouseUp={onMouseUp}
      className="border-4 border-green-600"
      preserveAspectRatio="xMinYMin meet" //for the SVG container to be on the entire screen, while the elements inside kept the proportions and x=0, y=0 viewBox started from the upper left corner
      viewBox="0 0 1920 1080"
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      {elements.map((element) => (
        <SingleElement
          key={element.id}
          element={element}
          svgContainerRef={svgContainerRef.current}
        />
      ))}
    </svg>
  );
};

export default Canvas;
