import React, { useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  BarChartOutlined,
  VideoCameraOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Button,
  Avatar,
  Flex,
  Image,
  Layout,
  Menu,
  theme,
  Dropdown,
} from 'antd';
import type { MenuProps } from 'antd';

import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';

const { Header, Sider, Content } = Layout;

const SidebarLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      // Puedes redirigir a una página específica después de cerrar sesión, si es necesario
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const sidebarWidth = collapsed ? 80 : 200; // Sidebar width based on collapsed state

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <a onClick={handleSignOut}>Cerrar Sesion</a>,
    },
  ];

  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  // Efecto para actualizar las claves seleccionadas cuando cambia la ruta
  useEffect(() => {

    // Mapeo de rutas a claves de menú
  const routeToMenuKey: Record<string, string> = {
    '/dashboard': '1', // Dashboard
    '/bolsas': '2-1', // Bolsas dentro de Extrusion
    // Agrega más rutas y claves según tu aplicación
  };

    const pathname = location.pathname;
    const keys = routeToMenuKey[pathname] ? [routeToMenuKey[pathname]] : [];
    setSelectedKeys(keys);
  }, [location.pathname]); // Incluye routeToMenuKey como dependencia

  return (
    <Layout
      style={{
        height: '100vh',
      }}
    >
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          overflow: 'auto',
          height: '100%',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          background: colorBgContainer,
        }}
      >
        <Flex justify="center" align="center">
          <Image
            src="../../../public/Promaceca_centrado.png"
            width={64}
            style={{
              padding: 12,
              justifyContent: 'center',
            }}
          />
        </Flex>
        <Menu
          mode="inline"
          defaultSelectedKeys={selectedKeys}
          items={[
            {
              key: '1',
              icon: <BarChartOutlined />,
              label: <Link to="/dashboard">Dashboard</Link>,
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'Extrusion',
              children: [
                { key: '2-1', label: <Link to="/bolsas">Bolsas</Link> },
                { key: '2-2', label: 'Bobinas' },
              ],
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: <Link to="/dashboard">Dashboard</Link>,
            },
          ]}
        />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 200, transition: '0.2s' }}>
        <Header
          style={{
            position: 'fixed',
            top: 0,
            padding: 16,
            zIndex: 1,
            width: `calc(100% - ${sidebarWidth}px)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 40,
              height: 40,
            }}
          />
          <Dropdown
            menu={{ items }}
            placement="bottomRight"
            trigger={['click']}
          >
            <Avatar
              size={40}
              style={{
                cursor: 'pointer',
              }}
              icon={<UserOutlined />}
            />
          </Dropdown>
        </Header>
        <Content style={{ margin: '64px 16px 0', overflow: 'initial' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default SidebarLayout;
