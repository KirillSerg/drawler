import { useEffect, useState } from 'react';
import { Element } from '../types/Common';

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

  const screenWidthToViewbox = 1920 / window.innerWidth;
  const screenHeightToViewbox = 1080 / window.outerHeight;

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
    setStartPosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && x !== undefined && y !== undefined) {
      console.log(e.clientX);
      console.log(startPosition?.x);
      console.log(x);
      const newX = screenWidthToViewbox * (e.clientX - startPosition.x) + x;
      const newY = screenHeightToViewbox * (e.clientY - startPosition.y) + y;
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
      className="border-4 border-green-600"
      // preserveAspectRatio="xMinYMin meet" //for the SVG container to be on the entire screen, while the elements inside kept the proportions and x=0, y=0 viewBox started from the upper left corner
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
