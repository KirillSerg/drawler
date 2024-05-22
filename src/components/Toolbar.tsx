import { useState } from 'react';
import { useAtom } from 'jotai';
import { initialElementAtom } from '../store/store';
import { Element } from '../types/CommonTypes';
import LineIconBtn from './LineIconBtn';
import LineArrowIconBtn from './LineArrowIconBtn';
import TriangleIconBtn from './TriangleIconBtn';
import EllipseIconBtn from './EllipseIconBtn';
import RectIconBtn from './RectIconBtn';
import FreeIconBtn from './FreeIconBtn';

const elementsType = {
  free: 'free',
  rect: 'rect',
  ellipse: 'ellipse',
  polygon: 'polygon',
  line: 'line',
  arrow_line: 'line',
};

export type ElementsType = keyof typeof elementsType;

const Toolbar = () => {
  const [elementTypeName, setElementTypeName] = useState<ElementsType>('free');
  const [, setInitialElement] = useAtom(initialElementAtom);

  const handlerSelectElement = (typeName: ElementsType) => {
    setElementTypeName(typeName);
    setInitialElement((prev) => {
      return {
        ...prev,
        type: elementsType[typeName] as Element['type'],
        markerEnd: typeName === 'arrow_line' ? 'url(#arrow)' : prev.markerEnd,
      };
    });
  };

  return (
    <header className="h-[6%] sticky top-0 flex justify-center gap-4 border-4 border-black">
      <FreeIconBtn
        active={elementTypeName === 'free'}
        handlerClick={handlerSelectElement}
      />

      <RectIconBtn
        active={elementTypeName === 'rect'}
        handlerClick={handlerSelectElement}
      />

      <EllipseIconBtn
        active={elementTypeName === 'ellipse'}
        handlerClick={handlerSelectElement}
      />

      <TriangleIconBtn
        active={elementTypeName === 'polygon'}
        handlerClick={handlerSelectElement}
      />

      <LineIconBtn
        active={elementTypeName === 'line'}
        handlerClick={handlerSelectElement}
      />
      <LineArrowIconBtn
        active={elementTypeName === 'arrow_line'}
        handlerClick={handlerSelectElement}
      />
    </header>
  );
};

export default Toolbar;
