import React, { useState } from "react";
import { Card, Row, Col, Form, Input, Button } from "antd";
import { Wrapper, ContentLeft, ContentRight, StyledForm } from "./styled";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import { apiSignIn } from "../../services/request/api";
import { setAdmin } from "../../redux/appSlice";
import { ShowError, ShowSuccess } from "../../components/Message";
import { formValidate } from "../../services/helper";
import { Container } from "../../components/styled";

const SignIn = () => {
  const navigation = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      setIsLoading(true);
      const data = await apiSignIn({
        email: values.email,
        password: values.password,
      });

      if (data.content.user.role === "ADMIN") {
        Cookie.set("ACCESS_TOKEN_ADMIN", data?.content?.token);
        Cookie.set("ID_ADMIN", data?.content?.user?.id);
        dispatch(setAdmin(data?.content));
        navigation("/");
        ShowSuccess("Logged in successfully");
        setIsLoading(false);
        form.resetFields();
      } else {
        setIsLoading(false);
        ShowError("Account does not have access");
      }
    } catch (error) {
      setIsLoading(false);
      ShowError(error?.response?.data?.content);
    }
  };

  return (
    <Wrapper>
      <Container>
        <Card bodyStyle={{ padding: 0 }}>
          <Row>
            <Col lg={14} xs={0}>
              <ContentLeft>
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <h1
                    style={{
                      letterSpacing: 10,
                      color: "white",
                      fontSize: "60px",
                    }}
                  >
                    FIVERR
                  </h1>
                </div>
              </ContentLeft>
            </Col>
            <Col lg={10} md={24} style={{ flex: "1" }}>
              <ContentRight>
                <StyledForm layout="vertical" form={form} onFinish={onFinish}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                      marginBottom: "16px",
                    }}
                  >
                    <h1
                      style={{
                        fontSize: 30,
                        textTransform: "uppercase",
                        letterSpacing: 5,
                      }}
                    >
                      Login
                    </h1>
                  </div>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[formValidate.required, formValidate.email]}
                  >
                    <Input placeholder="Email" />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    label="Password"
                    rules={[formValidate.required]}
                  >
                    <Input.Password placeholder="Password" />
                  </Form.Item>
                  <Form.Item style={{ textAlign: "center", marginTop: 30 }}>
                    <Button
                      htmlType="submit"
                      type="primary"
                      size="large"
                      style={{ width: "100%" }}
                      disabled={isLoading}
                    >
                      <p>Login</p>
                    </Button>
                  </Form.Item>
                </StyledForm>
              </ContentRight>
            </Col>
          </Row>
        </Card>
      </Container>
    </Wrapper>
  );
};

export default SignIn;
