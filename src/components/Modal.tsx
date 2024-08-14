import React from 'react';
import { Modal } from 'antd';

interface ReusableModalProps {
  title: string;
  isVisible: boolean;
  onOk: () => void;
  onCancel: () => void;
  children: React.ReactNode;
}

const ReusableModal: React.FC<ReusableModalProps> = ({ title, isVisible, onOk, onCancel, children }) => {
  return (
    <Modal title={title} open={isVisible} onOk={onOk} onCancel={onCancel} centered >
      {children}
    </Modal>
  );
};

export default ReusableModal;
