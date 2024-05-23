import { ElementsTypeName } from '../types/CommonTypes';

interface Props {
  className: string;
  handlerClick: (typeName: ElementsTypeName) => void;
}

const TriangleIconBtn = ({ className, handlerClick }: Props) => {
  return (
    <button className={`${className}`} onClick={() => handlerClick('polygon')}>
      <svg viewBox="0 0 24 24" height="100%" xmlns="http://www.w3.org/2000/svg">
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
