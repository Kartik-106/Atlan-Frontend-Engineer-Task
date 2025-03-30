import { TableRowData } from "../types/queryTypes";

interface TableRowProps {
  row: TableRowData;
}

const TableRow: React.FC<TableRowProps> = ({ row }) => (
  <tr>
    {Object.values(row).map((value, i) => (
      <td key={i}>{value}</td>
    ))}
  </tr>
);

export default TableRow;
