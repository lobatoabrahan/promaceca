import { Flex } from 'antd';
import { CreditCardFilled } from '@ant-design/icons';
import { Typography } from 'antd';
import { Link } from 'react-router-dom';
import { SignOutButton, useUser } from '@clerk/clerk-react';
import { useEffect } from 'react';

const { Text } = Typography;

const System = () => {
  const { user } = useUser();
  useEffect(() => {
    if (user) {
      // Guardar el user.id en localStorage cuando el usuario esté autenticado
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);
  return (
    <div>
      <Flex
        justify="center"
        align="center"
        style={{ width: '100%', height: '100vh', backgroundColor: '#F3F4F6' }}
      >
        <SignOutButton redirectUrl='/login'/>
        <Link to={'/contactos'}>
          <Flex vertical align="center" gap={12} >
            <Flex
              style={{
                width: 90,
                height: 90,
                boxShadow: '0px 10px 20px 0px rgba(0,0,0,0.1)',
                backgroundColor: '#ffffff',
              }}
              justify="center"
              align="center"
            >
              <CreditCardFilled style={{ fontSize: '2rem' }} />
            </Flex>
            <Text strong style={{ fontSize: '1rem' }}>
              Contactos
            </Text>
          </Flex>
        </Link>
      </Flex>
    </div>
  );
};

export default System;
