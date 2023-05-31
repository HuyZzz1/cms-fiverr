import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Form, Input, Row, Col, Space, Button } from "antd";
import { formValidate } from "../../../../services/helper";
import { apiCreateUsers } from "../../../../services/request/api";
import { ShowSuccess, ShowError } from "../../../../components/Message";
import { StyledModal } from "./styled";
import UploadComponent from "../../../../components/Upload";

const Add = ({ getListWork }, ref) => {
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
      getListWork();
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
        title={<h3>Thêm công việc</h3>}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Row gutter={20}>
            <Col span={24} style={{ textAlign: "center" }}>
              <Form.Item
                label="Hình ảnh"
                name="hinhAnh"
                rules={[formValidate.required]}
              >
                <UploadComponent
                  onFileChange={(file) => form.setFieldValue("hinhAnh", file)}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Tên công việc"
                rules={[formValidate.required]}
                name="tenCongViec"
              >
                <Input placeholder="Nhập tên công việc" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Giá tiền"
                rules={[formValidate.required]}
                name="giaTien"
              >
                <Input placeholder="Nhập giá tiền" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Đánh giá sao"
                rules={[formValidate.required]}
                name="password"
              >
                <Input placeholder="Nhập số đánh giá sao" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Mô tả" name="moTa">
                <Input.TextArea rows={4} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Mô tả ngắn" name="moTaNgan">
                <Input.TextArea rows={4} />
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
