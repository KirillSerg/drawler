import { Element } from '../../../types/CommonTypes';

interface Props {
  className: string;
  handlerClick: (type_name: Element['type_name']) => void;
}

const TriangleIconBtn = ({ className, handlerClick }: Props) => {
  return (
    <button
      id="triangle"
      className={`${className}`}
      onClick={() => handlerClick('polygon')}
    >
      <svg
        viewBox="0 0 24 24"
        height="100%"
        width="100%"
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
  );
};

export default TriangleIconBtn;
