import { Typography, Tooltip, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

export const column = (user, work, onDelete) => [
  {
    key: "name",
    title: "Tenant's name",
    dataIndex: "maNguoiThue",
    render: (value) => {
      if (!value) return;
      const item = user.find((a) => a.id === value);
      return item?.name;
    },
  },
  {
    key: "job",
    title: "Job",
    dataIndex: "maCongViec",
    render: (value) => {
      if (!value) return;
      const item = work.find((a) => a.id === value);
      return (
        <Typography.Paragraph
          ellipsis={{
            tooltip: {
              overlayInnerStyle: { whiteSpace: "pre-line" },
            },
            rows: 2,
          }}
          style={{ margin: 0 }}
        >
          {item?.tenCongViec}
        </Typography.Paragraph>
      );
    },
  },
  {
    key: "time",
    title: "Date of hire",
    dataIndex: "ngayThue",
    align: "center",
  },

  {
    title: "",
    width: 60,
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
