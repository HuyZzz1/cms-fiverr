import { Tag, Tooltip, Button, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

export const column = (onEdit, onDelete) => [
  {
    key: "name",
    title: "Tên",
    dataIndex: "name",
    fixed: "left",
  },
  {
    key: "email",
    title: "Email",
    dataIndex: "email",
  },
  {
    key: "phone",
    title: "Số điện thoại",
    dataIndex: "phone",
  },
  {
    key: "gender",
    title: "Giới tính",
    dataIndex: "gender",
    align: "center",
    width: 100,
    render: (value) =>
      value ? <Tag color="green">Male</Tag> : <Tag color="orange">Female</Tag>,
  },
  {
    key: "certification",
    title: "Chứng nhận",
    dataIndex: "certification",
  },
  {
    key: "skill",
    title: "Kĩ năng",
    dataIndex: "skill",
  },
  {
    key: "role",
    title: "Loại người dùng",
    dataIndex: "role",
    align: "center",
    render: (value) => {
      return value === "USER" ? (
        <Tag color="green">{value}</Tag>
      ) : (
        <Tag color="blue">{value}</Tag>
      );
    },
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
              onClick={() => onDelete(item?.id)}
            >
              <DeleteOutlined style={{ fontSize: "14px", color: "red" }} />
            </Button>
          </Tooltip>
        </Space>
      );
    },
  },
];
