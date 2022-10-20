
import Address from "../customer/Address";
import Customer from "../customer/Customer";
import CustomerType from "../customer/CustomerType/CustomerType";
import CustomerRepository from "../repositories/CustomerRepository";

class CustomerManager{
    registerCustomer(firstName: string, lastName: string, PID: string, clientType: CustomerType, address: Address){
        CustomerRepository.add(new Customer(firstName, lastName, PID, address))
    }
    unregisterCustomer(customer: Customer){
        CustomerRepository.remove(customer);
    }
    getCustomer(PID: string){
        CustomerRepository.findByPersonalID(PID);
    }
    findCustomer(filterFunction: (item: Customer) => boolean){
        CustomerRepository.findBy(filterFunction);
    }
    findAllCustomers(){
        CustomerRepository.getAll();
    }
    changeCustomerType(c: Customer, t: CustomerType){
        CustomerRepository.setCustomerType(c, t);
    }
}

export default CustomerManager