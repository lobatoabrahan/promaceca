// src/components/BankAccount.tsx
import React, { useState, useEffect } from 'react';
import { BankAccount } from '../../types';
import { supabase } from '../../supabase/supabaseClient';

const sanitizeAccountNumber = (acc_number: string | null): string | null => {
    if (acc_number) {
        return acc_number.replace(/\W+/g, '').toUpperCase();
    }
    return null;
};

const BankAccountComponent: React.FC = () => {
    const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
    const [newBankAccount, setNewBankAccount] = useState<Partial<BankAccount>>({
        active: true,
        acc_number: '',
        partner_id: 0,
        allow_out_payment: false,
        bank_id: 0,
        sequence: 10,
        currency_id: 0,
    });

    useEffect(() => {
        fetchBankAccounts();
    }, []);

    const fetchBankAccounts = async () => {
        const { data, error } = await supabase.from<BankAccount>('res_partner_bank').select('*');
        if (error) console.error('Error fetching bank accounts:', error);
        else setBankAccounts(data);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewBankAccount((prev) => ({ ...prev, [name]: value }));
    };

    const addBankAccount = async () => {
        const sanitizedAccNumber = sanitizeAccountNumber(newBankAccount.acc_number);
        const bankAccountToInsert = { ...newBankAccount, sanitized_acc_number: sanitizedAccNumber };
        const { data, error } = await supabase.from<BankAccount>('res_partner_bank').insert([bankAccountToInsert]);
        if (error) console.error('Error adding bank account:', error);
        else setBankAccounts((prev) => [...prev, ...data]);
    };

    return (
        <div>
            <h1>Bank Account Management</h1>
            <input name="acc_number" value={newBankAccount.acc_number} onChange={handleChange} placeholder="Account Number" />
            {/* Add other fields similarly */}
            <button onClick={addBankAccount}>Add Bank Account</button>
            <ul>
                {bankAccounts.map((account) => (
                    <li key={account.id}>{account.acc_number}</li>
                ))}
            </ul>
        </div>
    );
};

export default BankAccountComponent;

