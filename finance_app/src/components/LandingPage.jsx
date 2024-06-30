import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Layout, Typography, Card, Row, Col } from "antd";
import { tokenStatus } from "../Redux/authSlice";
import { setIncomes, setExpenses, setLoading } from "../Redux/financeSlice";
import { PieChart } from '@mui/x-charts/PieChart';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const { Content } = Layout;
const { Title } = Typography;

const LandingPage = () => {
  const dispatch = useDispatch();
  const tokenFromRedux = useSelector(tokenStatus);
  const incomeList = useSelector((state) => state.finance.income);
  const expenseList = useSelector((state) => state.finance.expense);
  const loading = useSelector((state) => state.finance.loading);

  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

  useEffect(() => {
    const fetchFinanceData = async () => {
      dispatch(setLoading(true)); // Start loading
      try {
        const incomeResponse = await axios.get(
          "http://localhost:4000/api/income",
          {
            headers: { Authorization: `Bearer ${tokenFromRedux}` },
          }
        );
        const expenseResponse = await axios.get(
          "http://localhost:4000/api/expense",
          {
            headers: { Authorization: `Bearer ${tokenFromRedux}` },
          }
        );
        dispatch(setIncomes(incomeResponse.data));
        dispatch(setExpenses(expenseResponse.data));

        const totalIncome = incomeResponse.data.reduce(
          (acc, item) => acc + item.income,
          0
        );
        const totalExpense = expenseResponse.data.reduce(
          (acc, item) => acc + item.income,
          0
        );

        setTotalIncome(totalIncome);
        setTotalExpense(totalExpense);
        setTotalBalance(totalIncome - totalExpense);
      } catch (error) {
        console.error(error);
      } finally {
        dispatch(setLoading(false)); 
      }
    };
    fetchFinanceData();
  }, [dispatch, tokenFromRedux]);

  const data = [
    { id: 0, value: totalBalance, label: 'Total Balance' },
    { id: 1, value: totalIncome, label: 'Total Income' },
    { id: 2, value: totalExpense, label: 'Total Expense' },
  ];

  return (
    <Layout style={{ background: "#31363F" }}>
      <Content style={{ padding: "20px", maxWidth: "100vw", margin: "0px 0px" }}>
        <Title level={2} style={{ color: "#ffffff", marginBottom: "20px" }}>
          Financial Overview
        </Title>
        {loading ? (
          <SkeletonTheme baseColor="#646464" highlightColor="#646464">
            <p>
              <Skeleton count={3} />
            </p>
          </SkeletonTheme>
        ) : (
          <>
            <Row gutter={16}>
              <Col span={8}>
                <Card bordered={false} style={{ background: "#50727B" }}>
                  <Title level={4} style={{ color: "#ffffff" }}>
                    Total Balance
                  </Title>
                  <p style={{ fontSize: "24px", color: "#52c41a" }}>
                    ₹{totalBalance.toFixed(2)}
                  </p>
                </Card>
              </Col>
              <Col span={8}>
                <Card bordered={false} style={{ background: "#50727B" }}>
                  <Title level={4} style={{ color: "#ffffff" }}>
                    Total Income
                  </Title>
                  <p style={{ fontSize: "24px", color: "#52c41a" }}>
                    ₹{totalIncome.toFixed(2)}
                  </p>
                </Card>
              </Col>
              <Col span={8}>
                <Card bordered={false} style={{ background: "#50727B" }}>
                  <Title level={4} style={{ color: "#ffffff" }}>
                    Total Expense
                  </Title>
                  <p style={{ fontSize: "24px", color: "#ff4d4f" }}>
                    ₹{totalExpense.toFixed(2)}
                  </p>
                </Card>
              </Col>
            </Row>
            <Title level={2} style={{ color: "#ffffff", margin: "20px 0" }}>
              Financial Graph
            </Title>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <PieChart
                series={[
                  {
                    data,
                    highlightScope: { faded: 'global', highlighted: 'item' },
                    faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                  },
                ]}
                height={400}
              />
            </div>
          </>
        )}
      </Content>
    </Layout>
  );
};

export default LandingPage;
