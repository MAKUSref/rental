import Rent from "../rent/Rent";
import { IRepository } from "./Repository.type";
import { Client } from "ts-postgres";
import CustomerRepository from "./ClientRepository";
import Customer from "../client/Customer";
import Product from "../product/Product";
import ProductRepository from "./ProductRepository";

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
  
  static async size(): Promise<number> {
    const client = new Client({
      database: "rental",
      user: "postgres",
      password: "postgres",
    });

    await client.connect();

    return new Promise((resolve, reject) => {
      client.query('SELECT * FROM rents;')
        .then(async (result) => {
          console.log(result);
        })
        .catch((err) => {
          reject(err);
        })
        .finally(() => {
          client.end();
        })
    });
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
        .then(async (result) => {
          const rentsRows: RentRow[] = result.rows as RentRow[];

          const preperedRents = rentsRows.map(async (rentRow: RentRow): Promise<any> => {
            const client = await CustomerRepository.findByPersonalID(rentRow[1] as customer_pid);
            console.log(rentRow[1]);
            console.log(client);
            
            // return new Rent();
          } );
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
