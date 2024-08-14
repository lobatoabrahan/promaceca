import React, { useState } from 'react';
import { Upload, Button, message, UploadProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { RcFile, UploadFile as AntUploadFile } from 'antd/es/upload/interface';

type Props = {};

const Maquila: React.FC<Props> = () => {
  const [fileList, setFileList] = useState<AntUploadFile[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);

  const handleUpload = async () => {
    const file = fileList[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file as RcFile);

    setUploading(true);

    try {
      const response = await axios.post('https://streaming-google-sheets-api.vercel.app/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      message.success(`File uploaded successfully: ${response.data.message}`);
      setFileList([]);
    } catch (error: any) {
      message.error(`Failed to upload file: ${error.response.data.detail}`);
    } finally {
      setUploading(false);
    }
  };

  const props: UploadProps = {
    beforeUpload: (file) => {
      setFileList([file]);
      return false;
    },
    fileList,
    onRemove: () => setFileList([]),
    customRequest: ({ onSuccess }) => {
      onSuccess?.('ok');
    },
  };

  return (
    <div>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{ marginTop: 16 }}
      >
        {uploading ? 'Uploading' : 'Start Upload'}
      </Button>
    </div>
  );
};

export default Maquila;
