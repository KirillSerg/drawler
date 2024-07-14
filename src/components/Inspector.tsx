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
import { getBorderRadius } from '../assets/utilities';
import EdgeSharpProp from './inspectorElements/EdgeSharpProp';
import OpacityProp from './inspectorElements/OpacityProp';

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
            rx: getBorderRadius(el.width, el.height, props.rx),
            ry: getBorderRadius(el.width, el.height, props.ry),
          });
        }
      });
    } else {
      setCreationInitialElement((prev) => {
        return {
          ...prev,
          ...props,
          rx: props.rx ? getBorderRadius(prev.width, prev.height, props.rx) : 0,
          ry: props.ry ? getBorderRadius(prev.width, prev.height, props.ry) : 0,
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
    <>
      {elements[0].id && (
        <aside className="fixed min-w-[10%] max-w-[25%] max-h-[80%] overflow-auto px-3 py-5 top-[10%] left-5 border border-black">
          <>
            <p>Actions</p>
            <div id="actions" className="flex gap-x-1">
              <img
                onClick={deleteElements}
                src={deleteIcon}
                alt="delete"
                width={24}
                height={24}
              />
            </div>
          </>
          {/* Line marker properties*/}
          {(isArrow_line || isLine) && (
            <>
              <p>Linehead</p>
              <div id="linehead" className="flex gap-x-1">
                <LineProp
                  className={`${
                    isLine ? 'bg-blue-300' : 'bg-gray-200'
                  } h-8 w-8 p-[6px] rounded-md`}
                  handlerClick={handlerSelectProperty}
                />
                <LineArrowProp
                  className={`${
                    isArrow_line ? 'bg-blue-300' : 'bg-gray-200'
                  } h-8 w-8 p-[6px] rounded-md`}
                  handlerClick={handlerSelectProperty}
                />
              </div>
            </>
          )}
          {/* Edges properties */}
          {(isEdgesRound || isEdgesSharp) && (
            <>
              <p>Edges</p>
              <div id="edges" className="flex gap-x-1">
                <EdgeRoundProp
                  className={`${
                    isEdgesRound ? 'bg-blue-300' : 'bg-gray-200'
                  } h-8 w-8 p-[6px] rounded-md`}
                  handlerClick={handlerSelectProperty}
                />
                <EdgeSharpProp
                  className={`${
                    isEdgesSharp ? 'bg-blue-300' : 'bg-gray-200'
                  } h-8 w-8 p-[6px] rounded-md`}
                  handlerClick={handlerSelectProperty}
                />
              </div>
            </>
          )}
          {/* Opacity properties*/}
          <>
            <p>Opacity</p>

            <OpacityProp handlerClick={handlerSelectProperty} />
          </>
        </aside>
      )}
    </>
  );
};

export default Inspector;
