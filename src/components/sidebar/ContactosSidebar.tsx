import React, { useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BookFilled,
  SettingFilled,
  UserOutlined,
  HomeFilled,
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
import { SignOutButton } from '@clerk/clerk-react';

const { Header, Sider, Content } = Layout;

const ContactosSidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const sidebarWidth = collapsed ? 80 : 200; // Sidebar width based on collapsed state

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <SignOutButton />,
    },
  ];

  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  

  useEffect(() => {
    const routeToMenuKey: Record<string, string> = {
      '/contactos': '1',
      '/contactos/etiquetas_de_contacto': '2-1',
      '/contactos/titulos_de_contacto': '2-2',
      // Agrega más rutas y claves según tu aplicación
    };
    const pathname = location.pathname;
    const keys = routeToMenuKey[pathname] ? [routeToMenuKey[pathname]] : [];
    setSelectedKeys(keys);
    console.log(keys);
  }, [location.pathname]);

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
        <Flex vertical justify="space-between" style={{ height: '100%' }}>
          <div>
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
                  icon: <BookFilled />,
                  label: <Link to="/contactos">Contactos</Link>,
                },
                {
                  key: '2',
                  icon: <SettingFilled />,
                  label: 'Configuracion',
                  children: [
                    {
                      key: '2-1',
                      label: (
                        <Link to="/contactos/etiquetas_de_contacto">
                          Etiquetas de contacto
                        </Link>
                      ),
                    },
                    {
                      key: '2-2',
                      label: (
                        <Link to="/contactos/titulos_de_contacto">
                          Titulos de contacto
                        </Link>
                      ),
                    },
                    {
                      key: '2-3',
                      label: (
                        <Link to="/contactos/industrias">
                          Industrias
                        </Link>
                      ),
                    },
                    {
                      key: '2-4',
                      label: 'Localizacion',
                      children: [
                        {
                          key: '2-4-1',
                          label: (
                            <Link to="/contactos/paises">
                              Paises
                            </Link>
                          ),
                        },
                        {
                          key: '2-4-2',
                          label: (
                            <Link to="/contactos/estados">
                              Estados
                            </Link>
                          ),
                        },
                      ],
                    },
                    {
                      key: '2-5',
                      label: 'Cuentas bancarias',
                      children: [
                        {
                          key: '2-5-1',
                          label: (
                            <Link to="/contactos/bancos">
                              Bancos
                            </Link>
                          ),
                        },
                        {
                          key: '2-5-2',
                          label: (
                            <Link to="/contactos/cuentas_bancarias">
                              Cuentas Bancarias
                            </Link>
                          ),
                        },
                      ],
                    },
                  ],
                },
              ]}
            />
          </div>
          <Menu
            mode="inline"
            items={[
              {
                key: 'home',
                icon: <HomeFilled />,
                label: <Link to={'/system'}>Inicio</Link>,
              },
            ]}
          />
        </Flex>
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
        <Content
          style={{ margin: '64px 0 0', overflow: 'initial', padding: '1rem' }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default ContactosSidebar;
