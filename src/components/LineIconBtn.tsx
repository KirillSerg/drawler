import { ElementsTypeName } from '../types/CommonTypes';

interface Props {
  className: string;
  handlerClick: (typeName: ElementsTypeName) => void;
}

const LineIconBtn = ({ className, handlerClick }: Props) => {
  return (
    <button className={`${className}`} onClick={() => handlerClick('line')}>
      <svg viewBox="0 0 24 24" height="100%" xmlns="http://www.w3.org/2000/svg">
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
  );
};

export default LineIconBtn;
