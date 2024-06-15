import Textarea from './Textarea';
import { useAtom, useAtomValue } from 'jotai';
import {
  isDrawingAtom,
  onDragStartAtom,
  onMouseUpAtom,
  selectedElementAtom,
} from '../store/store';
import { ElemenEvent, Element } from '../types/CommonTypes';
import { transformCoordinates } from '../assets/utilities';

interface Props {
  element: Element;
  svgContainerRef: SVGSVGElement | null;
}

const SingleElement = ({ element, svgContainerRef }: Props) => {
  const [, onDragStart] = useAtom(onDragStartAtom);
  const [, onMouseUp] = useAtom(onMouseUpAtom);
  const selectedElement = useAtomValue(selectedElementAtom);
  const isDrawing = useAtomValue(isDrawingAtom);

  const isSelected = !!selectedElement.find((el) => el.id === element.id);

  const handleMouseDown = (e: ElemenEvent) => {
    const { transX, transY } = transformCoordinates(
      svgContainerRef,
      e.clientX,
      e.clientY,
    );
    onDragStart({
      element,
      position: {
        x: transX,
        y: transY,
      },
    });
  };

  return (
    <>
      {element.type !== 'free' && element.type !== 'grab' && (
        <>
          <element.type //flexible&dynemic rendering svg-elements
            {...element}
            // in order for the image to be stored and displayed between renderers, its type is an arrayBuffer, but the type of href of image element of svg is a string. That is why this transformation is necessary
            href={element.type === 'image' ? element.href?.toString() : ''}
            style={{ cursor: 'pointer' }}
            onMouseDown={(e) => handleMouseDown(e)}
            onMouseUp={onMouseUp}
          >
            {element.type === 'foreignObject' && <Textarea element={element} />}
          </element.type>
          {isSelected && !isDrawing && (
            <rect
              x={element.x - 5}
              y={element.y - 5}
              width={element.width + 10}
              height={element.height + 10}
              stroke="blue"
              strokeWidth={2}
              strokeDasharray={10}
              fill="none"
            ></rect>
          )}
        </>
      )}
    </>
  );
};

export default SingleElement;
