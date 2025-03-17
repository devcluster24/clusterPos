/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { JSX } from "react";
import { Table, Input, Button, Dropdown, Menu, Select } from "antd";
import { TableRowSelection } from "antd/es/table/interface";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";

interface TableColumn {
  title: string;
  dataIndex: string;
  key?: string;
  render?: () => JSX.Element;
}

interface ReusableTableProps {
  columns: TableColumn[];
  data: any[];
  loading?: boolean;
  border?: boolean;
}

const ReusableTable: React.FC<ReusableTableProps> = ({
  columns,
  data,
  loading = false,
  border = true,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [searchText, setSearchText] = useState("");
  const [pageSize, setPageSize] = useState(50);

  // Filtered Data
  const filteredData = data.filter((item) =>
    Object.values(item).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const rowSelection: TableRowSelection<any> = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
  };

  // Export Options
  const exportMenu = (
    <Menu>
      <Menu.Item key="pdf">PDF</Menu.Item>
      <Menu.Item key="excel">Excel</Menu.Item>
      <Menu.Item key="print">Print</Menu.Item>
    </Menu>
  );

  return (
    <div className=" bg-white dark:bg-gray-900 shadow-md rounded-md h-full">
      {/* Top Controls */}
      <div className="flex justify-between items-center p-2">
        {/* Search Input */}
        <div className="flex gap-4 justify-start items-center">
          <p className="text-sm font-semibold">Search:</p>

          <Input
            addonBefore={<SearchOutlined />}
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="max-w-96"
          />
        </div>

        <div className="flex items-center gap-4 h-full">
          {/* Page Size Selector */}
          <Select
            defaultValue={50}
            onChange={(value) => setPageSize(value)}
            className="w-16 h-full"
          >
            <Select.Option value={20}>20</Select.Option>
            <Select.Option value={50}>50</Select.Option>
            <Select.Option value={100}>100</Select.Option>
          </Select>

          {/* Export Button */}
          <Dropdown overlay={exportMenu} trigger={["click"]}>
            <Button type="primary">
              Export <DownOutlined />
            </Button>
          </Dropdown>
        </div>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        dataSource={filteredData}
        loading={loading}
        rowKey={(record) => record.key}
        pagination={{ pageSize }}
        size="small"
        rowSelection={rowSelection}
        scroll={{ x: "max-content", y: 50 * 10 }}
        bordered={border}
        className="bg-white dark:bg-gray-900"
      />
    </div>
  );
};

export default ReusableTable;
