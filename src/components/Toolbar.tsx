import { useAtom } from 'jotai';
import { activeElementTypeAtom } from '../store/store';

const Toolbar = () => {
  const [activeElementType, setActiveElementType] = useAtom(
    activeElementTypeAtom,
  );

  return (
    <header className="h-[6%] sticky top-0 flex justify-center gap-4 border-4 border-black">
      <button
        className={`${activeElementType === 'free' ? 'bg-orange-500' : 'bg-inherit'}`}
        onClick={() => setActiveElementType('free')}
      >
        🖱️
      </button>
      <button
        className={`${activeElementType === 'rect' ? 'bg-orange-500' : 'bg-inherit'}`}
        onClick={() => setActiveElementType('rect')}
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
        className={`${activeElementType === 'ellipse' ? 'bg-orange-500' : 'bg-inherit'}`}
        onClick={() => setActiveElementType('ellipse')}
      >
        elips
      </button>
      <button
        className={`${activeElementType === 'line' ? 'bg-orange-500' : 'bg-inherit'}`}
        onClick={() => setActiveElementType('line')}
      >
        line
      </button>
    </header>
  );
};

export default Toolbar;
