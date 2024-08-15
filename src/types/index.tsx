export interface Product {
  id: string;
  name: string;
  price: number;
  // Otros campos necesarios
}

export interface Partner {
  id?:number;
  company_id?: number;
  create_date?: string;
  name?: string;
  title?: number;
  parent_id?: number;
  user_id?: number;
  state_id?: number;
  country_id?: number;
  industry_id?: number;
  color?: number;
  commercial_partner_id?: number;
  create_uid?: number;
  write_uid?: number;
  complete_name?: string;
  ref?: string;
  lang?: string;
  tz?: string;
  vat?: string;
  company_registry?: string;
  website?: string;
  function?: string;
  type?: string;
  street?: string;
  street2?: string;
  zip?: string;
  city?: string;
  email?: string;
  phone?: string;
  mobile?: string;
  commercial_company_name?: string;
  company_name?: string;
  date?: string;
  comment?: string;
  partner_latitude?: number;
  partner_longitude?: number;
  active?: boolean;
  employee?: boolean;
  is_company?: boolean;
  partner_share?: boolean;
  write_date?: string;
  message_bounce?: number;
  email_normalized?: string;
  signup_type?: string;
  signup_expiration?: string;
  signup_token?: string;
  team_id?: number;
  partner_gid?: number;
  additional_info?: string;
  phone_sanitized?: string;
  supplier_rank?: number;
  customer_rank?: number;
  invoice_warn?: string;
  invoice_warn_msg?: string;
  debit_limit?: number;
  last_time_entries_checked?: string;
  ubl_cii_format?: string;
  peppol_endpoint?: string;
  peppol_eas?: string;
  sale_warn?: string;
  sale_warn_msg?: string;
  picking_warn?: string;
  picking_warn_msg?: string;
  buyer_id?: number;
  purchase_warn?: string;
  purchase_warn_msg?: string;
  calendar_last_notif_ack?: string;
}

export interface WebSocketMessage<T> {
  type: string;
  data: T;
}

export interface TransaccionInventario {
  id: string;
  fecha_registro: Date;
  fecha: Date;
  inventario: string;
  categoria: string;
  lote: string;
  producto: string;
  documentacion: string[];
  estatus: string;
  descripcion_estatus: string;
  transaccion: object;
}

// src/types/index.ts
export interface Bank {
  id?: number;
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
  create_date?: string;
  write_date?: string
  create_uid?: string
  write_uid?: string
}

export interface BankAccount {
  id?: number;
  active: boolean;
  acc_number: string;
  sanitized_acc_number?: string;
  acc_holder_name?: string;
  partner_id: number;
  allow_out_payment?: boolean;
  bank_id?: number;
  bank_name?: string;
  bank_bic?: string;
  sequence?: number;
  currency_id?: number;
  company_id?: number;
}

