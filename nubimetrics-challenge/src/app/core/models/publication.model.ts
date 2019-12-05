export class Publication {
  id?: string;
  title?: string;
  thumbnail?: string;
  price?: number;
  available_quantity?: number;
  sold_quantity?: number;
  listing_type_id?: string;
  condition?: string;
  status?: string;
  site_id?: string;
  initial_quantity?: number;
  base_price?: number;
  warranty?: string;

  constructor({id, 
    title, 
    thumbnail, 
    price, 
    available_quantity, 
    sold_quantity, 
    listing_type_id, 
    condition,
    status,
    site_id,
    initial_quantity,
    base_price,
    warranty}: Publication) {
    this.id = id;
    this.title = title;
    this.thumbnail = thumbnail;
    this.price = price;
    this.available_quantity = available_quantity;
    this.sold_quantity = sold_quantity;
    this.listing_type_id = listing_type_id;
    this.condition = condition;
    this.status = status;
    this.site_id = site_id;
    this.initial_quantity = initial_quantity;
    this.base_price = base_price;
    this.warranty = warranty;
  }
}