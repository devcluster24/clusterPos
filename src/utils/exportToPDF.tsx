/* eslint-disable @typescript-eslint/no-explicit-any */
import jsPDF from "jspdf";
import { autoTable } from "jspdf-autotable";

const exportToPDF = (
  columns: any[],
  data: any[],
  selectedRowKeys?: React.Key[]
) => {
  const doc = new jsPDF();

  doc.text("Exported Table Data", 14, 10);

  const tableColumn = columns.map((col) => col.title);
  const tableRows = (
    selectedRowKeys?.length
      ? data.filter((d) => selectedRowKeys.includes(d.key))
      : data
  ).map((row) => columns.map((col) => row[col.dataIndex]));

  autoTable(doc, { head: [tableColumn], body: tableRows });
  doc.save("table_data.pdf");
};

export default exportToPDF;
