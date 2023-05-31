import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Form, Input, Row, Col, Radio, Space, Button } from "antd";
import { formValidate } from "../../../../services/helper";
import { apiCreateUsers } from "../../../../services/request/api";
import { ShowSuccess, ShowError } from "../../../../components/Message";
import { StyledModal } from "./styled";

const Add = ({ getListUser }, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useImperativeHandle(ref, () => ({
    open: () => {
      setIsModalOpen(true);
    },
  }));

  const onFinish = async (values) => {
    try {
      await apiCreateUsers({ ...values, role: "ADMIN" });
      ShowSuccess("Thêm quản trị viên thành công");
      handleCancel();
      getListUser();
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
        title={<h3>Thêm quản trị viên</h3>}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Row gutter={20}>
            <Col span={24}>
              <Form.Item
                label="Tên"
                rules={[formValidate.required]}
                name="name"
              >
                <Input placeholder="Nhập tên" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Email"
                rules={[formValidate.required, formValidate.email]}
                name="email"
              >
                <Input placeholder="Nhập email" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Mật khẩu"
                rules={[formValidate.required]}
                name="password"
              >
                <Input.Password placeholder="Nhập mật khẩu" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Số điện thoại" name="phone">
                <Input placeholder="Nhập số điện thoại" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Giới tính"
                name="gender"
                rules={[formValidate.required]}
              >
                <Radio.Group>
                  <Radio value={true}>Male</Radio>
                  <Radio value={false}>Female</Radio>
                </Radio.Group>
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
