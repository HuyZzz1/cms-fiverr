import { Layout, Menu, Avatar, Dropdown } from "antd";
import { useEffect, useState, useRef } from "react";
import {
  UserAddOutlined,
  SnippetsOutlined,
  UserOutlined,
  FileSyncOutlined,
  DeploymentUnitOutlined,
} from "@ant-design/icons";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAdmin } from "../../redux/appSlice";
import { ShowSuccess } from "../Message";
import { apiGetInfoDetailAdmin } from "../../services/request/api";
import Cookie from "js-cookie";
import Loading from "../Loading";
import Info from "./Modal/Info";
import { StyledContent } from "./styled";

const { Header, Sider } = Layout;

const Admin = () => {
  const location = useLocation();
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(location.pathname);
  const [activeKey, setActiveKey] = useState(location.pathname);
  const admin = useSelector((state) => state.app.admin);
  const [isLoading, setIsLoading] = useState(true);
  const infoRef = useRef();

  const handleLogOut = () => {
    navigation("/admin/sign-in");
    Cookie.remove("ACCESS_TOKEN_ADMIN");
    Cookie.remove("ID_ADMIN");
    dispatch(setAdmin({}));
    ShowSuccess("Logout successful");
  };

  const getUser = async () => {
    try {
      const data = await apiGetInfoDetailAdmin(Cookie.get("ID_ADMIN"));
      dispatch(setAdmin(data?.content));
      setIsLoading(false);
    } catch (err) {
      navigation("/admin/sign-in");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Info ref={infoRef} />
      <Layout
        style={{
          minHeight: "100vh",
          overflow: "hidden",
        }}
      >
        <Header
          style={{
            padding: "0 15px",
            background:
              "linear-gradient(-225deg, #5d9fff 0%, #b8dcff 48%, #6bbbff 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <p style={{ fontSize: 30, color: "white", letterSpacing: "5px" }}>
              Fiverr
            </p>
          </div>
          <Dropdown
            menu={{
              items: [
                {
                  key: 1,
                  label: (
                    <p onClick={() => infoRef.current.open()}>
                      Account Information
                    </p>
                  ),
                },
                {
                  key: 2,
                  label: (
                    <p style={{ color: "red" }} onClick={handleLogOut}>
                      Log Out
                    </p>
                  ),
                },
              ],
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                cursor: "pointer",
              }}
            >
              {" "}
              <p style={{ fontWeight: 500, color: "white" }}>{admin?.name}</p>
              <Avatar size={45} icon={<UserOutlined />} />
            </div>
          </Dropdown>
        </Header>
        <Layout>
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            collapsedWidth={70}
            width={230}
          >
            <Menu
              theme="dark"
              selectedKeys={[activeKey]}
              onClick={(item) => {
                navigation(item.key);
                setActiveKey(item.key);
              }}
              mode="inline"
              items={[
                {
                  key: "/",
                  icon: <UserAddOutlined style={{ fontSize: 20 }} />,
                  label: "User Management",
                },
                {
                  key: "/admin/job-management",
                  icon: <FileSyncOutlined style={{ fontSize: 20 }} />,
                  label: "Job Management",
                },
                {
                  key: "/admin/job-type-management",
                  icon: <DeploymentUnitOutlined style={{ fontSize: 20 }} />,
                  label: "Job Type Management",
                },
                {
                  key: "/admin/service-management",
                  icon: <SnippetsOutlined style={{ fontSize: 20 }} />,
                  label: "Service Management",
                },
              ]}
            />
          </Sider>
          <StyledContent>
            <Outlet />
          </StyledContent>
        </Layout>
      </Layout>
    </>
  );
};
export default Admin;
