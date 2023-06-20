import React from "react";
import { BookOutlined, FileSearchOutlined } from "@ant-design/icons";
import { StyledTabs } from "./styled";

const Navigation = ({ tab, setTab }) => {
  return (
    <StyledTabs
      activeKey={tab}
      className="styled-tabs"
      onChange={(key) => {
        setTab(key);
      }}
      items={[
        {
          key: "1",
          label: (
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <BookOutlined style={{ fontSize: 17 }} />
              Job Type
            </div>
          ),
        },
        {
          key: "2",
          label: (
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <FileSearchOutlined style={{ fontSize: 17 }} />
              Details Job Type
            </div>
          ),
        },
      ]}
    />
  );
};

export default Navigation;
