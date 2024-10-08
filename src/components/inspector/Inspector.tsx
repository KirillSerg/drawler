import { useMemo } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import {
  deleteElementsAtom,
  creationInitialElementAtom,
  selectedElementAtom,
  updateElementsAtom,
  isDrawingAtom,
  setLayersAtom,
} from '../../store/store';
import LineArrowProp from './inspectorElements/LineArrowProp';
import LineProp from './inspectorElements/LineProp';
import EdgeRoundProp from './inspectorElements/EdgeRoundProp';
import { getBorderRadius } from '../../assets/utilities';
import EdgeSharpProp from './inspectorElements/EdgeSharpProp';
import OpacityProp from './inspectorElements/OpacityProp';
import StrokeWidthProp from './inspectorElements/StrokeWidthProp';
import ColorsPalette from './inspectorElements/ColorsPalette';
import StrokeStyleProp from './inspectorElements/StrokeStyleProp';
import DuplicateProp from './inspectorElements/DuplicateProp';
import LayersBtn from './inspectorElements/LayersBtn';

import { ElementProps } from '../../types/CommonTypes';

import deleteIcon from '../../assets/icons/trash.svg';
import {
  IconLayerToBackFront,
  IconLayerToBackwardForward,
} from '../../assets/icons/Icons';

const Inspector = () => {
  const [, deleteElements] = useAtom(deleteElementsAtom);
  const [, updateElements] = useAtom(updateElementsAtom);
  const [, setLayers] = useAtom(setLayersAtom);
  const selectedElement = useAtomValue(selectedElementAtom);
  const [creationInitialElement, setCreationInitialElement] = useAtom(
    creationInitialElementAtom,
  );
  const isDrawing = useAtomValue(isDrawingAtom);

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
            rx:
              props.rx !== undefined
                ? getBorderRadius(el.width, el.height, props.rx)
                : el.rx,
            ry:
              props.ry !== undefined
                ? getBorderRadius(el.width, el.height, props.ry)
                : el.ry,
          });
        }
      });
    } else {
      setCreationInitialElement((prev) => {
        return {
          ...prev,
          ...props,
          rx:
            props.rx !== undefined
              ? getBorderRadius(prev.width, prev.height, props.rx)
              : prev.rx,
          ry:
            props.ry !== undefined
              ? getBorderRadius(prev.width, prev.height, props.ry)
              : prev.ry,
        };
      });
    }
  };

  const isArrow_line = elements.find((el) => el.type_name === 'arrow_line');
  const isLine = elements.find((el) => el.type_name === 'line');
  const isEdgesRound = elements.find(
    (el) => el.type === 'rect' && (el.rx > 0 || el.ry > 0),
  );
  const isEdgesSharp = elements.find(
    (el) => el.type === 'rect' && (el.rx === 0 || el.ry === 0),
  );
  const isStrokeWidthSM = elements.find(
    (el) => el.strokeWidth === 1 && el.type_name !== 'image',
  );
  const isStrokeWidthMD = elements.find(
    (el) => el.strokeWidth === 4 && el.type_name !== 'image',
  );
  const isStrokeWidthLG = elements.find(
    (el) => el.strokeWidth === 10 && el.type_name !== 'image',
  );
  const isStrokeDott = elements.find(
    (el) => el.strokeLinecap === 'round' && el.type_name !== 'image',
  );
  const isStrokeDash = elements.find(
    (el) => el.strokeDasharray && !isStrokeDott && el.type_name !== 'image',
  );
  const isStrokeSolid = elements.find(
    (el) => !el.strokeDasharray && el.type_name !== 'image',
  );

  return (
    <>
      {(elements[0].id || isDrawing) && (
        <aside className="fixed min-w-[10%] max-w-[20%] max-h-[70%] overflow-auto px-3 py-5 top-[10%] right-5 shadow-[5px_5px_30px_#d9d9d9] bg-white rounded-lg">
          <>
            <p>Actions</p>
            <div id="actions" className="flex flex-wrap gap-1">
              <img
                onClick={deleteElements}
                src={deleteIcon}
                alt="delete"
                width={24}
                height={24}
              />
              <DuplicateProp />
            </div>
          </>
          <>
            <p>Backgraund</p>
            <ColorsPalette
              targetProp={'fill'}
              handlerClick={handlerSelectProperty}
              activeColor={elements[0].fill}
            />
          </>
          <>
            <p>Stroke</p>
            <ColorsPalette
              targetProp={'stroke'}
              handlerClick={handlerSelectProperty}
              activeColor={elements[0].stroke}
            />
          </>
          {/* Line marker properties*/}
          {(isArrow_line || isLine) && (
            <>
              <p>Linehead</p>
              <div id="linehead" className="flex flex-wrap gap-1">
                <LineProp
                  className={`${
                    isLine ? 'bg-blue-300' : 'bg-gray-200'
                  } h-8 min-w-8 p-[6px] rounded-md`}
                  handlerClick={handlerSelectProperty}
                />
                <LineArrowProp
                  className={`${
                    isArrow_line ? 'bg-blue-300' : 'bg-gray-200'
                  } h-8 min-w-8 p-[6px] rounded-md`}
                  handlerClick={handlerSelectProperty}
                />
              </div>
            </>
          )}
          {/* Edges properties */}
          {(isEdgesRound || isEdgesSharp) && (
            <>
              <p>Edges</p>
              <div id="edges" className="flex flex-wrap gap-1">
                <EdgeRoundProp
                  className={`${
                    isEdgesRound ? 'bg-blue-300' : 'bg-gray-200'
                  } h-8 min-w-8 p-[6px] rounded-md`}
                  handlerClick={handlerSelectProperty}
                />
                <EdgeSharpProp
                  className={`${
                    isEdgesSharp ? 'bg-blue-300' : 'bg-gray-200'
                  } h-8 min-w-8 p-[6px] rounded-md`}
                  handlerClick={handlerSelectProperty}
                />
              </div>
            </>
          )}
          {/* Opacity properties*/}
          <>
            <p>Opacity</p>
            <OpacityProp
              handlerClick={handlerSelectProperty}
              opacity={elements[0].opacity}
            />
          </>
          {/* Stroke width properties*/}
          <>
            <p>Stroke width</p>
            <div id="edges" className="flex flex-wrap gap-1">
              <StrokeWidthProp
                className={`${
                  isStrokeWidthSM ? 'bg-blue-300' : 'bg-gray-200'
                } h-8 min-w-8 p-[6px] rounded-md`}
                handlerClick={handlerSelectProperty}
                strokeWidth={1}
              />
              <StrokeWidthProp
                className={`${
                  isStrokeWidthMD ? 'bg-blue-300' : 'bg-gray-200'
                } h-8 min-w-8 p-[6px] rounded-md`}
                handlerClick={handlerSelectProperty}
                strokeWidth={4}
              />
              <StrokeWidthProp
                className={`${
                  isStrokeWidthLG ? 'bg-blue-300' : 'bg-gray-200'
                } h-8 min-w-8 p-[6px] rounded-md`}
                handlerClick={handlerSelectProperty}
                strokeWidth={10}
              />
            </div>
          </>
          {/* Stroke style properties*/}
          <>
            <p>Stroke style</p>
            <div id="edges" className="flex flex-wrap gap-1">
              <StrokeStyleProp
                className={`${
                  isStrokeSolid ? 'bg-blue-300' : 'bg-gray-200'
                } h-8 min-w-8 p-[6px] rounded-md`}
                handlerClick={handlerSelectProperty}
              />
              <StrokeStyleProp
                className={`${
                  isStrokeDash ? 'bg-blue-300' : 'bg-gray-200'
                } h-8 min-w-8 p-[6px] rounded-md`}
                handlerClick={handlerSelectProperty}
                strokeDasharray="20 10"
              />
              <StrokeStyleProp
                className={`${
                  isStrokeDott ? 'bg-blue-300' : 'bg-gray-200'
                } h-8 min-w-8 p-[6px] rounded-md`}
                handlerClick={handlerSelectProperty}
                strokeDasharray="1 15"
                strokeLinecap="round"
              />
            </div>

            <>
              <p>Layers</p>
              <div id="layers" className="flex flex-wrap gap-1">
                <LayersBtn
                  Icon={IconLayerToBackFront}
                  className="bg-gray-200 h-8 min-w-8 p-[6px] rounded-md rotate-180"
                  handlerClick={() => {
                    setLayers('back');
                  }}
                />
                <LayersBtn
                  Icon={IconLayerToBackwardForward}
                  className="bg-gray-200 h-8 min-w-8 p-[6px] rounded-md rotate-180"
                  handlerClick={() => {
                    setLayers('backward');
                  }}
                />
                <LayersBtn
                  Icon={IconLayerToBackwardForward}
                  className="bg-gray-200 h-8 min-w-8 p-[6px] rounded-md"
                  handlerClick={() => {
                    setLayers('forward');
                  }}
                />
                <LayersBtn
                  Icon={IconLayerToBackFront}
                  className="bg-gray-200 h-8 min-w-8 p-[6px] rounded-md"
                  handlerClick={() => {
                    setLayers('front');
                  }}
                />
              </div>
            </>
          </>
        </aside>
      )}
    </>
  );
};

export default Inspector;
