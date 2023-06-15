import React, { useState, useEffect, useRef } from "react";
import { Table, Form, Row, Col, Input, Button } from "antd";
import { Wrapper } from "./styled";
import { SearchOutlined } from "@ant-design/icons";
import { column } from "./column";
import Add from "./Modal/Add";
import Edit from "./Modal/Edit";
import Swal from "sweetalert2";
import { useDebouncedCallback } from "use-debounce";
import {
  apiDeleteJobsType,
  apiGetJobsTypeList,
} from "../../../services/request/api";
import { ShowError, ShowSuccess } from "../../../components/Message";
import useWindowDimensions from "../../../services/hooks/useWindowDimensions";

const JobType = () => {
  const [data, setData] = useState([]);
  const [loading, isLoading] = useState(false);
  const addRef = useRef();
  const editRef = useRef();
  const { height, width } = useWindowDimensions();

  const onEdit = (item) => editRef.current.open(item);

  const getListJobType = async (value) => {
    isLoading(true);
    const data = await apiGetJobsTypeList(value);
    setData(data?.content);
    isLoading(false);
  };

  const onSearch = async (value) => {
    const newData = data.filter(
      (job) =>
        job.tenLoaiCongViec.toUpperCase().indexOf(value.toUpperCase()) !== -1
    );
    setData(newData);
  };

  const onChangeKeyWord = useDebouncedCallback((e) => {
    const value = e.target.value;
    if (value) {
      onSearch(value);
    } else {
      getListJobType();
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
          await apiDeleteJobsType(id);
          getListJobType();
          ShowSuccess("Xoá thành công");
        } catch (error) {
          ShowError(error?.response?.data?.content);
        }
      }
    });
  };

  useEffect(() => {
    getListJobType();
  }, []);

  return (
    <>
      <Add ref={addRef} getListJobType={getListJobType} />
      <Edit ref={editRef} getListJobType={getListJobType} />
      <Wrapper>
        <div style={{ width: "100%" }}>
          <Form layout="inline">
            <Row style={{ width: "100%" }}>
              <Col xs={24} md={16} lg={10} xxl={6}>
                <Form.Item className="no-margin">
                  <Input
                    placeholder="Nhập tên loại công việc để tìm kiếm"
                    suffix={<SearchOutlined />}
                    allowClear
                    onChange={onChangeKeyWord}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
        <div>
          <Button type="primary" onClick={() => addRef.current.open()}>
            Thêm loại công việc
          </Button>
        </div>
      </Wrapper>

      <div>
        <Table
          size="small"
          columns={column(onEdit, onDelete)}
          dataSource={data}
          loading={loading}
          pagination={{
            pageSize: 25,
            position: ["bottomCenter"],
          }}
          scroll={
            width > 1600
              ? { y: height - 360, x: 1280 }
              : {
                  x: 1400,
                }
          }
        />
      </div>
    </>
  );
};

export default JobType;
