import React from "react";
import { Table, Input, Button, Dropdown, Menu, Select } from "antd";
import { ColumnsType } from "antd/es/table/interface";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import { AnyObject } from "antd/es/_util/type";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

interface ReusableTableProps {
  columns: ColumnsType<AnyObject>;
  data: AnyObject[];
  loading?: boolean;
  border?: boolean;
  searchTerm?: string;
  setPagination?: (pagination: { page: number; pageSize: number }) => void;
  pagination?: { page: number; pageSize: number };
  setSearchTerm?: (term: string) => void;
  selectedRowKeys?: React.Key[];
  setSelectedRowKeys?: (selectedRowKeys: React.Key[]) => void;
}

const ReusableTable: React.FC<ReusableTableProps> = ({
  columns,
  data,
  loading = false,
  border = true,
  selectedRowKeys = [],
  setSelectedRowKeys,
  setSearchTerm,
  pagination = { page: 1, pageSize: 10 },
  setPagination,
}) => {
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    if (setSelectedRowKeys) {
      setSelectedRowKeys(newSelectedRowKeys);
    }
  };

  const getSelectedData = () => {
    return data.filter((item) => selectedRowKeys.includes(item.id));
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableData = getSelectedData().length ? getSelectedData() : data;
    const tableHeaders = columns.map((col) => col.title as string);
    const tableRows = tableData.map((row) =>
      columns.map((col) => {
        if ("dataIndex" in col) {
          return row[col.dataIndex as string];
        }
        return null;
      })
    );
    autoTable(doc, { head: [tableHeaders], body: tableRows });
    doc.save("table-data.pdf");
  };

  const exportToExcel = () => {
    const tableData = getSelectedData().length ? getSelectedData() : data;
    const worksheet = XLSX.utils.json_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "table-data.xlsx");
  };

  const printTable = () => {
    const printContent = document.getElementById("table-container")?.innerHTML;
    const newWindow = window.open("", "", "width=800,height=600");
    newWindow?.document.write(printContent || "");
    newWindow?.document.close();
    newWindow?.focus();
    newWindow?.print();
    newWindow?.close();
  };

  const exportMenu = (
    <Menu>
      <Menu.Item key="pdf" onClick={exportToPDF}>
        PDF
      </Menu.Item>
      <Menu.Item key="excel" onClick={exportToExcel}>
        Excel
      </Menu.Item>
      <Menu.Item key="print" onClick={printTable}>
        Print
      </Menu.Item>
    </Menu>
  );

  return (
    <div
      id="table-container"
      className="bg-white dark:bg-gray-900 shadow-md rounded-md h-full"
    >
      <div className="flex justify-between items-center p-2">
        <div className="flex gap-4 justify-start items-center">
          <p className="text-sm font-semibold">Search:</p>
          <Input
            addonBefore={<SearchOutlined />}
            onChange={(e) => setSearchTerm && setSearchTerm(e.target.value)}
            className="max-w-96"
          />
        </div>

        <div className="flex items-center gap-4 h-full">
          <Select
            value={pagination.pageSize}
            onChange={(value) =>
              setPagination && setPagination({ page: 1, pageSize: value })
            }
            className="w-[66px] h-full"
          >
            <Select.Option value={10}>10</Select.Option>
            <Select.Option value={25}>25</Select.Option>
            <Select.Option value={50}>50</Select.Option>
            <Select.Option value={100}>100</Select.Option>
          </Select>
          <Dropdown overlay={exportMenu} trigger={["click"]}>
            <Button type="primary">
              Export <DownOutlined />
            </Button>
          </Dropdown>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey={(record) => record.id || record.key}
        pagination={{
          current: pagination.page,
          pageSize: pagination.pageSize,
          onChange: (page, pageSize) =>
            setPagination && setPagination({ page, pageSize }),
        }}
        size="small"
        scroll={{ x: "max-content", y: 50 * 10 }}
        bordered={border}
        className="bg-white dark:bg-gray-900"
        rowSelection={
          setSelectedRowKeys
            ? {
                selectedRowKeys,
                onChange: onSelectChange,
              }
            : undefined
        }
      />
    </div>
  );
};

export default ReusableTable;
