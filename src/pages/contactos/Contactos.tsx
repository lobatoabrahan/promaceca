import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Card,
  Col,
  Input,
  Row,
  Skeleton,
  Pagination,
  Button,
  Space,
} from 'antd';
import { Partner } from '../../types';
import { get_res_partner } from '../../services/ApiServices';
import { supabase } from '../../supabase/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';

const Contactos: React.FC = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(50); // Number of items per page
  const navigate = useNavigate();

  useEffect(() => {
    setPageSize(50);

    // Fetch initial data
    const fetchPartners = async () => {
      setLoading(true);
      const { data, error } = await get_res_partner();
      if (error) {
        console.error('Error fetching partners:', error);
      } else {
        // Ordenar los datos por el campo `name`
        const sortedData = data?.sort((a, b) => {
          // Compara los nombres
          if (a.name && b.name) {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
          }
          return 0;
        });

        setPartners(sortedData || []);
      }
      setLoading(false);
    };

    fetchPartners();

    // Set up realtime subscription
    const channel = supabase
      .channel('custom-insert-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'res_partner' },
        (payload) => {
          console.log('Change received!', payload);
          handleRealtimeUpdate(payload);
        }
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleRealtimeUpdate = (payload: any) => {
    setPartners((prevPartners) => {
      // Create a map of the existing partners
      const partnersMap = new Map(
        prevPartners.map((partner) => [partner.id, partner])
      );

      // Update or add the partner based on the payload
      const updatedPartner = payload.new;
      if (updatedPartner) {
        partnersMap.set(updatedPartner.id, updatedPartner);
      }

      // Convert map back to array
      return Array.from(partnersMap.values()).sort((a, b) => {
        // Compara los nombres
        if (a.name && b.name) {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
        }
        return 0;
      });
    });
  };

  const handleCardClick = (record: Partner) => {
    navigate(`/contacto/${record.id}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    setCurrentPage(1); // Reset page to 1 when search text changes
  };

  const filteredPartners = partners.filter(
    (partner) =>
      (partner.name &&
        partner.name.toLowerCase().includes(searchText.toLowerCase())) ||
      (partner.email &&
        partner.email.toLowerCase().includes(searchText.toLowerCase()))
  );

  // Calculate paginated partners
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedPartners = filteredPartners.slice(
    startIndex,
    startIndex + pageSize
  );

  if (loading) {
    return (
      <Row gutter={16}>
        {Array.from({ length: pageSize }).map((_, index) => (
          <Col span={6} key={index}>
            <Card>
              <Skeleton loading={true} active>
                <Card.Meta title="Loading..." description="Loading..." />
              </Skeleton>
            </Card>
          </Col>
        ))}
      </Row>
    );
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Row style={{ marginTop: 16 }} align={'middle'}>
        <Col span={8}>
          <Space>
            <Button type="primary" onClick={() => navigate('/contacto/nuevo')}>
              Nuevo
            </Button>
            <h3>Contactos</h3>
          </Space>
        </Col>
        <Col span={8}>
          <Input
            placeholder="Search by name or email"
            value={searchText}
            onChange={handleSearchChange}
          />
        </Col>
        <Col span={8}>
          <Space style={{ float: 'right' }}>
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={filteredPartners.length}
              onChange={handlePageChange}
            />
          </Space>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        {paginatedPartners.map((partner) => (
          <Col span={6} key={partner.id}>
            <Card
              hoverable
              onClick={() => handleCardClick(partner)}
              bordered={true}
            >
              <Space align="center">
                <Avatar
                  shape="square"
                  size={64}
                  icon={ <UserOutlined />}
                />
                <Card.Meta title={partner.name || 'No Name'} description={partner.email || 'No Email'} />
              </Space>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Contactos;
