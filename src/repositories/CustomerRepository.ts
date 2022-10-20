import { Client } from "ts-postgres";
import { Pool } from 'postgres-pool';
import Address from "../customer/Address";
import Customer from "../customer/Customer";
import Bronze from "../customer/CustomerType/Bronze";
import Default from "../customer/CustomerType/Default";
import Gold from "../customer/CustomerType/Gold";
import Silver from "../customer/CustomerType/Silver";
import { IRepository } from "./Repository.type";


type Name = string;
type Surname = string;
type PID = string;
type CustomerType = 'Gold' | 'Silver' | 'Bronze' | 'Default' ;
type CustomerRow = [Name, Surname, PID, CustomerType];

type City = string;
type Street = string;
type StreetNumber = string;
type AddressRow = [PID, City, Street, StreetNumber];


const CustomerTypesMap = {
    'Gold': Gold,
    'Silver': Silver,
    'Bronze': Bronze,
    'Default': Default
}

class CustomerRepository {
    items: Customer[] = [];

    static rowToCustomer(customerRow: CustomerRow, address: Address): Customer {
        const newCustomer = new Customer(customerRow[0], customerRow[1], customerRow[2], address)
        newCustomer.CustomerType = new (CustomerTypesMap[customerRow[3] ? customerRow[3] : 'Default'])()
        return newCustomer;
    }

    static rowToAddress(addressRow: AddressRow): Address {
        return new Address(addressRow[0], addressRow[2], addressRow[1])
    }

    static customerToRow(customer: Customer){
        const cr: CustomerRow = [customer.name, customer.surname, customer.pid, customer.CustomerType?.constructor.name as CustomerType]
        const ar: AddressRow = [customer.pid, customer.address.city, customer.address.street, customer.address.number]
        return [cr, ar]
    }

    static async get(index: number): Promise<Customer | null> {
        const x = await this.getAll();
        try{
            return x[index];
        }catch{
            return null;
        }
    }

    static async add(item: Customer): Promise<void> {
        const pool = new Pool({host: 'localhost', database: 'rental', user: 'postgres', password: 'postgres' })
               const query1 = `
            INSERT INTO customers (customer_name, customer_surname, customer_pid, customer_type)
            VALUES ($1, $2, $3, $4);
            `
            const query2 = `
            INSERT INTO addresses (customer_pid, city, street, house_number)
            VALUES ($1, $2, $3, $4);     
 ` 
        const args = this.customerToRow(item)
        try{
            pool.query('BEGIN;');
            pool.query(query1, args[0] as CustomerRow);
            pool.query(query2, args[1] as AddressRow);
            pool.query('COMMIT;');

        }catch{
            pool.query('ROLLBACK;');
        }
        pool.end();

    }

    static async remove(item: Customer): Promise<void> {
        const pool = new Pool({host: 'localhost', database: 'rental', user: 'postgres', password: 'postgres' })
        const query1 = `
            DELETE FROM addresses WHERE customer_pid = $1;
            `
        const query2 = `
            DELETE FROM customers WHERE customer_pid = $1;
            ` 
        try{
            await pool.query('BEGIN;');
            await pool.query(query1, [item.pid]);
            await pool.query(query2, [item.pid]);
            await pool.query('COMMIT;');

        }catch{
            console.log(`rolling back ${item.pid}`);
            
            await pool.query('ROLLBACK;');
        }
        await pool.end();


    }

    static async size(): Promise<number> {
         const x = await this.getAll();
         return x.length;
     }

     static async getAll(): Promise<Customer[]> {
        const client = new Client({ database: 'rental', user: 'postgres', password: 'postgres' });
        await client.connect();
        return new Promise((resolve, reject) => {
            client.query('SELECT customer_name, customer_surname, customers.customer_pid, customer_type, a.city, a.street, a.house_number FROM customers JOIN addresses as a ON customers.customer_pid = a.customer_pid;')
                .then(results => {
                    resolve(results.rows.map((row) => {
                        const address = this.rowToAddress(row.slice(4) as AddressRow);
                        return this.rowToCustomer(row.slice(0, 4) as CustomerRow, address);
                    }))
                }).catch((e) => {
                    reject(`error connecting to db: ${e}`)
                })
                .finally(() => {
                    client.end();
                })
        })
    }

    static async findBy(filterFunction: (item: Customer) => boolean) {
        const allCustomers = await this.getAll()
            
        return allCustomers.filter(filterFunction)
        
    }

    static async findByPersonalID(personalID: string) {
        const res =  await this.findBy((client) => client.pid === personalID);   
        return res;
    }

}

export default CustomerRepository;