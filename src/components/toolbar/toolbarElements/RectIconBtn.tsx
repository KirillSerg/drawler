import { Element } from '../../../types/CommonTypes';

interface Props {
  className: string;
  handlerClick: (type_name: Element['type_name']) => void;
}

const RectIconBtn = ({ className, handlerClick }: Props) => {
  return (
    <button className={`${className}`} onClick={() => handlerClick('rect')}>
      <svg
        viewBox="0 0 24 24"
        height="100%"
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="2"
          y="2"
          width="85%"
          height="85%"
          stroke="black"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </button>
  );
};

export default RectIconBtn;
