export interface IRepository<T>{

    items: T[];

    get(index: number): T | null;
    add(item: T): void;
    remove(item: T): void;
    size(): number;
    findBy(filterFunction: (item: T)=>boolean): T[];
    getAll(): T[];
}