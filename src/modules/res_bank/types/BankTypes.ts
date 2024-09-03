export interface Bank {
    id: number;
    name: string;
    street?: string;
    street2?: string;
    zip?: string;
    city?: string;
    state?: string;
    country?: string;
    email?: string;
    phone?: string;
    active?: boolean;
    bic?: string;
    create_date?: Date;
    write_date?: Date
    create_uid?: string
    write_uid?: string
  }

  export interface BankToDatabase {
    name: string;
    street?: string;
    street2?: string;
    zip?: string;
    city?: string;
    state?: string;
    country?: string;
    email?: string;
    phone?: string;
    active?: boolean;
    bic?: string;
    create_date?: Date;
    write_date?: Date
    create_uid?: string
    write_uid?: string
  }