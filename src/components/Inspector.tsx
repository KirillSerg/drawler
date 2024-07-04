import { useMemo } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import deleteIcon from '../assets/icons/trash.svg';
import {
  deleteElementsAtom,
  creationInitialElementAtom,
  selectedElementAtom,
  updateElementsAtom,
} from '../store/store';
import { ElementProps } from '../types/CommonTypes';
import LineArrowProp from './inspectorElements/LineArrowProp';
import LineProp from './inspectorElements/LineProp';

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
      selectedElement.forEach((el) => {
        const isNeedToUpdate = props.types?.includes(el.type);
        if (isNeedToUpdate) {
          updateElements({
            ...el,
            ...props,
          });
        }
      });
    } else {
      setCreationInitialElement((prev) => {
        return {
          ...prev,
          ...props,
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
          <LineProp
            className={`${
              elements.find((el) => el.type_name === 'line')
                ? 'bg-orange-500'
                : 'bg-inherit'
            } h-8 w-8 p-[6px]`}
            handlerClick={handlerSelectProperty}
          />
          <LineArrowProp
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
