export interface Book {
  id: string;
  title: string;
  description: string;
  price: number;
  datePost?: Date;
  author: {
    id: string;
    fullName: string;
  };
}
