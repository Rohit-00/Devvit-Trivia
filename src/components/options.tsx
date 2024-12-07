import { Button } from '../components/button.js';
import { Devvit } from '@devvit/public-api';

type OptionsListProps = {
  options: { option: string; background: string; text: string }[];
  selected: number | null;
  onSelect: (index: number, option: string) => void;
};

const OptionsList = ({ options, selected, onSelect }: OptionsListProps) => (
  <vstack>
    {options.map((item, index) => (
      <Button
        label={item.option}
        background={index === selected ? '#D93A00' : item.background}
        textColor={index === selected ? 'white' : item.text}
        onClick={() => onSelect(index, item.option)}
      />
    ))}
  </vstack>
);

export default OptionsList;
  