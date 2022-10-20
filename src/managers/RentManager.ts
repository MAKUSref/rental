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
    returnProduct(rent: Rent){
        RentRepository.setEndRent(rent);
    }
    async getAllCustomersRents(c: Customer){
        return await RentRepository.findBy((rent)=>rent.customer.pid === c.pid)
    }

    async findRents(filterFunction: (item: Rent) => boolean){
        return await RentRepository.findBy(filterFunction)
    }

    async findAllRents(){
        return await RentRepository.getAll()
    }

    async checkCustomerRentBalance(c: Customer): Promise<number>{
        const all = await this.getAllCustomersRents(c);
        let sum = 0;
        all.forEach((rent)=>{
            if(rent.endTime){
                sum += rent.rentCost * rent.rentDays;
            }
        })
        return sum;
    }
}