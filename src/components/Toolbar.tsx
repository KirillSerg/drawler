import { useAtom } from 'jotai';
import LineIconBtn from './LineIconBtn';
import LineArrowIconBtn from './LineArrowIconBtn';
import TriangleIconBtn from './TriangleIconBtn';
import EllipseIconBtn from './EllipseIconBtn';
import RectIconBtn from './RectIconBtn';
import FreeIconBtn from './FreeIconBtn';
import TextIconBtn from './TextIconBtn';
import PencilIconBtn from './PencilIconBtn';
import GrabIconBtn from './GrabIconBtn copy';
import ImageIconBtn from './ImageIconBtn';
import {
  creationInitialElementAtom,
  selectedElementAtom,
} from '../store/store';
import {
  ELEMENT_TYPE_VARIANTS,
  Element,
  ElementsTypeName,
} from '../types/CommonTypes';

const Toolbar = () => {
  const [creationInitialElement, setCreationInitialElement] = useAtom(
    creationInitialElementAtom,
  );
  const [, setSelectedElement] = useAtom(selectedElementAtom);

  const handlerSelectElement = (typeName: ElementsTypeName) => {
    setCreationInitialElement((prev) => {
      return {
        ...prev,
        type: ELEMENT_TYPE_VARIANTS[typeName] as Element['type'],
        type_name: typeName,
        markerEnd: typeName === 'arrow_line' ? 'url(#arrow)' : '',
        fill: typeName === 'text' ? 'transparent' : 'none',
      };
    });
    setSelectedElement(null);
  };

  return (
    <header className="w-fit h-[6%] fixed top-3 flex justify-center items-center gap-4 border-[1px] border-black">
      <GrabIconBtn
        className={`${creationInitialElement.type_name === 'grab' ? 'bg-orange-500' : 'bg-inherit'} h-[100%] w-8 p-[6px] focus-visible:outline-none`}
        handlerClick={handlerSelectElement}
      />
      <FreeIconBtn
        className={`${creationInitialElement.type_name === 'free' ? 'bg-orange-500' : 'bg-inherit'} h-[100%] w-8 p-[6px] focus-visible:outline-none`}
        handlerClick={handlerSelectElement}
      />

      <RectIconBtn
        className={`${creationInitialElement.type_name === 'rect' ? 'bg-orange-500' : 'bg-inherit'} h-[100%] w-8 p-[6px] focus-visible:outline-none`}
        handlerClick={handlerSelectElement}
      />

      <EllipseIconBtn
        className={`${creationInitialElement.type_name === 'ellipse' ? 'bg-orange-500' : 'bg-inherit'} h-[100%] w-8 p-[6px] focus-visible:outline-none`}
        handlerClick={handlerSelectElement}
      />

      <TriangleIconBtn
        className={`${creationInitialElement.type_name === 'polygon' ? 'bg-orange-500' : 'bg-inherit'} h-[100%] w-8 p-[6px] focus-visible:outline-none`}
        handlerClick={handlerSelectElement}
      />

      <LineIconBtn
        className={`${creationInitialElement.type_name === 'line' ? 'bg-orange-500' : 'bg-inherit'} h-[100%] w-8 p-[6px] focus-visible:outline-none`}
        handlerClick={handlerSelectElement}
      />

      <LineArrowIconBtn
        className={`${creationInitialElement.type_name === 'arrow_line' ? 'bg-orange-500' : 'bg-inherit'} h-[100%] w-8 p-[6px] focus-visible:outline-none`}
        handlerClick={handlerSelectElement}
      />

      <TextIconBtn
        className={`${creationInitialElement.type_name === 'text' ? 'bg-orange-500' : 'bg-inherit'} h-[100%] w-8 p-[6px] focus-visible:outline-none`}
        handlerClick={handlerSelectElement}
      />

      <PencilIconBtn
        className={`${creationInitialElement.type_name === 'pencil' ? 'bg-orange-500' : 'bg-inherit'} h-[100%] w-8 p-[6px] focus-visible:outline-none`}
        handlerClick={handlerSelectElement}
      />

      <ImageIconBtn
        className={`${creationInitialElement.type_name === 'image' ? 'bg-orange-500' : 'bg-inherit'} h-[100%] w-8 p-[6px] focus-visible:outline-none relative`}
        handlerClick={handlerSelectElement}
      />
    </header>
  );
};

export default Toolbar;
