import { useAtom, useAtomValue } from 'jotai';
import { canvasViewBoxAtom, updateCanvasViewBoxAtom } from '../store/store';
import { UpdateCanvasViewBoxFn } from '../types/CommonTypes';

const Zoom = () => {
  const canvasViewBox = useAtomValue(canvasViewBoxAtom);
  const [, updateCanvasViewBox] = useAtom(updateCanvasViewBoxAtom);

  return (
    <div className="w-full flex justify-end px-5">
      <div className="h-fit w-fit px-2 fixed bottom-3 flex justify-center items-center gap-4 border-[1px] border-black">
        <button
          className="font-bold text-xl leading-none text-start"
          onClick={() => {
            updateCanvasViewBox(UpdateCanvasViewBoxFn.ZOOMDOWN);
          }}
        >
          -
        </button>

        <button
          className="w-10"
          onClick={() => {
            updateCanvasViewBox(UpdateCanvasViewBoxFn.ZOOMRESET);
          }}
        >
          {`${canvasViewBox.percentage}%`}
        </button>

        <button
          className="font-bold text-lg"
          onClick={() => {
            updateCanvasViewBox(UpdateCanvasViewBoxFn.ZOOMUP);
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Zoom;
