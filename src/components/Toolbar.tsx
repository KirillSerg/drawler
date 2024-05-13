import { useAtom } from 'jotai';
import { creatingElementTypeAtom } from '../store/store';
import TextIcon from '../assets/icons/Text.svg';

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
            width="80%"
            height="80%"
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
            cx="50%"
            cy="50%"
            rx="45%"
            ry="35%"
            stroke="black"
            strokeWidth="10%"
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
            points="12,0 24,24 0,24"
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
        className={`${creatingElementType === 'text' ? 'bg-orange-500' : 'bg-inherit'}`}
        onClick={() => setCreatingElementType('text')}
      >
        <img src={TextIcon} alt="text" width={32} />
      </button>
    </header>
  );
};

export default Toolbar;
