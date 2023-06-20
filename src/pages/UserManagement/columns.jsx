import { Tag, Tooltip, Button, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

export const column = (onEdit, onDelete) => [
  {
    key: "name",
    title: "Name",
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
    title: "Phone",
    dataIndex: "phone",
  },
  {
    key: "gender",
    title: "Gender",
    dataIndex: "gender",
    align: "center",
    width: 100,
    render: (value) =>
      value ? <Tag color="green">Male</Tag> : <Tag color="orange">Female</Tag>,
  },
  {
    key: "certification",
    title: "Certification",
    dataIndex: "certification",
  },
  {
    key: "skill",
    title: "Skill",
    dataIndex: "skill",
  },
  {
    key: "role",
    title: "Role",
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
          <Tooltip title="Edit">
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
