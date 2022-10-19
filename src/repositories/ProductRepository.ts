import Product from "../product/Product";
import { IRepository } from "./Repository.type";
import { Client } from "ts-postgres";
import Movie from "../product/Movie";
import Music from "../product/Music";
import DifficultyLevel from "../product/DifficultyLevel";
import VideoGame from "../product/VideoGame";
import BoardGame from "../product/BoardGame";

type ProductRow = [number, string, number, string, string, string, string | null]

class ProductRepository{
    items: Product[] = [];

    rowToProduct(row: ProductRow){
        let newOb: Product | undefined;
        if(row[1] === 'Movie'){
            newOb = new Movie(row[5], row[2], row[3], row[4])
        }else if(row[1] === 'Music'){
            newOb = new Music(row[5], row[2], row[3], row[4])
        }else if(row[1] === 'BoardGame' && row[6]){
            const difficulty: DifficultyLevel = new (<any>DifficultyLevel)[row[6]]; 
            newOb = new BoardGame(row[5], row[2], row[3], row[4], difficulty)
        }else if(row[1] === 'VideoGame' && row[6]){
            const difficulty: DifficultyLevel = new (<any>DifficultyLevel)[row[6]]; 
            newOb = new VideoGame(row[5], row[2], row[3], row[4], difficulty)
        }
        return newOb;
    }

    async get(index: number) {
        const client = new Client({ database: 'rental', user: 'postgres', password: 'postgres' });
        client.connect();

        return new Promise((resolve, reject)=>{
            client.query('SELECT * FROM products;')
            .then(results => {
                let productObject = this.rowToProduct(results.rows[index] as ProductRow);   
                resolve(productObject);
            }).catch((e)=>{
                reject(`error connecting to db: ${e}`)
            })
            .finally(()=>{
                client.end();
            })
        })
        
    }
    add(item: Product): void {
        this.items.push(item)
    }
    remove(item: Product): void {
        this.items.filter(arrayItem => arrayItem !== item)

    }
    size(): number {
        return this.items.length;
    }
    getAll(): Product[] {
        return this.items;
    }

    findBy(filterFunction: (item: Product) => boolean) {
        return this.items.filter(filterFunction)
    }

    findBySerialNumber(number: string) {
        return this.items.filter(product => product.serialNumber === number)
    }
}

export default ProductRepository;