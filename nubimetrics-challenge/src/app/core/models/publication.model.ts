export class Publication {
  id: string;
  title: string;
  thumbnail: string;
  price: number;
  available_quantity: number;
  sold_quantity: number;
  listing_type_id: string;
  condition: string;

  constructor({id, 
    title, 
    thumbnail, 
    price, 
    available_quantity, 
    sold_quantity, 
    listing_type_id, 
    condition}) {
    this.id = id;
    this.title = title;
    this.thumbnail = thumbnail;
    this.price = price;
    this.available_quantity = available_quantity;
    this.sold_quantity = sold_quantity;
    this.listing_type_id = listing_type_id;
    this.condition = condition;
  }
}