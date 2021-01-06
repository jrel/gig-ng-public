export interface Payment {
  id: number;
  name: string;
  ammount: number;
  code: number;
  grid: string;
}

export interface CreatePayment {
  name: string;
  ammount: number;
  code: number;
  grid: string;
}
