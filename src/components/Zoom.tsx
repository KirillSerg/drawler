import { useAtom } from 'jotai';
import { zoomSizeAtom } from '../store/store';

const Zoom = () => {
  const [zoomSize, setZoomSize] = useAtom(zoomSizeAtom);
  return (
    <div className="h-[6%] w-64 sticky bottom-0 flex justify-center gap-4 border-4 border-black">
      <button
        onClick={() => {
          setZoomSize((prev) => {
            if (prev.percentage === 0) return prev;
            return {
              percentage: prev.percentage - 10,
              width: prev.width + 1920 * 0.1,
              height: prev.height + 1080 * 0.1,
            };
          });
        }}
      >
        -
      </button>
      <span>{`${zoomSize.percentage} %`}</span>
      <button
        onClick={() => {
          setZoomSize((prev) => {
            return {
              percentage: prev.percentage + 10,
              width: prev.width - 1920 * 0.1,
              height: prev.height - 1080 * 0.1,
            };
          });
        }}
      >
        +
      </button>
    </div>
  );
};

export default Zoom;
