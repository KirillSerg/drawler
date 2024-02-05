import { useRef } from 'react';
import { Element } from '../types/Common';
import SingleElement from './SingleElement';

interface Props {
  elements: Element[];
  setElements: React.Dispatch<React.SetStateAction<Element[]>>;
}

const Canvas = ({ elements, setElements }: Props) => {
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
          setElements={setElements}
          svgContainerRef={svgContainerRef.current}
        />
      ))}
    </svg>
  );
};

export default Canvas;
