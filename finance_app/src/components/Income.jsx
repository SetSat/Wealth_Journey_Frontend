import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { tokenStatus } from "../Redux/authSlice";
import { addIncome, setIncomes } from "../Redux/financeSlice";
import { Table, Input, Button, Layout, Typography, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Toaster, toast } from "sonner";

const { Content } = Layout;
const { Title } = Typography;

const Income = () => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const tokenFromRedux = useSelector(tokenStatus);
  const incomeList = useSelector((state) => state.finance.income);

  useEffect(() => {
    const fetchIncome = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/income", {
          headers: { Authorization: `Bearer ${tokenFromRedux}` },
        });
        dispatch(setIncomes(response.data));
      } catch (error) {
        console.error(error);
      }
    };
    fetchIncome();
  }, [dispatch, tokenFromRedux]);

  const handleAddIncome = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/income",
        { amount, description },
        { headers: { Authorization: `Bearer ${tokenFromRedux}` } }
      );
      dispatch(addIncome(response.data));
      toast("Income added Successfully", {
        style: { padding: "15px 25px", border: "1px solid #4caf50" },
      });
      setAmount("");
      setDescription("");
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    {
      title: "Amount",
      dataIndex: "income",
      key: "income",
      render: (text) => (
        <span style={{ color: "#52c41a" }}>
          {typeof text === "number" ? parseFloat(text).toFixed(2) : text}
        </span>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => new Date(text).toLocaleDateString(),
    },
  ];

  return (
    <Layout style={{ background: "#31363F" }}>
      <Toaster />
      <Content style={{ padding: '20px' }}>
        <Title level={2} style={{ color: "#ffffff", marginBottom: "20px" }}>
          Add Income
        </Title>
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          style={{
            marginBottom: "10px",
            width: "100%",
            maxWidth: "300px",
            color: "black",
            border: "1px solid white",
            backgroundColor: "white",
          }}
        />
        <Input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          style={{
            marginBottom: "10px",
            width: "100%",
            maxWidth: "300px",
            border: "1px solid white",
            marginLeft: "5px",
            backgroundColor: "white",
            color: "black",
            marginRight: "5px",
          }}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddIncome}
          style={{ marginBottom: "20px" }}
        >
          Add Income
        </Button>
        <Title level={2} style={{ color: "#ffffff", marginBottom: "20px" }}>
          Recent Incomes
        </Title>
        <Table
          columns={columns}
          dataSource={incomeList}
          rowKey="_id"
          pagination={{ pageSize: 8 }}
          style={{ background: "#1f1f1f", backgroundColor: "#31363F" }}
        />
      </Content>
    </Layout>
  );
};

export default Income;
