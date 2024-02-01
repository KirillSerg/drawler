import { Element } from '../types/Common';

interface Props {
  onCreate: (value: Element) => void;
}

const emptyElement = {
  id: '',
  x: 0,
  y: 0,
  width: 240,
  height: 300,
  stroke: 'black',
  strokeWidth: 2,
  fill: 'none',
};

const Toolbar = ({ onCreate }: Props) => {
  return (
    <header className="h-[6%] sticky top-0 flex justify-center gap-4 border-4 border-black">
      <button onClick={() => onCreate({ ...emptyElement, type: 'rect' })}>
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
            strokeWidth="2"
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
