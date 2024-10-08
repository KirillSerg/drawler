import { useAtom } from 'jotai';
import LineIconBtn from './toolbarElements/LineIconBtn';
import LineArrowIconBtn from './toolbarElements/LineArrowIconBtn';
import TriangleIconBtn from './toolbarElements/TriangleIconBtn';
import EllipseIconBtn from './toolbarElements/EllipseIconBtn';
import RectIconBtn from './toolbarElements/RectIconBtn';
import FreeIconBtn from './toolbarElements/FreeIconBtn';
import TextIconBtn from './toolbarElements/TextIconBtn';
import PencilIconBtn from './toolbarElements/PencilIconBtn';
import GrabIconBtn from './toolbarElements/GrabIconBtn copy';
import ImageIconBtn from './toolbarElements/ImageIconBtn';
import {
  creationInitialElementAtom,
  selectedElementAtom,
} from '../../store/store';
import { ELEMENT_TYPE_VARIANTS, Element } from '../../types/CommonTypes';

const Toolbar = () => {
  const [creationInitialElement, setCreationInitialElement] = useAtom(
    creationInitialElementAtom,
  );
  const [, setSelectedElement] = useAtom(selectedElementAtom);

  const handlerSelectElement = (type_name: Element['type_name']) => {
    setCreationInitialElement((prev) => {
      return {
        ...prev,
        type_name,
        type:
          (ELEMENT_TYPE_VARIANTS[type_name] as Element['type']) || prev.type,
        markerEnd: type_name === 'arrow_line' ? 'url(#arrow)' : '',
        width: type_name === 'image' ? 100 : 1,
        height: type_name === 'image' ? 100 : 1,
      };
    });
    setSelectedElement([]);
  };

  return (
    <header className="w-fit h-fit p-1 fixed top-3 flex bg-white justify-center flex-wrap items-center gap-x-4 rounded-lg shadow-[5px_5px_30px_#d9d9d9]">
      <GrabIconBtn
        className={`${creationInitialElement.type_name === 'grab' ? 'bg-blue-300' : 'bg-inherit'} h-8 w-8 p-[6px] focus-visible:outline-none rounded-lg`}
        handlerClick={handlerSelectElement}
      />
      <FreeIconBtn
        className={`${creationInitialElement.type_name === 'free' ? 'bg-blue-300' : 'bg-inherit'} h-8 w-8 p-[6px] focus-visible:outline-none rounded-lg`}
        handlerClick={handlerSelectElement}
      />

      <RectIconBtn
        className={`${creationInitialElement.type_name === 'rect' ? 'bg-blue-300' : 'bg-inherit'} h-8 w-8 p-[6px] focus-visible:outline-none rounded-lg`}
        handlerClick={handlerSelectElement}
      />

      <EllipseIconBtn
        className={`${creationInitialElement.type_name === 'ellipse' ? 'bg-blue-300' : 'bg-inherit'} h-[100%] w-8 p-[6px] focus-visible:outline-none rounded-lg`}
        handlerClick={handlerSelectElement}
      />

      <TriangleIconBtn
        className={`${creationInitialElement.type_name === 'polygon' ? 'bg-blue-300' : 'bg-inherit'} h-[100%] w-8 p-[6px] focus-visible:outline-none rounded-lg`}
        handlerClick={handlerSelectElement}
      />

      <LineIconBtn
        className={`${creationInitialElement.type_name === 'line' ? 'bg-blue-300' : 'bg-inherit'} h-[100%] w-8 p-[6px] focus-visible:outline-none rounded-lg`}
        handlerClick={handlerSelectElement}
      />

      <LineArrowIconBtn
        className={`${creationInitialElement.type_name === 'arrow_line' ? 'bg-blue-300' : 'bg-inherit'} h-[100%] w-8 p-[6px] focus-visible:outline-none rounded-lg`}
        handlerClick={handlerSelectElement}
      />

      <TextIconBtn
        className={`${creationInitialElement.type_name === 'text' ? 'bg-blue-300' : 'bg-inherit'} h-[100%] w-8 p-[6px] focus-visible:outline-none rounded-lg`}
        handlerClick={handlerSelectElement}
      />

      <PencilIconBtn
        className={`${creationInitialElement.type_name === 'pencil' ? 'bg-blue-300' : 'bg-inherit'} h-[100%] w-8 p-[6px] focus-visible:outline-none rounded-lg`}
        handlerClick={handlerSelectElement}
      />

      <ImageIconBtn
        className={`${creationInitialElement.type_name === 'image' ? 'bg-blue-300' : 'bg-inherit'} h-[100%] w-8 p-[6px] focus-visible:outline-none relative rounded-lg`}
        handlerClick={handlerSelectElement}
      />
    </header>
  );
};

export default Toolbar;
