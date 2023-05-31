import { Tooltip, Button, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

export const column = (onEdit, onDelete) => [
  {
    key: "id",
    title: "ID",
    dataIndex: "id",
    width: 100,
    align: "center",
  },
  {
    key: "jobType",
    title: "Tên loại công việc",
    dataIndex: "tenLoaiCongViec",
  },
  {
    title: "",
    width: 100,
    align: "center",
    render: (item) => {
      return (
        <Space>
          <Tooltip title="Chỉnh sửa">
            <Button
              size="small"
              type="primary"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => onEdit(item)}
            >
              <EditOutlined style={{ fontSize: "14px" }} />
            </Button>
          </Tooltip>
          <Tooltip title="Xoá">
            <Button
              size="small"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => onDelete(item.id)}
            >
              <DeleteOutlined style={{ fontSize: "14px", color: "red" }} />
            </Button>
          </Tooltip>
        </Space>
      );
    },
  },
];
