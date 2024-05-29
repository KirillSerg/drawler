import { ElementsTypeName } from '../types/CommonTypes';

interface Props {
  className: string;
  handlerClick: (typeName: ElementsTypeName) => void;
}

const TextIconBtn = ({ className, handlerClick }: Props) => {
  return (
    <button className={`${className}`} onClick={() => handlerClick('text')}>
      <svg viewBox="0 0 24 24" height="100%" xmlns="http://www.w3.org/2000/svg">
        <text
          y="80%"
          x="20%"
          width={24}
          height={24}
          stroke="black"
          strokeWidth={1}
        >
          Tt
        </text>
      </svg>
    </button>
  );
};

export default TextIconBtn;
