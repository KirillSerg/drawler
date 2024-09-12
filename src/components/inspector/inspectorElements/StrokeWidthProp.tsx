import { ElementProps } from '../../../types/CommonTypes';

interface Props {
  className?: string;
  handlerClick: (props: ElementProps) => void;
  strokeWidth?: number;
}

const StrokeWidthProp = ({ className, handlerClick, strokeWidth }: Props) => {
  return (
    <button
      className={`${className}`}
      onClick={() =>
        handlerClick({
          types: [
            'rect',
            'ellipse',
            'line',
            'polygon',
            'foreignObject',
            'path',
          ],
          strokeWidth,
        })
      }
    >
      <svg
        id="line"
        viewBox="0 0 24 24"
        height="100%"
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="0"
          y1="50%"
          x2="100%"
          y2="50%"
          stroke="black"
          strokeWidth={strokeWidth}
        />
      </svg>
    </button>
  );
};

export default StrokeWidthProp;
