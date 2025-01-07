export interface User {
    id: number;
    name: string;
    number: string;
    amount: number;
    paid: boolean;
    onViewProfile: (id: number) => void;
    onDeleteUser: (id: number) => void;
  }
  