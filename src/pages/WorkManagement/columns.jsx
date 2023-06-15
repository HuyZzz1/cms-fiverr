import { Typography, Tooltip, Button, Image } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

export const column = (onDelete) => [
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
    render: (value) => (
      <Typography.Paragraph
        ellipsis={{
          tooltip: {
            overlayInnerStyle: { whiteSpace: "pre-line" },
          },
          rows: 2,
        }}
        style={{ margin: 0 }}
      >
        {value}
      </Typography.Paragraph>
    ),
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
    render: (value) => (
      <Typography.Paragraph
        ellipsis={{
          tooltip: {
            overlayInnerStyle: { whiteSpace: "pre-line" },
          },
          rows: 2,
        }}
        style={{ margin: 0 }}
      >
        {value}
      </Typography.Paragraph>
    ),
  },
  {
    key: "shortDescription",
    title: "Mô tả ngắn",
    dataIndex: "moTaNgan",
    render: (value) => (
      <Typography.Paragraph
        ellipsis={{
          tooltip: {
            overlayInnerStyle: { whiteSpace: "pre-line" },
          },
          rows: 3,
        }}
        style={{ margin: 0 }}
      >
        {value}
      </Typography.Paragraph>
    ),
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
      );
    },
  },
];
