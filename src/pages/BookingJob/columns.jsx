import { Typography, Tooltip, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

export const column = (user, work, onDelete) => [
  {
    key: "name",
    title: "Tên người thuê",
    dataIndex: "maNguoiThue",
    render: (value) => {
      if (!value) return;
      const item = user.find((a) => a.id === value);
      return item?.name;
    },
  },
  {
    key: "job",
    title: "Công việc",
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
    title: "Ngày thuê",
    dataIndex: "ngayThue",
    align: "center",
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
