import { Typography, Tooltip, Button, Image } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

export const column = (onDelete) => [
  {
    key: "image",
    title: "Image",
    dataIndex: "hinhAnh",
    render: (imageUrl) => <Image width={80} height={45} src={imageUrl} />,
    width: 150,
    fixed: "left",
  },
  {
    key: "name",
    title: "Name",
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
    title: "Price",
    dataIndex: "giaTien",
    align: "center",
    width: 120,
    render: (value) => `${value}$`,
  },
  {
    key: "description",
    title: "Description",
    dataIndex: "moTa",
    render: (value) => (
      <Typography.Paragraph
        ellipsis={{
          tooltip: {
            overlayInnerStyle: { whiteSpace: "pre-line" },
            overlayClassName: "styled-tooltip",
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
    title: "Short description",
    dataIndex: "moTaNgan",
    render: (value) => (
      <Typography.Paragraph
        ellipsis={{
          tooltip: {
            overlayInnerStyle: { whiteSpace: "pre-line" },
            overlayClassName: "styled-tooltip",
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
    key: "evaluate",
    title: "Evaluate",
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
        <Tooltip title="Delete">
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
