import { Client } from "ts-postgres";
import Address from "../client/Address";
import Customer from "../client/Customer";
import Bronze from "../client/CustomerType/Bronze";
import Default from "../client/CustomerType/Default";
import Gold from "../client/CustomerType/Gold";
import Silver from "../client/CustomerType/Silver";
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

    rowToCustomer(customerRow: CustomerRow, address: Address): Customer {
        const newCustomer = new Customer(customerRow[0], customerRow[1], customerRow[2], address)
        newCustomer.CustomerType = new (CustomerTypesMap[customerRow[3] ? customerRow[3] : 'Default'])()
        return newCustomer;
    }

    rowToAddress(addressRow: AddressRow): Address {
        console.log(addressRow);
        
        return new Address(addressRow[0], addressRow[2], addressRow[1])
    }

    customerToRow(customer: Customer){
        // const cr: CustomerRow = [customer.name, customer.surname, customer.pid, customer.CustomerType?.constructor.name as CustomerType]
        // const ar: AddressRow = [customer.pid, customer.address.city, customer.address.street, customer.address.number]
        // return [cr, ar]
        return [customer.name, customer.surname, customer.pid, customer.CustomerType?.constructor.name as CustomerType, customer.pid, customer.address.city, customer.address.street, customer.address.number]
    }

    async get(index: number): Promise<Customer> {
        const x = await this.getAll();
        return x[index]
    }

    async add(item: Customer): Promise<void> {
        const client = new Client({ database: 'rental', user: 'postgres', password: 'postgres' });
        await client.connect();
        return new Promise((resolve, reject) => {

            const query = `
            INSERT INTO customers (customer_name, customer_surname, customer_pid, customer_type)
            VALUES ($1, $2, $3, $4);
            INSERT INTO addresses (customer_pid, city, street, house_number)
            VALUES ($5, $6, $7);
            `
            // console.log([].concat(...this.customerToRow(item)));
            
            client.query(query, this.customerToRow(item))
                .then(results => {

                
                }).catch((e) => {
                    reject(`error connecting to db: ${e}`)
                })
                .finally(() => {
                    client.end();
                })
        })
    }

    remove(item: Customer): void {
        this.items.filter(arrayItem => arrayItem !== item)

    }

    async size(): Promise<number> {
         const x = await this.getAll();
         return x.length;
     }

    async getAll(): Promise<Customer[]> {
        const client = new Client({ database: 'rental', user: 'postgres', password: 'postgres' });
        await client.connect();
        return new Promise((resolve, reject) => {
            client.query('SELECT customer_name, customer_surname, customers.customer_pid, customer_type, a.city, a.street, a.house_number FROM customers JOIN addresses as a ON customers.customer_pid = a.customer_pid;')
                .then(results => {
                    resolve(results.rows.map((row) => {
                        console.log(row);
                        
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

    findBy(filterFunction: (item: Customer) => boolean) {
        return this.items.filter(filterFunction)
    }

    findByPersonalID(personalID: string): Customer[] {
        return this.items.filter((client) => client.pid === personalID)
    }

}

export default CustomerRepository;