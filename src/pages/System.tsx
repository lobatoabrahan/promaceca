import { Flex } from 'antd';
import { CreditCardFilled } from '@ant-design/icons';
import { Typography } from 'antd';
import { Link } from 'react-router-dom';
import { SignOutButton } from '@clerk/clerk-react';

const { Text } = Typography;

const System = () => {
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
