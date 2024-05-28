import { ElementsTypeName } from '../types/CommonTypes';

interface Props {
  className: string;
  handlerClick: (typeName: ElementsTypeName) => void;
}

const LineArrowIconBtn = ({ className, handlerClick }: Props) => {
  return (
    <button
      className={`${className}`}
      onClick={() => handlerClick('arrow_line')}
    >
      <svg viewBox="0 0 24 24" height="100%" xmlns="http://www.w3.org/2000/svg">
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
          markerEnd="url(#arrow)"
        />
      </svg>
    </button>
  );
};

export default LineArrowIconBtn;
