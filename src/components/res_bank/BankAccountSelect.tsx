// src/components/BankAccountSelect.tsx
import React, { useState, useEffect } from 'react';
import { Select, Button, Modal, Input, Form, Flex } from 'antd';
import { BankAccount } from '../../types';
import BankAccountComponent from './BankAccount';
import { supabase } from '../../supabase/supabaseClient';
import BankComponent from './BankTable';

const { Option } = Select;

const BankAccountSelect: React.FC = () => {
    const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
    const [selectedBankAccount, setSelectedBankAccount] = useState<number | null>(null);
    const [searchValue, setSearchValue] = useState<string>('');
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    useEffect(() => {
        fetchBankAccounts();
    }, []);

    const fetchBankAccounts = async () => {
        const { data, error } = await supabase.from<BankAccount>('res_partner_bank').select('id, acc_number');
        if (error) console.error('Error fetching bank accounts:', error);
        else setBankAccounts(data);
    };

    const handleSearch = (value: string) => {
        setSearchValue(value);
    };

    const handleChange = (value: number) => {
        setSelectedBankAccount(value);
    };

    const handleCreate = () => {
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        fetchBankAccounts(); // Refresh bank accounts after creation
    };

    return (
        <div>
            <Select
                showSearch
                value={selectedBankAccount}
                placeholder="Select a bank account"
                onSearch={handleSearch}
                onChange={handleChange}
                filterOption={false}
                style={{ width: 300 }}
                notFoundContent={
                    <Flex>
                        <Button type="primary" onClick={handleCreate} style={{width:"100%"}}>
                            Create Bank Account
                        </Button>
                    </Flex>
                }
            >
                {bankAccounts
                    .filter((account) =>
                        account.name.toLowerCase().includes(searchValue.toLowerCase())
                    )
                    .map((account) => (
                        <Option key={account.id} value={account.id}>
                            {account.name}
                        </Option>
                    ))}
            </Select>
            <Modal
                title="Create/Edit Bank Account"
                open={isModalVisible}
                onCancel={handleModalClose}
                footer={null}
            >
                <BankComponent onClose={handleModalClose} />
            </Modal>
        </div>
    );
};

export default BankAccountSelect;
