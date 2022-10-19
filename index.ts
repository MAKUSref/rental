import { Client } from "ts-postgres";
import Movie from "./src/product/Movie";
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
pr.get(1).then((x)=>{
  let y = x as Movie;
  console.log(y);
}).catch((err) => {
  console.log(err);
});



