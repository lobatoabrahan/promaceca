export interface Country {
    id: number;
    currency_id?: number;
    phone_code?:number;
    code?: string;
    name: string ;
    create_date?: Date;
    write_date?: Date
    create_uid?: string
    write_uid?: string
  }

  export interface CountryToDatabase {
    currency_id?: number;
    phone_code?:number;
    code?: string;
    name: string ;
    create_date?: Date;
    write_date?: Date
    create_uid?: string
    write_uid?: string
  }