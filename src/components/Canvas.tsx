import { useEffect, useRef, useState } from 'react';
import { Element } from '../types/Common';
import { transformCoordinates } from '../assets/utilities';

interface Props {
  elements: Element[];
  setElements: React.Dispatch<React.SetStateAction<Element[]>>;
}

const Canvas = ({ elements, setElements }: Props) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startPosition, setStartPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [selectedElement, setSelectedElement] = useState<Element | undefined>();
  const [x, setX] = useState<number | undefined>();
  const [y, setY] = useState<number | undefined>();

  const svgContainerRef = useRef<SVGSVGElement>(null);

  const handleMouseDown = (
    // maybe need complex type
    e:
      | React.MouseEvent<SVGRectElement, MouseEvent>
      | React.MouseEvent<SVGCircleElement, MouseEvent>
      | React.MouseEvent<SVGLineElement, MouseEvent>,
    id: string,
  ) => {
    setIsDragging(true);
    const selectedEl = elements.find((el) => el.id === id);
    setSelectedElement(selectedEl);
    setX(selectedEl?.x);
    setY(selectedEl?.y);

    if (svgContainerRef.current) {
      const { transX, transY } = transformCoordinates(
        svgContainerRef.current,
        e.clientX,
        e.clientY,
      );
      setStartPosition({ x: transX, y: transY });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (
      isDragging &&
      x !== undefined &&
      y !== undefined &&
      svgContainerRef.current
    ) {
      const { transX, transY } = transformCoordinates(
        svgContainerRef.current,
        e.clientX,
        e.clientY,
      );
      const newX = transX - startPosition.x + x;
      const newY = transY - startPosition.y + y;
      setElements((prev) =>
        prev.map((el) =>
          el.id === selectedElement?.id ? { ...el, x: newX, y: newY } : el,
        ),
      );
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add event listeners for mouse move and mouse up when dragging
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging]);

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
      {elements.map((block) => (
        <block.type //flexible&dynemic rendering svg-elements
          key={block.id}
          {...block}
          style={{ cursor: 'pointer' }}
          onMouseDown={(e) => handleMouseDown(e, block.id)}
        />
      ))}
    </svg>
  );
};

export default Canvas;
