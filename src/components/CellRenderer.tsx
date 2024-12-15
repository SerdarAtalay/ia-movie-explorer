import { ICellRendererParams } from 'ag-grid-community';
import { Movie } from '../services/api';

export const CombinedCellRenderer = (props: ICellRendererParams<Movie>) => {
  const { data } = props;
  if (!data) return null;

  return (
    <div className="flex items-center gap-4">
      <img
        src={data.Poster}
        alt={data.Title}
        className="w-10 h-10 object-cover rounded"
        onError={(e) => {
          e.currentTarget.src = 'https://via.placeholder.com/48x64?text=No+Image';
        }}
      />
      <span className="font-medium">{data.Title}</span>
    </div>
  );
};