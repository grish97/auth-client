import React from 'react';
import {Button, Layout, Menu, theme, MenuProps} from 'antd';
import { HomeFilled } from "@ant-design/icons";
import {Outlet} from "react-router-dom";
import {useLogout} from "hooks";

const {Header, Content, Footer} = Layout;

const items: MenuProps["items"] = [{
  label: "Dashboard",
  key: 1,
  icon: <HomeFilled />
}]

const MainLayout: React.FC = () => {
  const logout = useLogout();
  const {
    token: {colorBgContainer, borderRadiusLG},
  } = theme.useToken();

  return (
    <Layout>
      <Header style={{display: 'flex', alignItems: 'center'}}>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={items}
          style={{flex: 1, minWidth: 0}}
        />

        <Button type="link" onClick={logout}>Sign Out</Button>
      </Header>
      <Content style={{padding: '50px', backgroundColor: "white"}}>
        <Outlet/>
      </Content>
    </Layout>
  );
};

export default MainLayout;
