import { ElementProps } from '../../types/CommonTypes';

interface Props {
  className: string;
  handlerClick: (props: ElementProps) => void;
}

const EdgeRoundProp = ({ className, handlerClick }: Props) => {
  return (
    <button
      className={`${className}`}
      onClick={() => handlerClick({ types: ['rect'], rx: 0.2, ry: 0.2 })} // rx & ry just number greater then 0. Border radius alwase will be 20% of smaller side
    >
      <svg
        aria-hidden="true"
        focusable="false"
        role="img"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g
          strokeWidth="1.5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M4 12v-4a4 4 0 0 1 4 -4h4"></path>
          <line x1="16" y1="4" x2="16" y2="4.01"></line>
          <line x1="20" y1="4" x2="20" y2="4.01"></line>
          <line x1="20" y1="8" x2="20" y2="8.01"></line>
          <line x1="20" y1="12" x2="20" y2="12.01"></line>
          <line x1="4" y1="16" x2="4" y2="16.01"></line>
          <line x1="20" y1="16" x2="20" y2="16.01"></line>
          <line x1="4" y1="20" x2="4" y2="20.01"></line>
          <line x1="8" y1="20" x2="8" y2="20.01"></line>
          <line x1="12" y1="20" x2="12" y2="20.01"></line>
          <line x1="16" y1="20" x2="16" y2="20.01"></line>
          <line x1="20" y1="20" x2="20" y2="20.01"></line>
        </g>
      </svg>
    </button>
  );
};

export default EdgeRoundProp;
