import Rent from "../rent/Rent";
import { IRepository } from "./Repository.type";
import { Client } from "ts-postgres";
import CustomerRepository from "./ClientRepository";
import Customer from "../client/Customer";
import Product from "../product/Product";
import ProductRepository, { ProductRow } from "./ProductRepository";

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
  
  static add(item: Rent): void {
    const client = new Client({
      database: "rental",
      user: "postgres",
      password: "postgres",
    });
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
          resolve(result.rows.length);
        })
        .catch((err) => {
          reject(err);
        })
        .finally(() => {
          client.end();
        })
    });
  }

  static async getAll(): Promise<Rent[]> {
    const client = new Client({
      database: "rental",
      user: "postgres",
      password: "postgres",
    });
    await client.connect();

    return new Promise((resolve, reject) => {
      const query = `
        SELECT * FROM rents;
      `;

      client
        .query(query)
        .then(async (result) => {
          const rentsRows: RentRow[] = result.rows as RentRow[];

          const preperedRents = rentsRows.map(async (rentRow: RentRow) => {
            const customer = await CustomerRepository.findByPersonalID(rentRow[1] as customer_pid);
            const productsRawData = await ProductRepository.getAllRawData();

            const productRawData = productsRawData.filter((product) => product[0] === rentRow[2])[0].slice(1) as ProductRow;
            const product = ProductRepository.rowToProduct(productRawData) as Product;
            
            const rent = new Rent(rentRow[0], customer[0], product, new Date(rentRow[4]));

            return rent;
          });

          Promise.all(preperedRents).then((rents) => {
            resolve(rents);
          });
        })
        .catch((err) => {
          reject(err);
        })
        .finally(() => {
          client.end();
        });
    });
  }

  static async findBy(filterFunction: (item: Rent) => boolean): Promise<Rent[]> {
    const rents = await RentRepository.getAll();

    return rents.filter(filterFunction);
  }

  static async findById(id: rent_id): Promise<Rent[]> {
    return RentRepository.findBy((rent: Rent) => rent.rentId === id);
  }
}

export default RentRepository;
