import { useAtom } from 'jotai';
import { creatingElementTypeAtom } from '../store/store';

const Toolbar = () => {
  const [creatingElementType, setCreatingElementType] = useAtom(
    creatingElementTypeAtom,
  );

  return (
    <header className="h-[6%] sticky top-0 flex justify-center gap-4 border-4 border-black">
      <button
        className={`${creatingElementType === 'free' ? 'bg-orange-500' : 'bg-inherit'}`}
        onClick={() => setCreatingElementType('free')}
      >
        🖱️
      </button>
      <button
        className={`${creatingElementType === 'rect' ? 'bg-orange-500' : 'bg-inherit'}`}
        onClick={() => setCreatingElementType('rect')}
      >
        <svg
          viewBox="0 0 24 24"
          height="50%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            stroke="black"
            strokeWidth="4"
            fill="none"
          />
        </svg>
      </button>
      <button
        className={`${creatingElementType === 'ellipse' ? 'bg-orange-500' : 'bg-inherit'}`}
        onClick={() => setCreatingElementType('ellipse')}
      >
        elips
      </button>
      <button
        className={`${creatingElementType === 'line' ? 'bg-orange-500' : 'bg-inherit'}`}
        onClick={() => setCreatingElementType('line')}
      >
        line
      </button>
    </header>
  );
};

export default Toolbar;
