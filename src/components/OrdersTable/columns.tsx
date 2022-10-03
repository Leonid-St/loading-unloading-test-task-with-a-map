import { IOrder } from '../../interfaces/IOrder';
import { LOAD_POINTS, UNLOAD_POINTS } from '../../store/orders/mock.data';
import { InColumnSelect } from './InColumnSelect';
import { IChangePointPayload } from '../../interfaces/IChangePointPayload';

export const Columns = (changePoint: (changePointData: IChangePointPayload) => void) => [
  {
    title: 'Имя заказа',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Загрузка',
    dataIndex: 'loadPoint',
    key: 'loadPoint',
    render: (loadPoint: number, record: IOrder) => (
      <InColumnSelect
        value={loadPoint}
        onChange={(value) =>
          changePoint({
            pointId: value,
            recordId: record.id,
            type: 'loadPoint',
          })
        }
        items={LOAD_POINTS}
      />
    ),
  },
  {
    title: 'Выгрузка',
    dataIndex: 'unloadPoint',
    key: 'unloadPoint',
    render: (unloadPoint: number, record: IOrder) => (
      <InColumnSelect
        value={unloadPoint}
        onChange={(value) =>
          changePoint({
            pointId: value,
            recordId: record.id,
            type: 'unloadPoint',
          })
        }
        items={UNLOAD_POINTS}
      />
    ),
  },
];
