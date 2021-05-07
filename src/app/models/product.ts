import { Category } from "./category";

export class Product {
    id: Number;
    name: string;
    image: string;
    cate_id: number;
    short_desc: string;
    content: string;
    price: number;
    sale_price: number;
    category?: Category;
    product_gallaries?: Array<any>;
    created_at?: Date;
    updated_at?: Date;
}
