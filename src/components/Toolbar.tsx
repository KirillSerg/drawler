import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { creatingElementTypeAtom, initialElementAtom } from '../store/store';
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
  const [creatingElementType, setCreatingElementType] = useAtom(
    creatingElementTypeAtom,
  );
  const [, setInitialElement] = useAtom(initialElementAtom);

  const handlerSetElementTypeName = (typeName: ElementsType) => {
    setElementTypeName(typeName);
    setCreatingElementType(elementsType[typeName] as Element['type']);

    if (typeName === 'arrow_line')
      setInitialElement((prev) => {
        return { ...prev, markerEnd: 'url(#arrow)' };
      });
  };

  useEffect(() => {
    if (creatingElementType === 'free') {
      setElementTypeName('free');
    }
  }, [creatingElementType]);

  return (
    <header className="h-[6%] sticky top-0 flex justify-center gap-4 border-4 border-black">
      <FreeIconBtn
        elementTypeName={elementTypeName}
        handlerClick={handlerSetElementTypeName}
      />

      <RectIconBtn
        elementTypeName={elementTypeName}
        handlerClick={handlerSetElementTypeName}
      />

      <EllipseIconBtn
        elementTypeName={elementTypeName}
        handlerClick={handlerSetElementTypeName}
      />

      <TriangleIconBtn
        elementTypeName={elementTypeName}
        handlerClick={handlerSetElementTypeName}
      />

      <LineIconBtn
        elementTypeName={elementTypeName}
        handlerClick={handlerSetElementTypeName}
      />
      <LineArrowIconBtn
        elementTypeName={elementTypeName}
        handlerClick={handlerSetElementTypeName}
      />
    </header>
  );
};

export default Toolbar;
