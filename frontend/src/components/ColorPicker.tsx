import React from 'react';

interface ColorPickerProps {
  selectedColor?: string;
  onColorSelect: (color: string) => void;
  colors?: string[];
  allowClear?: boolean;
}

const defaultColors = [
  '#CDCDCD', '#FFA285', '#DAFF8B', '#ECA1FF', '#9DD6FF', 
  '#F99494', '#FFCAB9', '#FFE8AC', '#B9FFDD', '#BAE2FF', '#A99A7C'
];

/**
 * A component to render a color picker.
 * @param {{ selectedColor?: string, onColorSelect: (color: string) => void, colors?: string[], allowClear?: boolean }} props
 * @returns {JSX.Element} The rendered component.
 */
const ColorPicker = ({
  selectedColor,
  onColorSelect,
  colors = defaultColors,
  allowClear = false,
}: ColorPickerProps): JSX.Element => {
  return (
    <div className="color-picker">
      {colors.map((color, index) => (
        <button
          key={index}
          onClick={() => onColorSelect(color)}
          style={{ backgroundColor: color, border: color === selectedColor ? '1px solid #50656e' : 'none' }}
        />
      ))}
      {allowClear && (
        <button onClick={() => onColorSelect('')}>
          <img src="/filter.png" alt="Clear" width={18} height={18} />
        </button>
      )}
    </div>
  );
};

export default ColorPicker;
