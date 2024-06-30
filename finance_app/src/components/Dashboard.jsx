import React, { useEffect, useState } from "react";
import {
  ConfigProvider,
  Layout,
  Menu,
  Typography,
  Button,
  Skeleton,
} from "antd";
import { jwtDecode } from "jwt-decode";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DashboardOutlined,
  BarChartOutlined,
  DollarOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, tokenStatus } from "../Redux/authSlice";
import { toast, Toaster } from "sonner";
import "./customStyles.css";

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tokenFromRedux = useSelector(tokenStatus);
  const decodedToken = jwtDecode(tokenFromRedux);
  const name = decodedToken.user.name;

  const [collapsed, setCollapsed] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState("1");
  const [loading, setLoading] = useState(true);
  const handlenavigae =()=>{
    navigate('/dashboard/landingpage')
  }

  useEffect(() => {
    toast.success(`Welcome, ${name}!`, {
      style: { padding: "15px 25px", border: "1px solid #4caf50" },
    });

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [name]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/interface");
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuClick = (e) => {
    setActiveMenuItem(e.key);
  };

  const theme = {
    token: {
      colorPrimary: "#1890ff",
      colorBgContainer: "#141414",
      colorBgLayout: "#000000",
      colorText: "#ffffff",
      colorTextSecondary: "#a6a6a6",
    },
    components: {
      Menu: {
        colorItemBg: "#001529",
        colorItemText: "#ffffff",
        colorItemTextSelected: "#1890ff",
        colorItemBgSelected: "#002140",
        colorItemTextHover: "#1890ff",
        colorItemBgHover: "#002140",
      },
      Layout: {
        colorBgHeader: "#001529",
        colorBgBody: "#31363F",
        colorBgTrigger: "#002140",
        colorTextTrigger: "#ffffff",
      },
      Input: {
        colorBgContainer: "#1f1f1f",
        colorText: "#ffffff",
        colorBorder: "#303030",
      },
      Button: {
        colorPrimary: "#1890ff",
        colorPrimaryHover: "#40a9ff",
      },
    },
  };

  const menuItems = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: <Link to="/dashboard/landingpage">Dashboard</Link>,
    },
    {
      key: "2",
      icon: <BarChartOutlined />,
      label: <Link to="/dashboard/income">Income</Link>,
    },
    {
      key: "3",
      icon: <DollarOutlined />,
      label: <Link to="/dashboard/expense">Expense</Link>,
    },
  ];

  return (
    <ConfigProvider theme={theme}>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          theme="dark"
          style={{ background: "#001529" }}
        >
          {!collapsed ? <div
            className="logo"
            onClick={handlenavigae}
            style={{
              height: 32,
              margin: 16,
              fontWeight:"bold",
              color:"white",
              display:"flex",
              justifyContent:"center",
              alignItems:"center",
              cursor:"pointer"
              
            }}
          >
            Wealth Journey
          </div> :<div
          onClick={handlenavigae} style={{
              height: 32,
              margin: 16,
              fontWeight:"bold",
              color:"white",
              display:"flex",
              justifyContent:"center",
              alignItems:"center",
              cursor:"hand"
            }}> 
            </div>}
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            selectedKeys={[activeMenuItem]}
            items={menuItems}
            onClick={handleMenuClick}
            style={{ background: "#001529" }}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: "#001529",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: toggleCollapsed,
                style: { color: "#fff", fontSize: "18px", padding: "0 24px" },
              }
            )}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginRight: "24px",
              }}
            >
              <Text style={{ color: "#ffffff", marginRight: "16px" }}>
                {name}
              </Text>
              <Button
                type="text"
                icon={<LogoutOutlined />}
                onClick={handleLogout}
                style={{ color: "#ffffff" }}
              >
                Logout
              </Button>
            </div>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: "#31363F",
            }}
          >
            {loading ? (
              <Skeleton
                active
                className="custom-skeleton"
                paragraph={{
                  rows: 10,
                }}
              />
            ) : (
              <Outlet />
            )}
          </Content>
        </Layout>
      </Layout>
      <Toaster richColors />
    </ConfigProvider>
  );
};

export default Dashboard;
