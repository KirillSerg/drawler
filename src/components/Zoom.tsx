import { useAtom, useAtomValue } from 'jotai';
import { canvasViewBoxAtom, zoomCanvasAtom } from '../store/store';
import { ZoomCanvasFn } from '../types/CommonTypes';

const Zoom = () => {
  const canvasViewBox = useAtomValue(canvasViewBoxAtom);
  const [, zoomCanvas] = useAtom(zoomCanvasAtom);

  return (
    // h-fit w-fit px-2 fixed bottom-3 flex justify-center items-center gap-4 border-[1px] border-black
    <div className="w-[50%] flex justify-between items-center bg-gray-200 rounded-lg p-1">
      <button
        id="zoomdown"
        className="font-bold text-xl"
        onClick={() => {
          zoomCanvas(ZoomCanvasFn.ZOOMDOWN);
        }}
      >
        &minus;
      </button>

      <button
        id="zoomreset"
        className="w-10"
        onClick={() => {
          zoomCanvas(ZoomCanvasFn.ZOOMRESET);
        }}
      >
        {`${canvasViewBox.percentage}%`}
      </button>

      <button
        id="zoomup"
        className="font-bold text-lg"
        onClick={() => {
          zoomCanvas(ZoomCanvasFn.ZOOMUP);
        }}
      >
        +
      </button>
    </div>
  );
};

export default Zoom;
