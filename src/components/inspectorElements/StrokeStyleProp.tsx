import { ElementProps } from '../../types/CommonTypes';

interface Props {
  className?: string;
  handlerClick: (props: ElementProps) => void;
  strokeDasharray?: string;
  strokeLinecap?: 'butt' | 'round' | 'square' | 'inherit' | undefined;
}

const StrokeStyleProp = ({
  className,
  handlerClick,
  strokeDasharray,
  strokeLinecap,
}: Props) => {
  const iconStrokeDasharray =
    strokeDasharray && `${+strokeDasharray[0] > 1 ? '6 2' : '1 4'}`;

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
          strokeDasharray,
          strokeLinecap,
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
          strokeWidth={strokeDasharray && 2}
          strokeDasharray={iconStrokeDasharray}
          strokeLinecap={strokeLinecap}
        />
      </svg>
    </button>
  );
};

export default StrokeStyleProp;
