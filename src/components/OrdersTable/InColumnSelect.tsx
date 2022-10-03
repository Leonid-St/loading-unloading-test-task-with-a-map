import { Select } from 'antd';
import { FC } from 'react';
import { IOrderPoint } from '../../interfaces/IOrderPoint';

const { Option } = Select;

type Props = {
  value: number;
  onChange: (value: number) => void;
  items: IOrderPoint[];
};
export const InColumnSelect: FC<Props> = ({ value, onChange, items }) => {
  return (
    <Select defaultValue={value} className="column-select" onChange={(value) => onChange(+value)}>
      {items.map((point: IOrderPoint) => (
        <Option key={point.id} value={point.id}>
          {point.title}
        </Option>
      ))}
    </Select>
  );
};
