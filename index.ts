import { Client } from "ts-postgres";
import Address from "./src/client/Address";
import Customer from "./src/client/Customer";
import DifficultyLevel from "./src/product/DifficultyLevel";
import Movie from "./src/product/Movie";
import VideoGame from "./src/product/VideoGame";
import CustomerRepository from "./src/repositories/ClientRepository";
import ProductRepository from "./src/repositories/ProductRepository";

// async function main() {
//   const client = new Client({database: 'rental', user: 'postgres', password: 'postgres'});
//    client.connect().then(()=>{
    
//     client.query(
//         "SELECT * FROM products;"
//     ).then(result=>{
//       result.rows.forEach(row => {
//         console.log(row);
        
//       });
      
//     })    
//    }).finally(()=>{
//     client.end();
//    });


// }
// main();

const pr = new ProductRepository();
const cr = new CustomerRepository();

const a = new Address('asds', 'ads', 'dsa')
const c = new Customer('jan', 'aaaaa', 'poiuytyuio', a);

// pr.get(1).then((x)=>{
//   let y = x as Movie;
//   console.log(y.title);
// })
  // cr.getAll().then(r=>{
  //   console.log(r);
  // })
// console.log(c.CustomerType?.constructor.name);

  cr.add(c);

