import { Client } from "ts-postgres";
import Address from "./src/customer/Address";
import Customer from "./src/customer/Customer";
import DifficultyLevel from "./src/product/DifficultyLevel";
import Movie from "./src/product/Movie";
import VideoGame from "./src/product/VideoGame";
import CustomerRepository from "./src/repositories/CustomerRepository";
import ProductRepository from "./src/repositories/ProductRepository";
import RentRepository from "./src/repositories/RentRepository";



// RentRepository.getAll().then((rents) => {
//   console.log(rents);
// })



// RentRepository.size();