export interface Product {
    id?: number;
    name: string;
    active: boolean;
    manufacturing: Date;
    expiration: Date;
    supplierCode: string,
    supplierDescription: string;
    cnpj: string;
  }