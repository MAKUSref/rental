import Rent from "../rent/Rent";
import { IRepository } from "./Repository.type";

class RentRepository implements IRepository<Rent>{
    items: Rent[] = [];

    get(index: number): Rent | null {
        return this.items[index] ? this.items[index] : null;

    }
    add(item: Rent): void {
        this.items.push(item)
    }
    remove(item: Rent): void {
        this.items.filter(arrayItem => arrayItem !== item)

    }
    size(): number {
        return this.items.length;
    }
    getAll(): Rent[] {
        return this.items;
    }

    findBy(filterFunction: (item: Rent) => boolean){
        return this.items.filter(filterFunction)
    }

}

export default RentRepository;