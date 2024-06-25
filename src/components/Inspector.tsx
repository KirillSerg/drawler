import { useMemo } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import deleteIcon from '../assets/icons/trash.svg';
import {
  deleteElementsAtom,
  creationInitialElementAtom,
  selectedElementAtom,
  updateElementsAtom,
} from '../store/store';
import LineIconBtn from './LineIconBtn';
import LineArrowIconBtn from './LineArrowIconBtn';
import {
  ELEMENT_TYPE_VARIANTS,
  Element,
  ElementProps,
} from '../types/CommonTypes';

const Inspector = () => {
  const [, deleteElements] = useAtom(deleteElementsAtom);
  const [, updateElements] = useAtom(updateElementsAtom);
  const selectedElement = useAtomValue(selectedElementAtom);
  const [creationInitialElement, setCreationInitialElement] = useAtom(
    creationInitialElementAtom,
  );

  const elements = useMemo(() => {
    if (selectedElement.length > 0) {
      return selectedElement;
    }
    return [creationInitialElement];
  }, [selectedElement, creationInitialElement]);

  const handlerSelectProperty = (props: ElementProps) => {
    if (selectedElement.length > 0) {
      selectedElement.forEach((el) =>
        updateElements({
          ...el,
          ...props,
          type:
            (props.type_name &&
              (ELEMENT_TYPE_VARIANTS[props.type_name] as Element['type'])) ||
            el.type,
        }),
      );
    } else {
      setCreationInitialElement((prev) => {
        return {
          ...prev,
          ...props,
          type:
            (props.type_name &&
              (ELEMENT_TYPE_VARIANTS[props.type_name] as Element['type'])) ||
            prev.type,
        };
      });
    }
  };

  return (
    <aside className="fixed min-w-[10%] max-w-[25%] max-h-[80%] overflow-auto px-3 py-5  top-[10%] right-5 border border-black">
      Inspector
      {elements[0].id && (
        <img
          onClick={deleteElements}
          src={deleteIcon}
          alt="delete"
          width={25}
          height={25}
        />
      )}
      {elements.find((el) => el.type === 'line') ? (
        <>
          <LineIconBtn
            className={`${
              elements.find((el) => el.type_name === 'line')
                ? 'bg-orange-500'
                : 'bg-inherit'
            } h-8 w-8 p-[6px]`}
            handlerClick={handlerSelectProperty}
          />
          <LineArrowIconBtn
            className={`${
              elements.find((el) => el.type_name === 'arrow_line')
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
