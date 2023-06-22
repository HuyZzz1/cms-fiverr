import React, { useEffect, useState, useRef } from "react";
import { Card, Form, Input, Button, Table, Row, Col } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { column } from "./columns";
import { useDebouncedCallback } from "use-debounce";
import Swal from "sweetalert2";
import { Wrapper } from "./styled";
import AddAdmin from "./Modal/AddAdmin";
import Edit from "./Modal/Edit";
import {
  apiDeleteUser,
  apiGetUsersList,
  apiSearchUser,
} from "../../services/request/api";
import { ShowError, ShowSuccess } from "../../components/Message";
import useWindowDimensions from "../../services/hooks/useWindowDimensions";

const UserManagement = () => {
  const [data, setData] = useState([]);
  const [loading, isLoading] = useState(false);
  const addAdminRef = useRef();
  const editRef = useRef();
  const { height, width } = useWindowDimensions();

  const onEdit = (item) => editRef.current.open(item);

  const getListUser = async (value) => {
    if (!value) {
      isLoading(true);
      const data = await apiGetUsersList();
      setData(data?.content);
      isLoading(false);
    }

    if (value) {
      isLoading(true);
      const data = await apiSearchUser(value);
      setData(data?.content);
      isLoading(false);
    }
  };

  const onSearch = async (value) => {
    getListUser(value);
  };

  const onChangeKeyWord = useDebouncedCallback((e) => {
    const value = e.target.value;
    onSearch(value);
  }, 1000);

  const onDelete = (id) => {
    Swal.fire({
      icon: "warning",
      text: "Do you want to delete this data?",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      showCancelButton: true,
      confirmButtonColor: "#1677ff",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await apiDeleteUser(id);
          getListUser();
          ShowSuccess("Delete successfully");
        } catch (error) {
          ShowError(error?.response?.data?.content);
        }
      }
    });
  };

  useEffect(() => {
    getListUser();
  }, []);

  return (
    <>
      <AddAdmin ref={addAdminRef} getListUser={getListUser} />
      <Edit ref={editRef} getListUser={getListUser} />
      <Card bodyStyle={{ padding: "10px 25px" }}>
        <h2>User Management</h2>
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
                        placeholder="Enter username to search"
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
              <Button type="primary" onClick={() => addAdminRef.current.open()}>
                Add administrators
              </Button>
            </div>
          </Wrapper>

          <Table
            size="small"
            columns={column(onEdit, onDelete)}
            dataSource={data}
            pagination={{
              pageSize: 25,
              position: ["bottomCenter"],
            }}
            loading={loading}
            scroll={
              width > 1600
                ? { y: height - 320, x: 1280 }
                : {
                    x: 1400,
                  }
            }
          />
        </Card>
      </div>
    </>
  );
};

export default UserManagement;
