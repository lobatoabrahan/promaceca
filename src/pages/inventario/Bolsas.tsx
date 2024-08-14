import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Dropdown, Space, Table } from 'antd';
import type { TableProps } from 'antd/lib/table';
import type { ColumnType } from 'antd/lib/table';
import TransaccioneInventarioForm from '../../components/formularios/TransaccioneInventarioForm';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

interface Transaccion {
  id: string;
  fecha_registro: Date;
  fecha: Date;
  inventario: string;
  categoria: string;
  producto: string;
  transaccion: {
    nombre: string;
    segundo: string;
    apellido: string;
  };
}

const Bolsas: React.FC = () => {
  const [transacciones, setTransacciones] = useState<Transaccion[]>([]);
  const [tipoTransaccion, setTipoTransaccion] = useState('');
  const [typeTransaction, setTypeTransaction] = useState<string | undefined>(
    undefined
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (tipo: string, type?: string) => {
    setTipoTransaccion(tipo);
    setTypeTransaction(type);
    setIsModalOpen(true);
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      type: 'group',
      label: 'Entradas',
      children: [
        {
          label: <a onClick={() => showModal('entrada')}>Entrada</a>,
          key: '1-1',
        },
        {
          label: (
            <a onClick={() => showModal('cambio de lote', 'entrada')}>
              Cambio de Lote - Entrada
            </a>
          ),
          key: '1-2',
        },
        {
          label: <a onClick={() => showModal('devolucion')}>Devolución</a>,
          key: '1-3',
        },
      ],
    },
    {
      key: '2',
      type: 'group',
      label: 'Salidas',
      children: [
        {
          label: <a onClick={() => showModal('salida')}>Salida</a>,
          key: '2-1',
        },
        {
          label: (
            <a onClick={() => showModal('cambio de lote', 'salida')}>
              Cambio de Lote - Salida
            </a>
          ),
          key: '2-2',
        },
      ],
    },
  ];

  const menuProps = {
    items,
  };

  useEffect(() => {
    const fetchTransacciones = async () => {
      try {
        const response = await axios.get<Transaccion[]>(
          'https://streaming-google-sheets-api.vercel.app/inventario/transacciones'
        );
        setTransacciones(response.data);
      } catch (error) {
        console.error('Hubo un error al buscar las transacciones:', error);
      }
    };

    fetchTransacciones();
  }, []);

  const columns: ColumnType<Transaccion>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      sorter: (a, b) => a.id.localeCompare(b.id),
      width: '10%',
      filters: transacciones.map((transaccion) => ({
        text: transaccion.id,
        value: transaccion.id,
      })),
      onFilter: (value, record) => record.id === value,
    },
    {
      title: 'Fecha Registro',
      dataIndex: 'fecha_registro',
      sorter: (a, b) => a.fecha_registro.localeCompare(b.fecha_registro),
      width: '15%',
      filters: transacciones.map((transaccion) => ({
        text: transaccion.fecha_registro,
        value: transaccion.fecha_registro,
      })),
      onFilter: (value, record) => record.fecha_registro === value,
    },
    {
      title: 'Fecha',
      dataIndex: 'fecha',
      sorter: (a, b) => a.fecha.localeCompare(b.fecha),
      width: '15%',
      filters: transacciones.map((transaccion) => ({
        text: transaccion.fecha,
        value: transaccion.fecha,
      })),
      onFilter: (value, record) => record.fecha === value,
    },
    {
      title: 'Inventario',
      dataIndex: 'inventario',
      sorter: (a, b) => a.inventario.localeCompare(b.inventario),
      width: '15%',
      filters: transacciones.map((transaccion) => ({
        text: transaccion.inventario,
        value: transaccion.inventario,
      })),
      onFilter: (value, record) => record.inventario === value,
    },
    {
      title: 'Categoría',
      dataIndex: 'categoria',
      sorter: (a, b) => a.categoria.localeCompare(b.categoria),
      width: '15%',
      filters: transacciones.map((transaccion) => ({
        text: transaccion.categoria,
        value: transaccion.categoria,
      })),
      onFilter: (value, record) => record.categoria === value,
    },
    {
      title: 'ID Producto',
      dataIndex: 'producto',
      sorter: (a, b) => a.producto.localeCompare(b.producto),
      width: '15%',
      filters: [],
      onFilter: (value, record) =>
        record.producto
          .toLowerCase()
          .includes(value.toLocaleString().toLowerCase()),
    },
    {
      title: 'Nombre',
      dataIndex: 'transaccion',
      render: (transaccion) => transaccion.nombre,
      width: '15%',
      filters: transacciones.map((t) => ({
        text: t.transaccion.nombre,
        value: t.transaccion.nombre,
      })),
      onFilter: (value, record) =>
        record.transaccion.nombre
          .toLowerCase()
          .includes(value.toLocaleString().toLowerCase()),
    },
    {
      title: 'Segundo',
      dataIndex: 'transaccion',
      render: (transaccion) => transaccion.segundo,
      width: '15%',
      filters: [],
      onFilter: (value, record) =>
        record.transaccion.segundo
          .toLowerCase()
          .includes(value.toLocaleString().toLowerCase()),
    },
    {
      title: 'Apellido',
      dataIndex: 'transaccion',
      render: (transaccion) => transaccion.apellido,
      width: '15%',
      filters: [],
      onFilter: (value, record) =>
        record.transaccion.apellido
          .toLowerCase()
          .includes(value.toLocaleString().toLowerCase()),
    },
  ];

  const handleTableChange: TableProps<Transaccion>['onChange'] =
    (/* pagination, filters, sorter, extra */) => {
      /* console.log('Parámetros de la tabla:', pagination, filters, sorter, extra); */
    };

  return (
    <div>
      <h1>Transacciones</h1>
      <Dropdown menu={menuProps}>
        <Button>
          <Space>
            Button
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
      <Table
        columns={columns}
        dataSource={transacciones.map((transaccion) => ({
          ...transaccion,
          key: transaccion.id,
        }))}
        onChange={handleTableChange}
      />

      <div>
        <TransaccioneInventarioForm
          open={isModalOpen}
          setOpen={setIsModalOpen}
          tipoTransaccion={tipoTransaccion}
          transaccionTipo={typeTransaction}
        />
      </div>
    </div>
  );
};

export default Bolsas;
