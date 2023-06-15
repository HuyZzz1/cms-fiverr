import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Form, Input, Row, Col, Space, Button } from "antd";
import { StyledModal } from "./styled";
import { apiCreateJobsType } from "../../../../services/request/api";
import { ShowError, ShowSuccess } from "../../../../components/Message";
import { formValidate } from "../../../../services/helper";
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
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  style={{ width: 100 }}
                >
                  Thêm
                </Button>
                <Button
                  onClick={handleCancel}
                  size="large"
                  style={{ width: 100 }}
                >
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
