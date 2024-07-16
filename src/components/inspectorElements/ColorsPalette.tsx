import { colorsPalette } from '../../assets/utilities';
import { ElementProps } from '../../types/CommonTypes';
import transparentFone from '../../assets/icons/transparentBG.png';

interface Props {
  targetProp: string;
  handlerClick: (props: ElementProps) => void;
  activeColor: string;
}

const ColorsPalette = ({ targetProp, handlerClick, activeColor }: Props) => {
  return (
    <>
      {colorsPalette.map((color) => (
        <button
          key={color}
          className={`w-5 h-5 rounded-sm ${activeColor === color ? 'border-2 border-dotted' : ''}`}
          style={{
            backgroundColor: `${color}`,
            backgroundImage: `${color === 'transparent' ? `url(${transparentFone})` : ''}`,
            backgroundSize: '12rem',
          }}
          onClick={() =>
            handlerClick({
              types: ['rect', 'ellipse', 'line', 'polygon', 'foreignObject'],
              [targetProp]: color,
            })
          }
        ></button>
      ))}
    </>
  );
};

export default ColorsPalette;
