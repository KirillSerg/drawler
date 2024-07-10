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
import EdgeRoundProp from './inspectorElements/EdgeRoundProp';
import { updateBorderRadius } from '../assets/utilities';
import EdgeSharpProp from './inspectorElements/EdgeSharpProp';

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
            rx: props.rx ? updateBorderRadius(el.width, el.height) : 0,
            ry: props.ry ? updateBorderRadius(el.width, el.height) : 0,
          });
        }
      });
    } else {
      setCreationInitialElement((prev) => {
        return {
          ...prev,
          ...props,
          rx: props.rx ? updateBorderRadius(prev.width, prev.height) : 0,
          ry: props.ry ? updateBorderRadius(prev.width, prev.height) : 0,
        };
      });
    }
  };

  const isArrow_line = elements.find((el) => el.type_name === 'arrow_line');
  const isLine = elements.find((el) => el.type_name === 'line');
  const isEdgesRound = elements.find(
    (el) =>
      (el.type === 'rect' || el.type === 'image') && (el.rx > 0 || el.ry > 0),
  );

  const isEdgesSharp = elements.find(
    (el) =>
      (el.type === 'rect' || el.type === 'image') &&
      (el.rx === 0 || el.ry === 0),
  );

  return (
    <aside className="fixed min-w-[10%] max-w-[25%] max-h-[80%] overflow-auto px-3 py-5  top-[10%] right-5 border border-black">
      Inspector
      {elements[0].id && (
        <img
          onClick={deleteElements}
          src={deleteIcon}
          alt="delete"
          width={24}
          height={24}
        />
      )}
      {/* Line marker */}
      {(isArrow_line || isLine) && (
        <>
          <LineProp
            className={`${
              isLine ? 'bg-orange-500' : 'bg-inherit'
            } h-8 w-8 p-[6px]`}
            handlerClick={handlerSelectProperty}
          />
          <LineArrowProp
            className={`${
              isArrow_line ? 'bg-orange-500' : 'bg-inherit'
            } h-8 w-8 p-[6px]`}
            handlerClick={handlerSelectProperty}
          />
        </>
      )}
      {/* Edges propertys */}
      {(isEdgesRound || isEdgesSharp) && (
        <>
          <EdgeRoundProp
            className={`${
              isEdgesRound ? 'bg-orange-500' : 'bg-inherit'
            } h-6 w-6`}
            handlerClick={handlerSelectProperty}
          />
          <EdgeSharpProp
            className={`${
              isEdgesSharp ? 'bg-orange-500' : 'bg-inherit'
            } h-6 w-6`}
            handlerClick={handlerSelectProperty}
          />
        </>
      )}
    </aside>
  );
};

export default Inspector;
