import { Element } from '../../types/CommonTypes';

interface Props {
  className: string;
  handlerClick: (type_name: Element['type_name']) => void;
}

const FreeIconBtn = ({ className, handlerClick }: Props) => {
  return (
    <button className={`${className}`} onClick={() => handlerClick('free')}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="1064.7701 445.5539 419.8101 717.0565"
        height="100%"
        width="100%"
      >
        <polygon
          stroke="black"
          strokeWidth="40"
          fill="none"
          points="1283.1857,1127.3097 1406.1421,1077.6322 1314.2406,850.1678 1463.913,852.7823 1093.4828,480.8547 
	1085.4374,1005.6964 1191.2842,899.8454 "
        />
      </svg>
    </button>
  );
};

export default FreeIconBtn;
