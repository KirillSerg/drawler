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
    <div
      id="backgraund"
      className="transition-all ease-in-out duration-700 delay-100 flex flex-wrap gap-1 max-h-5 overflow-hidden hover:max-h-96"
    >
      {colorsPalette.map((color) => (
        <button
          key={color}
          className={`w-5 h-5 rounded-sm ${activeColor === color ? 'border-2 border-dotted' : 'border-[1px] border-blue-100'}`}
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
    </div>
  );
};

export default ColorsPalette;
