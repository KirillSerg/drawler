import { useAtom } from 'jotai';
import { initialElementAtom, selectedElementAtom } from '../store/store';
import LineIconBtn from './LineIconBtn';
import LineArrowIconBtn from './LineArrowIconBtn';
import TriangleIconBtn from './TriangleIconBtn';
import EllipseIconBtn from './EllipseIconBtn';
import RectIconBtn from './RectIconBtn';
import FreeIconBtn from './FreeIconBtn';
import {
  ELEMENT_TYPE_VARIANTS,
  Element,
  ElementsTypeName,
} from '../types/CommonTypes';

const Toolbar = () => {
  const [initialElement, setInitialElement] = useAtom(initialElementAtom);
  const [, setSelectedElement] = useAtom(selectedElementAtom);

  const handlerSelectElement = (typeName: ElementsTypeName) => {
    setInitialElement((prev) => {
      return {
        ...prev,
        type: ELEMENT_TYPE_VARIANTS[typeName] as Element['type'],
        type_name: typeName,
        markerEnd: typeName === 'arrow_line' ? 'url(#arrow)' : '',
      };
    });
    setSelectedElement(null);
  };

  return (
    <header className="h-[6%] sticky top-0 flex justify-center gap-4 border-4 border-black">
      <FreeIconBtn
        className={`${initialElement.type_name === 'free' ? 'bg-orange-500' : 'bg-inherit'} h-8 w-8 p-[6px]`}
        handlerClick={handlerSelectElement}
      />

      <RectIconBtn
        className={`${initialElement.type_name === 'rect' ? 'bg-orange-500' : 'bg-inherit'} h-8 w-8 p-[6px]`}
        handlerClick={handlerSelectElement}
      />

      <EllipseIconBtn
        className={`${initialElement.type_name === 'ellipse' ? 'bg-orange-500' : 'bg-inherit'} h-8 w-8 p-[6px]`}
        handlerClick={handlerSelectElement}
      />

      <TriangleIconBtn
        className={`${initialElement.type_name === 'polygon' ? 'bg-orange-500' : 'bg-inherit'} h-8 w-8 p-[6px]`}
        handlerClick={handlerSelectElement}
      />

      <LineIconBtn
        className={`${initialElement.type_name === 'line' ? 'bg-orange-500' : 'bg-inherit'} h-8 w-8 p-[6px]`}
        handlerClick={handlerSelectElement}
      />
      <LineArrowIconBtn
        className={`${initialElement.type_name === 'arrow_line' ? 'bg-orange-500' : 'bg-inherit'} h-8 w-8 p-[6px]`}
        handlerClick={handlerSelectElement}
      />
    </header>
  );
};

export default Toolbar;
