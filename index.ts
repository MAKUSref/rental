import { Client } from "ts-postgres";
import DifficultyLevel from "./src/product/DifficultyLevel";
import Movie from "./src/product/Movie";
import VideoGame from "./src/product/VideoGame";
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
// pr.get(1).then((x)=>{
//   let y = x as Movie;
//   console.log(y.title);
// })

let tombRider = new VideoGame('asdfsdgfh', 1, 'Tomb Rider', 'adventure', DifficultyLevel.Medium);
pr.add(tombRider).then(()=>{
  pr.get(1).then(()=>{
  })
});

