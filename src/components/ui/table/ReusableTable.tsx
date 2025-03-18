/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Table, Input, Button, Dropdown, Menu, Select } from "antd";
import { ColumnsType, TableRowSelection } from "antd/es/table/interface";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import { AnyObject } from "antd/es/_util/type";

interface ReusableTableProps {
  columns: ColumnsType<AnyObject>;
  data: any[];
  loading?: boolean;
  border?: boolean;
  searchTerm?: string;
  setPagination?: (pagination: any) => void;
  pagination?: { page: number; pageSize: number };
  setSearchTerm?: (term: string) => void;
}

const ReusableTable: React.FC<ReusableTableProps> = ({
  columns,
  data,
  loading = false,
  border = true,
  setSearchTerm,
  pagination = { page: 1, pageSize: 10 },
  setPagination,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

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
            onChange={(e) => setSearchTerm && setSearchTerm(e.target.value)}
            className="max-w-96"
          />
        </div>

        <div className="flex items-center gap-4 h-full">
          {/* Page Size Selector */}
          <Select
            defaultValue={pagination.pageSize}
            onChange={(value) =>
              setPagination && setPagination({ page: 1, pageSize: value })
            }
            className="w-16 h-full"
          >
            <Select.Option value={10}>10</Select.Option>
            <Select.Option value={25}>25</Select.Option>
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
        dataSource={data}
        loading={loading}
        rowKey={(record) => record.key}
        pagination={{ pageSize: pagination?.pageSize }}
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
