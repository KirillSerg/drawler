import { ElementProps } from '../../types/CommonTypes';

interface Props {
  className?: string;
  handlerClick: (props: ElementProps) => void;
  opacity: string;
}

const OpacityProp = ({ className, handlerClick, opacity }: Props) => {
  return (
    <input
      className={`${className} w-full`}
      type="range"
      name="opacity"
      id="opacity"
      max={1}
      min={0.1}
      step={0.1}
      value={opacity}
      onChange={(e) =>
        handlerClick({
          types: [
            'grab',
            'free',
            'rect',
            'ellipse',
            'line',
            'polygon',
            'foreignObject',
            'path',
            'image',
          ],
          opacity: e.target.value,
        })
      }
    />
  );
};

export default OpacityProp;
