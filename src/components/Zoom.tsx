import { useAtom, useAtomValue } from 'jotai';
import { canvasViewBoxAtom, zoomCanvasAtom } from '../store/store';
import { ZoomCanvasFn } from '../types/CommonTypes';

const Zoom = () => {
  const canvasViewBox = useAtomValue(canvasViewBoxAtom);
  const [, zoomCanvas] = useAtom(zoomCanvasAtom);

  return (
    // <div className="w-full flex justify-end px-5">
    <div className="h-fit w-fit px-2 fixed bottom-3 flex justify-center items-center gap-4 border-[1px] border-black">
      <button
        id="zoomdown"
        className="font-bold text-xl leading-none text-start"
        onClick={() => {
          zoomCanvas(ZoomCanvasFn.ZOOMDOWN);
        }}
      >
        -
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
    // </div>
  );
};

export default Zoom;
