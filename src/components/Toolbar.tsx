import { useAtom } from 'jotai';
import { addElementsAtom } from '../store/store';

const emptyElement = {
  id: '',
  x: 960,
  y: 0,
  width: 240,
  height: 300,
  stroke: 'black',
  strokeWidth: 8,
  fill: 'none',
};

const Toolbar = () => {
  const [, addElements] = useAtom(addElementsAtom);

  return (
    <header className="h-[6%] sticky top-0 flex justify-center gap-4 border-4 border-black">
      <button onClick={() => addElements({ ...emptyElement, type: 'rect' })}>
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

      <button className="border border-blue-700">elips</button>

      <button className="border border-blue-700">line</button>
    </header>
  );
};

export default Toolbar;
