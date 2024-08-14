import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Card,
  Col,
  Input,
  Row,
  Skeleton,
  Pagination,
  Flex,
  Image,
  Button,
} from 'antd';
import { Partner } from '../../types';
import { get_res_partner } from '../../services/ApiServices';
import { supabase } from '../../supabase/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';

const { Search } = Input;

const Contactos: React.FC = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(50); // Number of items per page
  const navigate = useNavigate();

  useEffect(() => {
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
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
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
          // Handle partial updates
          handleRealtimeUpdate(payload);
        }
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleRealtimeUpdate = (payload: any) => {
    setPartners((prevPartners) => {
      // Create a map of the existing partners
      const partnersMap = new Map(
        prevPartners.map((partner) => [partner.id, partner])
      );

      // Update or add the partner based on the payload
      const updatedPartner = payload.new;
      partnersMap.set(updatedPartner.id, updatedPartner);

      // Convert map back to array
      return Array.from(partnersMap.values()).sort((a, b) => {
        // Compara los nombres
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
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
          <Col span={8} key={index}>
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

  const fetchPartnerImages = async (partnerIds: number[]) => {
    // Consulta para obtener imágenes relacionadas con los partners, filtrando por res_model
    const { data, error } = await supabase
      .from('ir_attachment')
      .select('id, store_fname, mimetype, res_id')
      .in('res_id', partnerIds)
      .eq('res_model', 'res.partner'); // Filtrar por res_model

    if (error) {
      console.error('Error fetching images:', error);
      return [];
    }

    return data;
  };

  return (
    <div>
      <Row style={{ marginTop: 16 }} align={'middle'}>
        <Col span={8}>
          <Flex align="center" gap={8}>
            <Button type="primary" onClick={() => navigate('/contacto/nuevo')}>
              Nuevo
            </Button>
            <h3>Contactos</h3>
          </Flex>
        </Col>
        <Col span={8}>
          <Input
            placeholder="Search by name or email"
            value={searchText}
            onChange={handleSearchChange}
          />
        </Col>
        <Col span={8}>
          <Flex justify="end">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={filteredPartners.length}
              onChange={handlePageChange}
            />
          </Flex>
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
              <Flex align="center" gap={16}>
                <Avatar
                  shape="square"
                  size={64}
                  src={partner.profile_image || undefined}
                  icon={!partner.profile_image && <UserOutlined />}
                />
                <Card.Meta title={partner.name} description={partner.email} />
              </Flex>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Contactos;
