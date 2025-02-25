export interface User {
  id: number;
  email: string;
  name: string;
}

export interface Expense {
  id: number;
  amount: number;
  description: string;
  category: string;
  date: string;
  isRecurring: boolean;
  recurringInterval?: 'MONTHLY' | 'WEEKLY' | 'YEARLY';
  userId: number;
}

export interface Budget {
  id: number;
  amount: number;
  category: string;
  period: 'MONTHLY' | 'YEARLY';
  userId: number;
}

export interface Category {
  id: number;
  name: string;
  color: string;
}