import { Product } from "./product";

export class Category {
    id: number;
    name: string;
    image: string;
    desc?: string;
    products?: Array<Product>;
    created_at?: Date;
    uplated_at?: Date;
}
