/* eslint-disable @typescript-eslint/no-explicit-any */
import * as XLSX from "xlsx";

const exportToExcel = (
  columns: any[],
  data: any[],
  selectedRowKeys?: React.Key[]
) => {
  const tableData = (
    selectedRowKeys?.length
      ? data.filter((d) => selectedRowKeys.includes(d.key))
      : data
  ).map((row) =>
    columns.reduce(
      (acc, col) => ({ ...acc, [col.title]: row[col.dataIndex] }),
      {}
    )
  );

  const worksheet = XLSX.utils.json_to_sheet(tableData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  XLSX.writeFile(workbook, "table_data.xlsx");
};

export default exportToExcel;
