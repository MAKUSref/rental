import Rent from "../rent/Rent";
import { IRepository } from "./Repository.type";
import { Client } from "ts-postgres";

type rent_id = number;
type customer_pid = string;
type product_id = number;
type rent_cost = number;
type begin_time = string;
type end_time = string;

type RentRow = [
  rent_id,
  customer_pid,
  product_id,
  rent_cost,
  begin_time,
  end_time
];

class RentRepository {
  items: Rent[] = [];

  get(index: number): Rent | null {
    return this.items[index] ? this.items[index] : null;
  }
  add(item: Rent): void {
    this.items.push(item);
  }
  remove(item: Rent): void {
    this.items.filter((arrayItem) => arrayItem !== item);
  }
  size(): number {
    return this.items.length;
  }
  async getAll(): Promise<any> {
    const client = new Client({
      database: "rental",
      user: "postgres",
      password: "postgres",
    });
    await client.connect();

    const rents = await new Promise((resolve, reject) => {
      const query = `
        SELECT * FROM rents;
      `;

      client
        .query(query)
        .then((result) => {
          const rentsRows: RentRow[] = result.rows as RentRow[];
          console.log(rentsRows);
          
          
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          client.end();
        });
    });

    // console.log(rents);

    // return this.items;
    return new Promise(() => {});
  }

  findBy(filterFunction: (item: Rent) => boolean) {
    return this.items.filter(filterFunction);
  }
}

export default RentRepository;
