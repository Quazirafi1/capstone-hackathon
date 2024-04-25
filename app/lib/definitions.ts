/* // This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};
 */



// Users
export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  likelihood_thres: number;
  impact_thres: number;
  cost_thres: number;
}


export interface Stakeholder{
  id: number;
  name : string;
  description : string;
}
// Questions
export interface Question {
  id: number;
  question: string;
}

// Answers
export interface Answer {
  qid: number; // Question ID
  uid: number; // User ID
  answer: string;
}

// Impacts
export interface Impact {
  id: number;
  title: string;
  description: string;
  pos_neg: boolean;
  dimension: string;
}

// ChosenImpacts
export interface ChosenImpact extends Impact{
  uid: number; // User ID
  iid: number; // Impact ID
  temp_category: string;
  likelihood: number;
  impactfulness: number;
}
// Keywords
export interface Keyword {
  word: string;
  iid: number; // Impact ID
}


// LeadTos
export interface LeadTo {
  id: number;
  ciid1: number; // ChosenImpact ID 1
  ciid2: number; // ChosenImpact ID 2
}

// SelectedImpacts
export interface SelectedImpact {
  id: number;
  ciid: number; // ChosenImpact ID
}

// Risks
export interface Risk {
  id: number;
  siid: number; // SelectedImpact ID
  description: string;
}

// Actions
export interface Action {
  id: number;
  siid: number; // SelectedImpact ID
  description: string;
  cost_inaction: number;
  cost_action: number;
  selected: boolean;
}
