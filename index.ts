import { Client } from "ts-postgres";
import Address from "./src/client/Address";
import Customer from "./src/client/Customer";
import DifficultyLevel from "./src/product/DifficultyLevel";
import Movie from "./src/product/Movie";
import VideoGame from "./src/product/VideoGame";
import CustomerRepository from "./src/repositories/ClientRepository";
import ProductRepository from "./src/repositories/ProductRepository";
import RentRepository from "./src/repositories/RentRepository";



// RentRepository.getAll().then((rents) => {
//   console.log(rents);
// })



// RentRepository.size();