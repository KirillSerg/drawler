import Textarea from './Textarea';
import { useAtom, useAtomValue } from 'jotai';
import {
  isDrawingAtom,
  onDragStartAtom,
  onMouseUpAtom,
  selectedElementAtom,
} from '../../store/store';
import { Element } from '../../types/CommonTypes';
import SelectingFrame from './SelectingFrame';

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
            {element.type_name === 'text' && <Textarea element={element} />}
          </element.type>

          {isSelected && !isDrawing && <SelectingFrame element={element} />}
        </>
      )}
    </>
  );
};

export default SingleElement;
