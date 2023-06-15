import React, { useState } from "react";
import Navigation from "./Navigation";
import { Card } from "antd";
import JobType from "./JobType";

const View = () => {
  const [tab, setTab] = useState("1");

  return (
    <>
      <Card
        style={{ borderRadius: 0 }}
        bodyStyle={{
          display: "flex",
          alignItems: "center",
          padding: "10px 25px 0",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <h2>Quản lí loại công việc</h2>
          <Navigation tab={tab} setTab={setTab} />
        </div>
      </Card>
      <div style={{ padding: 12 }}>
        <Card bodyStyle={{ padding: 15 }}> {tab === "1" && <JobType />}</Card>
      </div>
    </>
  );
};

export default View;
