import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  WeiboCircleOutlined,
  DatabaseOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import Cookies from "js-cookie";
import { Layout, Menu, Button, theme } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!Cookies.get("token")) {
      navigate("/");
    }
  });

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Link
          to="/app"
          className="demo-logo-vertical"
          style={{
            display: "block",
            color: "#fff",
            textAlign: "center",
            padding: "12px 0",
            fontSize: "24px",
          }}
        >
          Logo{" "}
        </Link>
        <Menu
          theme="dark"
          mode="inline"
          items={[
            {
              key: "1",
              icon: <DatabaseOutlined />,
              label: <Link to="/app/category-list">Category List</Link>,
            },
            {
              key: "2",
              icon: <FileAddOutlined />,
              label: <Link to="/app/subcategory-list">Sub Category List</Link>,
            },
            {
              key: "3",
              icon: <WeiboCircleOutlined />,
              label: <Link to="/app/brand-list">Brand List</Link>,
            },
            {
              key: "4",
              icon: <WeiboCircleOutlined />,
              label: <Link to="/app/product-list">Product List</Link>,
            },
            {
              key: "5",
              icon: <WeiboCircleOutlined />,
              label: <Link to="/app/banner-list">Banner List</Link>,
            },
            // {
            //   key: "5",
            //   icon: <WeiboCircleOutlined />,
            //   label: <Link to="/app/attribute-list">Attrebute</Link>,
            // },
          ]}
        ></Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            overflowY: "scroll",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
