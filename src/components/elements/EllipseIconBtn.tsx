import { Element } from '../../types/CommonTypes';

interface Props {
  className: string;
  handlerClick: (type_name: Element['type_name']) => void;
}

const EllipseIconBtn = ({ className, handlerClick }: Props) => {
  return (
    <button className={`${className}`} onClick={() => handlerClick('ellipse')}>
      <svg
        viewBox="0 0 24 24"
        height="100%"
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse
          cx="12"
          cy="12"
          rx="10"
          ry="7"
          stroke="black"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </button>
  );
};

export default EllipseIconBtn;
