import { useState } from 'react';
import { ElementProps } from '../../types/CommonTypes';

interface Props {
  className?: string;
  handlerClick: (props: ElementProps) => void;
}

const OpacityProp = ({ className, handlerClick }: Props) => {
  const [opacity, setOpacity] = useState<string>('1');

  const onChangeOpacity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOpacity(e.target.value);
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
    });
  };

  return (
    <input
      className={`${className} w-full`}
      type="range"
      name="opacity"
      id="opacity"
      max={1}
      step={0.1}
      value={opacity}
      onChange={(e) => onChangeOpacity(e)}
    />
  );
};

export default OpacityProp;
