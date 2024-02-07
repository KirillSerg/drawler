import { useEffect, useState } from 'react';
import { Element } from '../types/Common';
import { transformCoordinates } from '../assets/utilities';

interface Props {
  element: Element;
  setElements: React.Dispatch<React.SetStateAction<Element[]>>;
  svgContainerRef: SVGSVGElement | null;
}

const SingleElement = ({ element, setElements, svgContainerRef }: Props) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startMovePosition, setStartMovePosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  const handleMouseDown = (
    // maybe need complex type
    e:
      | React.MouseEvent<SVGRectElement, MouseEvent>
      | React.MouseEvent<SVGCircleElement, MouseEvent>
      | React.MouseEvent<SVGLineElement, MouseEvent>,
  ) => {
    const { transX, transY } = transformCoordinates(
      svgContainerRef,
      e.clientX,
      e.clientY,
    );
    setStartMovePosition({ x: transX, y: transY });
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add event listeners for mouse move and mouse up when dragging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && element.x !== undefined && element.y !== undefined) {
        const { transX, transY } = transformCoordinates(
          svgContainerRef,
          e.clientX,
          e.clientY,
        );
        const newX = transX - startMovePosition.x + element.x;
        const newY = transY - startMovePosition.y + element.y;
        setStartMovePosition({ x: transX, y: transY });
        setElements((prev) =>
          prev.map((el) =>
            el.id === element.id ? { ...el, x: newX, y: newY } : el,
          ),
        );
      }
    };
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, element, setElements, startMovePosition, svgContainerRef]);

  return (
    <element.type //flexible&dynemic rendering svg-elements
      {...element}
      style={{ cursor: 'pointer' }}
      onMouseDown={(e) => handleMouseDown(e)}
    />
  );
};

export default SingleElement;
