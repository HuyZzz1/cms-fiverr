import { Typography, Tooltip, Button, Space, Image } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
const { Text } = Typography;

export const column = (onEdit, onDelete) => [
  {
    key: "image",
    title: "Hình ảnh",
    dataIndex: "hinhAnh",
    render: (imageUrl) => <Image width={80} height={45} src={imageUrl} />,
    width: 150,
    fixed: "left",
  },
  {
    key: "name",
    title: "Tên",
    dataIndex: "tenCongViec",
    fixed: "left",
    render: (value) => <Text ellipsis={{ tooltip: value }}>{value}</Text>,
  },
  {
    key: "price",
    title: "Giá tiền",
    dataIndex: "giaTien",
    align: "center",
    width: 120,
    render: (value) => `${value}$`,
  },
  {
    key: "description",
    title: "Mô tả",
    dataIndex: "moTa",
    render: (value) => <Text ellipsis={{ tooltip: value }}>{value}</Text>,
  },
  {
    key: "shortDescription",
    title: "Mô tả ngắn",
    dataIndex: "moTaNgan",
    render: (value) => <Text ellipsis={{ tooltip: value }}>{value}</Text>,
  },
  {
    key: "evaluate",
    title: "Đánh giá",
    dataIndex: "danhGia",
    align: "center",
    width: 80,
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
