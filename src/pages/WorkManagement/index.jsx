import React, { useEffect, useState } from "react";
import { Card, Form, Input, Table, Row, Col } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { column } from "./columns";
import { useDebouncedCallback } from "use-debounce";
import Swal from "sweetalert2";
import { Wrapper } from "./styled";
import { apiDeleteJob, apiGetJobsList } from "../../services/request/api";
import { ShowError, ShowSuccess } from "../../components/Message";
import useWindowDimensions from "../../services/hooks/useWindowDimensions";

const WorkManagement = () => {
  const { height, width } = useWindowDimensions();
  const [data, setData] = useState([]);
  const [loading, isLoading] = useState(false);

  const getListWork = async (value) => {
    isLoading(true);
    const data = await apiGetJobsList(value);
    setData(data?.content);
    isLoading(false);
  };

  const onSearch = async (value) => {
    const newData = data.filter(
      (job) => job.tenCongViec.toUpperCase().indexOf(value.toUpperCase()) !== -1
    );
    setData(newData);
  };

  const onChangeKeyWord = useDebouncedCallback((e) => {
    const value = e.target.value;
    if (value) {
      onSearch(value);
    } else {
      getListWork();
    }
  }, 1000);

  const onDelete = (id) => {
    Swal.fire({
      icon: "warning",
      text: "Bạn muốn xoá dữ liệu này chứ?",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Không",
      showCancelButton: true,
      confirmButtonColor: "#1677ff",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await apiDeleteJob(id);
          getListWork();
          ShowSuccess("Xoá thành công");
        } catch (error) {
          ShowError(error?.response?.data?.content);
        }
      }
    });
  };

  useEffect(() => {
    getListWork();
  }, []);

  return (
    <>
      <Card bodyStyle={{ padding: "10px 25px" }}>
        <h2>Quản lí công việc</h2>
      </Card>
      <div style={{ padding: 10 }}>
        <Card bodyStyle={{ padding: 15 }}>
          <Wrapper>
            <div style={{ width: "100%" }}>
              <Form layout="inline">
                <Row style={{ width: "100%" }}>
                  <Col xs={24} md={16} lg={10} xxl={6}>
                    <Form.Item className="no-margin">
                      <Input
                        placeholder="Nhập tên công việc để tìm kiếm"
                        suffix={<SearchOutlined />}
                        allowClear
                        onChange={onChangeKeyWord}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </div>
          </Wrapper>

          <div>
            <Table
              size="small"
              columns={column(onDelete)}
              dataSource={data}
              pagination={{
                pageSize: 25,
                position: ["bottomCenter"],
              }}
              loading={loading}
              scroll={
                width > 1600
                  ? { y: height - 310, x: 1280 }
                  : {
                      x: 1400,
                    }
              }
            />
          </div>
        </Card>
      </div>
    </>
  );
};

export default WorkManagement;
