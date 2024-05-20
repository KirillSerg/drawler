import { useAtom } from 'jotai';
import { creatingElementTypeAtom } from '../store/store';

const Toolbar = () => {
  const [creatingElementType, setCreatingElementType] = useAtom(
    creatingElementTypeAtom,
  );

  return (
    <header className="h-[6%] sticky top-0 flex justify-center gap-4 border-4 border-black">
      <button
        className={`${creatingElementType === 'free' ? 'bg-orange-500' : 'bg-inherit'} p-[6px]`}
        onClick={() => setCreatingElementType('free')}
      >
        🖱️
      </button>
      <button
        className={`${creatingElementType === 'rect' ? 'bg-orange-500' : 'bg-inherit'} p-[6px]`}
        onClick={() => setCreatingElementType('rect')}
      >
        <svg
          viewBox="0 0 24 24"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="2"
            y="2"
            width="20"
            height="20"
            stroke="black"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </button>
      <button
        className={`${creatingElementType === 'ellipse' ? 'bg-orange-500' : 'bg-inherit'} p-[6px]`}
        onClick={() => setCreatingElementType('ellipse')}
      >
        <svg
          viewBox="0 0 24 24"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse
            cx="12"
            cy="12"
            rx="10"
            ry="7"
            stroke="black"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </button>

      <button
        className={`${creatingElementType === 'polygon' ? 'bg-orange-500' : 'bg-inherit'} p-[6px]`}
        onClick={() => setCreatingElementType('polygon')}
      >
        <svg
          viewBox="0 0 24 24"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            points="12,2 22,22 2,22"
            fill="none"
            stroke="black"
            strokeWidth="2"
          />
        </svg>
      </button>

      <button
        className={`${creatingElementType === 'line' ? 'bg-orange-500' : 'bg-inherit'} p-[6px]`}
        onClick={() => setCreatingElementType('line')}
      >
        <svg
          viewBox="0 0 24 24"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="0"
            y1="50%"
            x2="100%"
            y2="50%"
            stroke="black"
            strokeWidth="2"
          />
        </svg>
      </button>

      <button
        className={`${creatingElementType === 'line' ? 'bg-orange-500' : 'bg-inherit'} p-[6px]`}
        onClick={() => setCreatingElementType('line')}
      >
        <svg
          viewBox="0 0 24 24"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <marker
              id="arrow"
              markerWidth="5"
              markerHeight="5"
              refX="5"
              refY="2.5"
              orient="auto"
            >
              <path d="M 0 0 L 5 2.5 L 0 5" fill="none" stroke="black" />
            </marker>
          </defs>
          <line
            x1="0"
            y1="12"
            x2="24"
            y2="12"
            stroke="black"
            strokeWidth="2"
            marker-end="url(#arrow)"
          />
        </svg>
      </button>
    </header>
  );
};

export default Toolbar;
