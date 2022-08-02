export enum SheetColumns {
  CUSTOMER_NAME = 'Customer_name',
  TEL_NUMBER = 'Tel_number',
  STREET = 'Street',
  HOUSE_NUMBER = 'House_number',
  CITY = 'City',
  COUNTRY = 'Country',
  NOTIFICATION = 'Notification',
  CUSTOMER_NOTE = 'Customer_note',
  POSTAL_CODE = 'Postal_code',
  DELIVER_AFTER = 'Deliver_after',
  DELIVER_BEFORE = 'Deliver_before',
  QUANTITY = 'Quantity',
  // currently not used
  PAYMENT = 'Payment',
  CASH_ON_DELIVER = 'Cash_on_deliver',
  INTERNAL_ORDER_NO = 'Internal_order_no'
}

export type RawSheetData = {
  [SheetColumns.CUSTOMER_NAME]?: string;
  [SheetColumns.TEL_NUMBER]?: string;
  [SheetColumns.STREET]?: string;
  [SheetColumns.HOUSE_NUMBER]?: string;
  [SheetColumns.CITY]?: string;
  [SheetColumns.COUNTRY]?: string;
  [SheetColumns.NOTIFICATION]?: boolean;
  [SheetColumns.CUSTOMER_NOTE]?: string;
  [SheetColumns.POSTAL_CODE]?: string;
  [SheetColumns.DELIVER_AFTER]?: number;
  [SheetColumns.DELIVER_BEFORE]?: number;
  [SheetColumns.QUANTITY]?: number;
  // -- define types of these items
  [SheetColumns.PAYMENT]?: number;
  [SheetColumns.CASH_ON_DELIVER]?: number;
  [SheetColumns.INTERNAL_ORDER_NO]?: number;
};