import React from 'react';
import {
  Form,
  Input,
  Modal,
  DatePicker,
  Select,
  AutoComplete,
  Flex,
  InputNumber,
  Row,
  Col,
  notification,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { postTransaccionInventario } from '../../services/ApiServices';

interface TransaccioneInventarioFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  tipoTransaccion: string;
  transaccionTipo?: string;
}

const productos = [
  { id: 'B0001', nombre: 'producto 1' },
  { id: 'B0002', nombre: 'producto 2' },
  { id: 'B0003', nombre: 'producto 3' },
  { id: 'B0004', nombre: 'producto 4' },
  { id: 'B0005', nombre: 'producto 5' },
  { id: 'B0006', nombre: 'producto 6' },
  { id: 'B0007', nombre: 'producto 7' },
  { id: 'B0008', nombre: 'producto 8' },
];

const lote = [
  { id: 'L0001', nombre: 'producto 1' },
  { id: 'L0002', nombre: 'producto 2' },
  { id: 'L0003', nombre: 'producto 3' },
  { id: 'L0004', nombre: 'producto 4' },
  { id: 'L0005', nombre: 'producto 5' },
  { id: 'L0006', nombre: 'producto 6' },
  { id: 'L0007', nombre: 'producto 7' },
  { id: 'L0008', nombre: 'producto 8' },
];



const TransaccioneInventarioForm: React.FC<TransaccioneInventarioFormProps> = ({
  open,
  setOpen,
  tipoTransaccion,
  transaccionTipo,
}) => {
  const [form] = Form.useForm();
  const [api] = notification.useNotification();
  type NotificationType = 'success' | 'info' | 'warning' | 'error';
  
  const openNotification = (
    type: NotificationType,
    message: string,
    description: string
  ) => {
    api[type]({
      message: message,
      description: description,
    });
  };
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        values.inventario = 'extrusion';
        values.categoria = 'bolsas';
        values.fecha_registro = new Date()
        values.id = 1;
        values.transaccion.tipo = tipoTransaccion;
        console.log('Form Values:', values);
        postTransaccionInventario(values).then((response) => {
          console.log(response);
          setOpen(false);
          form.resetFields();
          openNotification('success', 'Exito', 'Datos guardados correctamente');
        });
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const modalTitle = transaccionTipo
    ? `Bolsas / ${transaccionTipo} / ${tipoTransaccion}`
    : `Bolsas / ${tipoTransaccion}`;

  return (
    <Modal
      title={modalTitle}
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_transaccion_inventario_extrusion_bolsa"
      >
        <Form.Item
          name="fecha"
          label="Fecha"
          /* rules={[{ required: true, message: 'Please input the name!' }]} */
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="producto" label="Producto">
          <AutoComplete
            options={productos.map((p) => ({
              value: p.id,
            }))}
            filterOption={true}
          />
        </Form.Item>
        <Flex gap={16}>
          <Form.Item name="lote" label="Lote" style={{ width: '100%' }}>
            <AutoComplete
              options={lote.map((l) => ({
                value: l.id,
              }))}
              filterOption={true}
              style={{ width: '100%' }}
            />
          </Form.Item>
          {tipoTransaccion === 'cambio de lote' &&
            transaccionTipo === 'salida' && (
              <Form.Item
                name={['transaccion', 'lote_destino']}
                label="Lote Final"
                style={{ width: '100%' }}
              >
                <AutoComplete
                  options={lote.map((l) => ({
                    value: l.id,
                  }))}
                  filterOption={true}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            )}
          {tipoTransaccion === 'cambio de lote' &&
            transaccionTipo === 'entrada' && (
              <Form.Item
                name={['transaccion', 'lote_origen']}
                label="Lote Proveniente"
                style={{ width: '100%' }}
              >
                <AutoComplete
                  options={lote.map((l) => ({
                    value: l.id,
                  }))}
                  filterOption={true}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            )}
        </Flex>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name={['transaccion', 'paquetes']} label="Paquetes">
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={['transaccion', 'cantidad_por_paquetes']}
              label="Cantidad Por Paquetes"
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name={['transaccion', 'origen']} label="Proveniente">
              <Input style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={['transaccion', 'destino']} label="Destino">
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="estatus" label="Estatus">
          <Select
            defaultValue="aprobado"
            style={{ width: "100%"}}
            options={[
              { value: 'aprobado', label: 'Aprobado' },
              { value: 'revision', label: 'Revision' },
              { value: 'rechazado', label: 'Rechazado' },
            ]}
          />
        </Form.Item>
        <Form.Item name="descripcion_estatus" label="Descripcion Estatus">
          <TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TransaccioneInventarioForm;
