import { Element } from '../../../types/CommonTypes';

interface Props {
  className: string;
  handlerClick: (type_name: Element['type_name']) => void;
}

const TextIconBtn = ({ className, handlerClick }: Props) => {
  return (
    <button className={`${className}`} onClick={() => handlerClick('text')}>
      <svg
        viewBox="0 0 24 24"
        height="100%"
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <text
          y="80%"
          x="20%"
          width={24}
          height={24}
          stroke="black"
          strokeWidth={1}
          fontSize="120%"
        >
          Tt
        </text>
      </svg>
    </button>
  );
};

export default TextIconBtn;
