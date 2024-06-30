import React from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Button, Typography } from "antd";
import "./Interface.css"; // Import CSS for styling

const { Header, Content } = Layout;
const { Title } = Typography;

const Interface = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Layout className="landing-page">
      <Header className="header">
        <div className="brand-name">Wealth Journey</div>
        <div className="nav-links">
          <Button type="link" onClick={() => handleNavigation("/signup")}>
            Signup
          </Button>
          <Button type="link" onClick={() => handleNavigation("/login")}>
            Login
          </Button>
        </div>
      </Header>
      <Content className="content">
        <div className="text-container">
          <Title level={1} className="title">
            <div className="financefreedom">Financial Freedom</div>
          </Title>
          <div className="keywords">
            <span>Freedom</span>
            <span>Stability</span>
            <span>Growth</span>
          </div>
          <Button
            type=""
            size="large"
            className="get-started-button"
            onClick={() => handleNavigation("/signup")}
          >
            Get Started
          </Button>
        </div>
      </Content>
    </Layout>
  );
};

export default Interface;
