import Textarea from './Textarea';
import { useAtom, useAtomValue } from 'jotai';
import {
  isDrawingAtom,
  onDragStartAtom,
  onMouseUpAtom,
  selectedElementAtom,
} from '../store/store';
import { Element } from '../types/CommonTypes';

interface Props {
  element: Element;
}

const SingleElement = ({ element }: Props) => {
  const [, onDragStart] = useAtom(onDragStartAtom);
  const [, onMouseUp] = useAtom(onMouseUpAtom);
  const selectedElement = useAtomValue(selectedElementAtom);
  const isDrawing = useAtomValue(isDrawingAtom);

  const isSelected = !!selectedElement.find((el) => el.id === element.id);

  return (
    <>
      {element.type !== 'free' && element.type !== 'grab' && (
        <>
          <element.type //flexible&dynemic rendering svg-elements
            {...element}
            className={`${isDrawing ? 'hover:cursor-crosshair' : 'hover:cursor-move'}`}
            // in order for the image to be stored and displayed between renderers, its type is an arrayBuffer, but the type of href of image element of svg is a string. That is why this transformation is necessary
            href={element.type === 'image' ? element.href?.toString() : ''}
            onMouseDown={() => onDragStart(element)}
            onMouseUp={onMouseUp}
          >
            {element.type === 'foreignObject' && <Textarea element={element} />}
          </element.type>
          {isSelected && !isDrawing && (
            <rect
              className="hover:cursor-move"
              onMouseDown={() => onDragStart(element)}
              x={element.x - element.strokeWidth / 2 - 2}
              y={element.y - element.strokeWidth / 2 - 2}
              width={element.width + element.strokeWidth + 4}
              height={element.height + element.strokeWidth + 4}
              stroke="blue"
              strokeWidth={2}
              fill="none"
            ></rect>
          )}
        </>
      )}
    </>
  );
};

export default SingleElement;
