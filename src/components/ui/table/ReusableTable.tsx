import React from "react";
import { Table, Input, Button, Dropdown, Menu } from "antd";
import { ColumnsType } from "antd/es/table/interface";
import { SearchOutlined } from "@ant-design/icons";
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
  setPagination?: (pagination: {
    page?: number;
    pageSize?: number;
    sortBy?: string;
    sortOrder?: string;
  }) => void;
  pagination?: { page: number; pageSize: number };
  sortsBy?: { value: string; label: string }[];
  sortsOrder?: { value: string; label: string }[];
  limits?: { value: string; label: string }[];
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
  pagination = { page: 1, pageSize: 10, sortBy: "", sortOrder: "" },
  setPagination,
  limits = [
    { value: 10, label: "10 / page" },
    { value: 25, label: "25 / page" },
    { value: 50, label: "50 / page" },
    { value: 100, label: "100 / page" },
  ],
  sortsBy,
  sortsOrder = [
    { value: "asc", label: "Ascending" },
    { value: "desc", label: "Descending" },
  ],
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

        <div className="flex items-center gap-1 h-full">
          {/*================= pagination =====================*/}
          <Dropdown
            overlay={
              <Menu
                onClick={({ key }) =>
                  setPagination &&
                  setPagination({ page: 1, pageSize: Number(key) })
                }
              >
                {limits.map((limit) => (
                  <Menu.Item
                    key={limit.value}
                    className={
                      "pageSize" in pagination &&
                      pagination.pageSize === limit.value
                        ? "bg-blue-100 font-semibold text-blue-700"
                        : ""
                    }
                  >
                    {limit.label}
                  </Menu.Item>
                ))}
              </Menu>
            }
            trigger={["click"]}
          >
            <Button className="h-full" type="default">
              Page
            </Button>
          </Dropdown>

          {/* ============ sort =========== */}
          {sortsBy && (
            <Dropdown
              overlay={
                <Menu
                  onClick={({ key }) => {
                    const selected = sortsBy.find((item) => item.value === key);
                    if (selected && setPagination) {
                      setPagination({
                        ...pagination,
                        sortBy: selected.value,
                      });
                    }
                  }}
                >
                  {sortsBy.map((sort) => (
                    <Menu.Item
                      key={sort.value}
                      className={
                        "sortBy" in pagination &&
                        pagination.sortBy === sort.value
                          ? "bg-blue-100 font-semibold text-blue-700"
                          : ""
                      }
                    >
                      {sort.label}
                    </Menu.Item>
                  ))}
                </Menu>
              }
              trigger={["click"]}
            >
              <Button className="h-full" type="default">
                Sort
              </Button>
            </Dropdown>
          )}

          {/* ========== order  ======= */}
          {sortsOrder && (
            <Dropdown
              overlay={
                <Menu
                  onClick={({ key }) => {
                    const selected = sortsOrder.find(
                      (item) => item.value === key
                    );
                    if (selected && setPagination) {
                      setPagination({
                        ...pagination,
                        sortOrder: selected.value,
                      });
                    }
                  }}
                >
                  {sortsOrder.map((order) => (
                    <Menu.Item
                      key={order.value}
                      className={
                        "sortOrder" in pagination &&
                        pagination.sortOrder === order.value
                          ? "bg-blue-100 font-semibold text-blue-700 "
                          : ""
                      }
                    >
                      {order.label}
                    </Menu.Item>
                  ))}
                </Menu>
              }
              trigger={["click"]}
            >
              <Button className="h-full" type="default">
                Order
              </Button>
            </Dropdown>
          )}

          {/*================ export ====================*/}
          <Dropdown overlay={exportMenu} trigger={["click"]}>
            <Button type="primary">Export</Button>
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
