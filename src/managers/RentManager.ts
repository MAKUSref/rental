import Customer from "../customer/Customer";
import Product from "../product/Product";
import Rent from "../rent/Rent";
import RentRepository from "../repositories/RentRepository";

class RentManager{
    async rentProduct(customer: Customer, product: Product, beginTime: Date){
        const allRents = await RentRepository.getAll()
        const lastId = allRents[allRents.length -1].rentId
        RentRepository.add(new Rent(lastId+1, customer, product, beginTime))
    }
    // returnProduct(product: Product){
    //     RentRepository.
    // }
    async getAllCustomersRents(customer: Customer){
        return await RentRepository.getAll()
    }
    async findAllRents(){
        return await RentRepository.getAll()
    }
}