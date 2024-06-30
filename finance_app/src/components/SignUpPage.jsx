import React, { useState } from "react";
import { Form, Input, Button, message, Typography, Space, Card } from "antd";
import { useDispatch } from "react-redux";
import { login } from "../Redux/authSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SignUpPage.css";
import srcimage from "../assets/spaceman-removebg-preview (1).png";

const { Title } = Typography;

const SignUpPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [form] = Form.useForm();

  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        "https://wealthjourney.onrender.com/api/signup",
        {
          name,
          email,
          password,
        }
      );
      form.resetFields();

      if (response.status === 200) {
        console.log(response.data.token);
        dispatch(login(response.data.token));
        navigate("/dashboard");
        message.success("Signup successful");
        setName("");
        setEmail("");
        setPassword("");
        form.resetFields();
      } else {
        throw new Error("Signup failed");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        message.error(error.response.data.message);
      } else {
        console.error("Signup error:", error);
        message.error("Signup failed. Please try again.");
      }
    }
  };

  return (
    <div className="signup-page-container">
      <Card className="signup-card">
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <Title level={2} style={{ textAlign: "center", color: "#fff" }}>
            Sign Up
          </Title>
          <Form onFinish={handleSignUp} form={form} layout="vertical">
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
              labelCol={{ style: { color: "white" } }} // Set label color to white
            >
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                size="large"
              />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                  type: "email",
                },
              ]}
              labelCol={{ style: { color: "white" } }} // Set label color to white
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
              labelCol={{ style: { color: "white" } }} // Set label color to white
            >
              <Input.Password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" size="large" block>
                Sign Up
              </Button>
            </Form.Item>
          </Form>
          <Button
            type="link"
            onClick={() => navigate("/login")}
            style={{ color: "#4FFBDF", textAlign: "center" }}
          >
            Already have an account?{" "}
            <span style={{ color: "#FFD700" }}>Log in</span>
          </Button>
        </Space>
      </Card>
      <div className="signup-svg-container">
        <img src={srcimage} alt="Floating SVG" className="floating-svg" />
      </div>
    </div>
  );
};

export default SignUpPage;
