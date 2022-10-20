import { Client } from "ts-postgres";
import Address from "./src/client/Address";
import Customer from "./src/client/Customer";
import DifficultyLevel from "./src/product/DifficultyLevel";
import Movie from "./src/product/Movie";
import VideoGame from "./src/product/VideoGame";
import CustomerRepository from "./src/repositories/ClientRepository";
import ProductRepository from "./src/repositories/ProductRepository";

const main = async () => {
  const a = new Address('asds', 'ads', 'dsa')
  const c = new Customer('jan', 'aaaaa', 'poiuytyuio11', a);


  // await CustomerRepository.add(c);
  // let x = await CustomerRepository.findByPersonalID(c.pid);
  // console.log(x);
  // await CustomerRepository.remove(c);
  // x = await CustomerRepository.findByPersonalID(c.pid);
  // console.log(x);


  let y = await ProductRepository.get(1);
  console.log(y);

  await ProductRepository.remove(y).then(()=>{
    console.log('usuniete');
    
  });

  y = await ProductRepository.get(1);
  console.log(y);



  

}

main();