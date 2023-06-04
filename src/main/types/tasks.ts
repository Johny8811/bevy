import { OnfleetTask, UpdateTaskResult } from '@onfleet/node-onfleet/Resources/Tasks';

export type Recipient = {
  name: string;
  phone: string;
  notes?: string | undefined;
  skipSMSNotifications: boolean | undefined;
};

export type Address = {
  apartment?: string | undefined;
  state?: string | undefined;
  postalCode?: string | undefined;
  country: string;
  city: string;
  street: string;
  number: string;
};

export type Task = {
  id: string;
  shortId: string;
  recipients: Recipient[];
  destination: { address: Address };
  completeAfter: number;
  completeBefore: number;
  quantity: number | undefined;
  pickupTask: boolean;
  completionDetails: {
    failureNotes: string;
    events: any[];
    actions: any[];
    time: number | null;
    firstLocation: any[];
    lastLocation: any[];
  };
  estimatedCompletionTime: number | null;
  worker: string | null;
  order: number | null;
  slot: {
    start: number;
    end: number;
  } | null;
  deliveredAt: number | null;
};

export type Tasks = Task[];

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
  PICKUP_TASK = 'Pickup_task',
  // currently not used
  PAYMENT = 'Payment',
  CASH_ON_DELIVER = 'Cash_on_deliver',
  INTERNAL_ORDER_NO = 'Internal_order_no',
  SKIP_PHONE_VALIDATION = 'Skip_phone_validation'
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
  [SheetColumns.PICKUP_TASK]?: boolean;
  [SheetColumns.SKIP_PHONE_VALIDATION]?: boolean;
  // -- define types of these items
  [SheetColumns.PAYMENT]?: number;
  [SheetColumns.CASH_ON_DELIVER]?: number;
  [SheetColumns.INTERNAL_ORDER_NO]?: number;
};

// TODO: rename to "CreateTaskProps"
export type CreateTaskProps = Pick<
  Task,
  'recipients' | 'destination' | 'completeAfter' | 'completeBefore' | 'quantity' | 'pickupTask'
>;

// Create Batch Tasks Response
export type CreateBatchTasksError = {
  cause: string | null;
  error: number;
  message: string;
  statusCode: number;
};

export type CreateBatchTasksErrors = {
  error: CreateBatchTasksError;
  task: CreateTaskProps;
};

export type CreateBatchTasksResponse = {
  errors: CreateBatchTasksErrors[];
  tasks: OnfleetTask[];
};

// Aggregated Tasks
export interface Id {
  street: string;
  number: string;
  city: string;
  completeAfter: number;
}

// TODO: investigate & remove if redundant
type OurOnFleetTask = {
  slot: {
    start: number;
    end: number;
  } | null;
  order: number | null;
} & UpdateTaskResult;
export interface AggregatedTask {
  _id: Id;
  uniqAddress: OurOnFleetTask[];
}

export type AggregatedTasks = AggregatedTask[];
