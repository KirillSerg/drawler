import { useRef } from 'react';
import SingleElement from './SingleElement';
import { useAtomValue } from 'jotai';
import { elementsAtom } from '../store/store';

const Canvas = () => {
  const elements = useAtomValue(elementsAtom);

  const svgContainerRef = useRef<SVGSVGElement>(null);

  return (
    <svg
      ref={svgContainerRef}
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
