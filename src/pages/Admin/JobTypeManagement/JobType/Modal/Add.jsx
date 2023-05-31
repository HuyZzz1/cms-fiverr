import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Form, Input, Row, Col, Space, Button } from "antd";
import { formValidate } from "../../../../../services/helper";
import { apiCreateJobsType } from "../../../../../services/request/api";
import { StyledModal } from "./styled";
import { ShowSuccess, ShowError } from "../../../../../components/Message";
const Add = ({ getListJobType }, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useImperativeHandle(ref, () => ({
    open: () => {
      setIsModalOpen(true);
    },
  }));

  const onFinish = async (values) => {
    try {
      await apiCreateJobsType(values);
      ShowSuccess("Thêm loại công việc thành công");
      getListJobType();
      handleCancel();
    } catch (error) {
      ShowError(error?.response?.data?.content);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <>
      <StyledModal
        open={isModalOpen}
        onCancel={handleCancel}
        width="50%"
        footer={null}
        destroyOnClose
        title={<h3>Thêm loại công việc</h3>}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Row gutter={20}>
            <Col span={24}>
              <Form.Item
                label="Loại công việc"
                name="tenLoaiCongViec"
                rules={[formValidate.required]}
              >
                <Input placeholder="Nhập loại công việc" />
              </Form.Item>
            </Col>
            <Col span={24} style={{ textAlign: "center" }}>
              <Space>
                <Button type="primary" htmlType="submit" style={{ width: 100 }}>
                  Thêm
                </Button>
                <Button onClick={handleCancel} style={{ width: 100 }}>
                  {" "}
                  Đóng
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </StyledModal>
    </>
  );
};

export default forwardRef(Add);
