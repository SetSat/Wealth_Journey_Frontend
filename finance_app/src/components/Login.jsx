import React, { useState } from "react";
import { Form, Input, Button, message, Typography, Space, Card } from "antd";
import { useDispatch } from "react-redux";
import { login } from "../Redux/authSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import srcimage from "../assets/spaceman-removebg-preview (1).png";

const { Title } = Typography;

const LoginPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:4000/api/login", {
        email,
        password,
      });

      if (response.status === 200) {
        dispatch(login(response.data.token));
        message.success("Login successful");
        navigate("/dashboard");
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      message.error(error.response.data);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-svg-container">
        <img src={srcimage} alt="Floating SVG" className="floating-svg" />
      </div>
      <Card className="login-card">
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <Title level={2} style={{ textAlign: "center" }}>
            Login
          </Title>
          <Form onFinish={handleLogin} layout="vertical">
            <Form.Item
              label="Email"
              name="email "
              rules={[{ required: true, message: "Please input your Email!" }]}
            >
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size="large"
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" size="large" block>
                Login
              </Button>
            </Form.Item>
          </Form>
          <Button
            type="link"
            onClick={() => navigate("/signup")}
            style={{ color: "#4FFBDF", textAlign: "center" }}
          >
            Don't have an account?{" "}
            <span style={{ color: "#FFD700" }}>Sign Up</span>
          </Button>
        </Space>
      </Card>
    </div>
  );
};

export default LoginPage;
