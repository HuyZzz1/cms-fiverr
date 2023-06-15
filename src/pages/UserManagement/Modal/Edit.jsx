import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Form, Input, Row, Col, Radio, Space, Button } from "antd";
import { StyledModal } from "./styled";
import { apiUpdateUser } from "../../../services/request/api";
import { ShowError, ShowSuccess } from "../../../components/Message";
import { formValidate } from "../../../services/helper";

const Edit = ({ getListUser }, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [item, setItem] = useState();

  useImperativeHandle(ref, () => ({
    open: (item) => {
      setItem(item);
      setIsModalOpen(true);
      form.setFieldsValue({
        ...item,
        skill: item.skill ? item.skill[0] : null,
        certification: item.certification ? item.certification[0] : null,
      });
    },
  }));

  const onFinish = async (values) => {
    try {
      await apiUpdateUser({
        ...values,
        id: item?.id,
        role: item?.role,
        birthday: item?.birthday,
        skill: [values.skill],
        certification: [values.certification],
      });
      ShowSuccess("Chỉnh sửa thông tin thành công");
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
        width="40%"
        footer={null}
        destroyOnClose
        title={<h3>Chỉnh sửa thông tin</h3>}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Row gutter={20}>
            <Col span={24}>
              <Form.Item
                label="Email"
                rules={[formValidate.required]}
                name="email"
              >
                <Input placeholder="Nhập email" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Tên"
                rules={[formValidate.required]}
                name="name"
              >
                <Input placeholder="Nhập họ tên" />
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
                  <Radio value={true}>Nam</Radio>
                  <Radio value={false}>Nữ</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Kĩ năng" name="skill">
                <Input.TextArea rows={4} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Chứng nhận" name="certification">
                <Input.TextArea rows={4} />
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
                  Lưu
                </Button>
                <Button
                  onClick={handleCancel}
                  size="large"
                  style={{ width: 100 }}
                >
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

export default forwardRef(Edit);
