import Loadable, { OptionsWithoutRender } from 'react-loadable';
import { Spinner } from './Spinner';
import { DataGridProps } from './DataGrid';

const loadableOptions: OptionsWithoutRender<DataGridProps> = {
  loader: () => import('./DataGrid'),
  loading: Spinner,
}

export const DataGridLoadable = Loadable(loadableOptions);
