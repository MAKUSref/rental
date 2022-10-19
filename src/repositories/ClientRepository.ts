import Client from "../client/Client";
import { IRepository } from "./Repository.type";

class ClientRepository implements IRepository<Client>{
    items: Client[] = [];

    get(index: number): Client | null {
        return this.items[index] ? this.items[index] : null;

    }
    add(item: Client): void {
        this.items.push(item)
    }
    remove(item: Client): void {
        this.items.filter(arrayItem => arrayItem !== item)

    }
    size(): number {
        return this.items.length;
    }
    getAll(): Client[] {
        return this.items;
    }

    findBy(filterFunction: (item: Client) => boolean){
        return this.items.filter(filterFunction)
    }

    findByPersonalID(personalID: string): Client[]{
        return this.items.filter((client)=>client.pid === personalID)
    }

}

export default ClientRepository;