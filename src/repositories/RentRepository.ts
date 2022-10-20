import Rent from "../rent/Rent";
import { IRepository } from "./Repository.type";
import { Client } from "ts-postgres";
import CustomerRepository from "./ClientRepository";
import Customer from "../customer/Customer";
import Product from "../product/Product";
import ProductRepository, { ProductRow } from "./ProductRepository";
import { Pool } from "postgres-pool";

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

  static async get(index: number): Promise<Rent[]> {
    const rentArr: Rent[] = await RentRepository.getAll();

    return rentArr.filter((rent: Rent) => rent.rentId === index);
  }
  
  static async add(rent: Rent) {
    const pool = new Pool({host: 'localhost', database: 'rental', user: 'postgres', password: 'postgres' });

    const query = `
      INSERT INTO
          rents (customer_pid, product_id, rent_cost, begin_time)
      VALUES
          ($1, $2, $3, $4);
    `;

    const getLastProductId = `SELECT rent_id FROM rents ORDER BY rent_id DESC LIMIT 1;`;

    try {
      pool.query('BEGIN;');
      const res = await pool.query(getLastProductId);
      const index = res.rows[0].product_id + 1;
      pool.query(query, [rent.customer.pid, index, rent.rentCost, rent.beginTime]);
      pool.query('COMMIT;');
    } catch {
      pool.query('ROLLBACK;');
    }

    pool.end();
  }

  static async remove(rent: Rent) {
    const client = new Client({
      database: "rental",
      user: "postgres",
      password: "postgres",
    });

    await client.connect();

    const deleteRentQuery = `DELETE FROM rents WHERE rent_id = $1;`;

    client.query(deleteRentQuery, [rent.rentId])
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        client.end();
      });
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

  static async setEndRent(rent: Rent) {
    if (!rent.getEndTime()) {
      rent.endRent();

      const client = new Client({
        database: "rental",
        user: "postgres",
        password: "postgres",
      });
  
      await client.connect();

      const query = `UPDATE rents SET end_time = now() WHERE rent_id = $1`;

      client.query(query, [rent.rentId])
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          client.end();
        });
    }
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
