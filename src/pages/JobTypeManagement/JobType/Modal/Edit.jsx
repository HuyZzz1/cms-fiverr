import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Form, Input, Row, Col, Space, Button } from "antd";
import { StyledModal } from "./styled";
import { apiUpdateJobsType } from "../../../../services/request/api";
import { ShowError, ShowSuccess } from "../../../../components/Message";
import { formValidate } from "../../../../services/helper";

const Edit = ({ getListJobType }, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [item, setItem] = useState();

  useImperativeHandle(ref, () => ({
    open: (item) => {
      setItem(item);
      setIsModalOpen(true);
      form.setFieldValue("tenLoaiCongViec", item.tenLoaiCongViec);
    },
  }));

  const onFinish = async (values) => {
    try {
      await apiUpdateJobsType({ ...values, id: item.id });
      ShowSuccess("Chỉnh sửa thông tin thành công");
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
        title={<h3>Chỉnh sửa thông tin</h3>}
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
