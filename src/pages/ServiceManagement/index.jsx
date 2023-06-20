import React, { useEffect, useState } from "react";
import { Card, Table } from "antd";
import { column } from "./columns";
import Swal from "sweetalert2";
import { ShowError, ShowSuccess } from "../../components/Message";
import {
  apiDeleteBookingJob,
  apiGetBookingJobsList,
  apiGetJobsList,
  apiGetUsersList,
} from "../../services/request/api";
import useWindowDimensions from "../../services/hooks/useWindowDimensions";

const ServiceManagement = () => {
  const [data, setData] = useState([]);
  const [loading, isLoading] = useState(false);
  const [user, setUser] = useState([]);
  const [work, setWork] = useState([]);
  const { height, width } = useWindowDimensions();

  const getListBookingJob = async (value) => {
    isLoading(true);
    const data = await apiGetBookingJobsList(value);
    setData(data?.content);
    isLoading(false);
  };

  const getListUser = async () => {
    const data = await apiGetUsersList();
    setUser(data?.content.filter((a) => a.role === "USER"));
  };

  const getListWork = async (value) => {
    const data = await apiGetJobsList(value);
    setWork(data?.content);
  };

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
          await apiDeleteBookingJob(id);
          getListBookingJob();
          ShowSuccess("Delete successfully");
        } catch (error) {
          ShowError(error?.response?.data?.content);
        }
      }
    });
  };

  useEffect(() => {
    getListBookingJob();
  }, []);

  useEffect(() => {
    getListUser();
    getListWork();
  }, []);

  return (
    <>
      <Card bodyStyle={{ padding: "10px 25px" }}>
        <h2>Service Management</h2>
      </Card>
      <div style={{ padding: 10 }}>
        <Card bodyStyle={{ padding: 15 }}>
          <Table
            size="small"
            columns={column(user, work, onDelete)}
            dataSource={data}
            pagination={{
              pageSize: 25,
              position: ["bottomCenter"],
            }}
            loading={loading}
            scroll={
              width > 1600
                ? { y: height - 250, x: 1280 }
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

export default ServiceManagement;
