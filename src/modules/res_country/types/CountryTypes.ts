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

  export interface CountryStates {
    id: number;
    country_id?: number;
    code?: string;
    name: string ;
    create_date?: Date;
    write_date?: Date
    create_uid?: string
    write_uid?: string
  }

  export interface CountryStatesToDatabase {
    country_id?: number;
    code?: string;
    name: string ;
    create_date?: Date;
    write_date?: Date
    create_uid?: string
    write_uid?: string
  }