export const CombinedCellRenderer = (props: any) => {
  const { data } = props;
  return (
    <div className="flex items-center">
      <img
        src={data.Poster}
        alt={data.Title}
        className="w-10 h-10 mr-2 object-cover"
      />
      <span>{data.Title}</span>
    </div>
  );
};