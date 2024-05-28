import { useMemo } from 'react';
import { useAtom } from 'jotai';
import deleteIcon from '../assets/icons/trash.svg';
import {
  deleteElementsAtom,
  initialElementAtom,
  selectedElementAtom,
  updateElementsAtom,
} from '../store/store';
import LineIconBtn from './LineIconBtn';
import LineArrowIconBtn from './LineArrowIconBtn';
import {
  ELEMENT_TYPE_VARIANTS,
  Element,
  ElementsTypeName,
} from '../types/CommonTypes';

const Inspector = () => {
  const [, deleteElements] = useAtom(deleteElementsAtom);
  const [, updateElements] = useAtom(updateElementsAtom);
  const [selectedElement] = useAtom(selectedElementAtom);
  const [initialElement, setInitialElement] = useAtom(initialElementAtom);

  const element = useMemo(() => {
    if (selectedElement !== null) {
      return selectedElement;
    }
    return initialElement;
  }, [selectedElement, initialElement]);

  const handlerSelectProperty = (typeName: ElementsTypeName) => {
    if (selectedElement !== null) {
      updateElements({
        ...selectedElement,
        type: ELEMENT_TYPE_VARIANTS[typeName] as Element['type'],
        type_name: typeName,
        markerEnd: typeName === 'arrow_line' ? 'url(#arrow)' : '',
      });
    } else {
      setInitialElement((prev) => {
        return {
          ...prev,
          type: ELEMENT_TYPE_VARIANTS[typeName] as Element['type'],
          type_name: typeName,
          markerEnd: typeName === 'arrow_line' ? 'url(#arrow)' : '',
        };
      });
    }
  };

  return (
    <aside className="fixed min-w-[10%] max-w-[25%] max-h-[80%] overflow-auto px-3 py-5  top-[10%] right-5 border border-black">
      Inspector
      {element.id && (
        <img
          onClick={deleteElements}
          src={deleteIcon}
          alt="delete"
          width={25}
          height={25}
        />
      )}
      {element.type === 'line' ? (
        <>
          <LineIconBtn
            className={`${
              element.type_name === 'line' ? 'bg-orange-500' : 'bg-inherit'
            } h-8 w-8 p-[6px]`}
            handlerClick={handlerSelectProperty}
          />
          <LineArrowIconBtn
            className={`${
              element.type_name === 'arrow_line'
                ? 'bg-orange-500'
                : 'bg-inherit'
            } h-8 w-8 p-[6px]`}
            handlerClick={handlerSelectProperty}
          />
        </>
      ) : (
        ''
      )}
    </aside>
  );
};

export default Inspector;
