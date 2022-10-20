import Product from "../product/Product";
import { IRepository } from "./Repository.type";
import { Client } from "ts-postgres";
import Movie from "../product/Movie";
import Music from "../product/Music";
import DifficultyLevel from "../product/DifficultyLevel";
import VideoGame from "../product/VideoGame";
import BoardGame from "../product/BoardGame";
import Game from "../product/Game";


export type ProductRow = [string, number, string, string, string, string | null];
type ProductRowExtended = [number, string, number, string, string, string, string | null];

class ProductRepository {
    items: Product[] = [];

    static rowToProduct(row: ProductRow): Product | undefined {
        let newOb: Product | undefined;
        if (row[0] === 'Movie') {
            newOb = new Movie(row[4], row[1], row[2], row[3])
        } else if (row[0] === 'Music') {
            newOb = new Music(row[4], row[1], row[2], row[3])
        } else if (row[0] === 'BoardGame' && row[5]) {

            const difficulty: DifficultyLevel = DifficultyLevel[row[5] as keyof typeof DifficultyLevel]
            newOb = new BoardGame(row[4], row[1], row[2], row[3], difficulty)
        } else if (row[0] === 'VideoGame' && row[5]) {
            const difficulty: DifficultyLevel = DifficultyLevel[row[5] as keyof typeof DifficultyLevel]
            newOb = new VideoGame(row[4], row[1], row[2], row[3], difficulty)
        }
        return newOb;
    }

    static productToRow(product: Product): ProductRow {

        return [product.constructor.name, product.basePrice, product.title, product.category, product.serialNumber, null]
    }

    static gameToRow(game: Game): ProductRow {
        return [game.constructor.name, game.basePrice, game.title, game.category, game.serialNumber, game.difficultyLevel.toString()]
    }

    static async get(index: number): Promise<Product> {
        const client = new Client({ database: 'rental', user: 'postgres', password: 'postgres' });
        await client.connect();
        return new Promise((resolve, reject) => {
            client.query('SELECT * FROM products WHERE id = $1;', [index])
                .then(results => {
                    console.log(results);

                    let productObject = this.rowToProduct(results.rows[0].slice(1) as ProductRow);
                    if (productObject) {
                        resolve(productObject);
                    } else {
                        reject('there was a problem in database')
                    }
                }).catch((e) => {
                    reject(`error connecting to db: ${e}`)
                })
                .finally(() => {
                    client.end();
                })
        })

    }

    static async add(item: Product): Promise<void> {
        const client = new Client({ database: 'rental', user: 'postgres', password: 'postgres' });
        let values: ProductRow;

        if ((item as Game).difficultyLevel) {
            values = ProductRepository.gameToRow(item as Game);
        } else {
            values = ProductRepository.productToRow(item);
        }
        await client.connect().catch(e => {
            console.log(e);
        });

        return new Promise(() => {
            console.log(values);

            client.query('INSERT INTO products (product_type, base_price, title, category, serialNumber, difficulty_level) VALUES ($1, $2, $3, $4, $5, $6);', values).catch(err => {
                console.error(err);
            }).finally(() => {
                client.end();
            })
        });

    }


    // static remove(item: Product): void {
    //     ProductRepository.items.filter(arrayItem => arrayItem !== item)

    // }
    static async size(): Promise<number> {
        const client = new Client({ database: 'rental', user: 'postgres', password: 'postgres' });
        await client.connect();
        return new Promise((resolve, reject) => {
            client.query('SELECT * FROM products;')
                .then(results => {
                        resolve(results.rows.length);
                }).catch((e) => {
                    reject(`error connecting to db: ${e}`)
                })
                .finally(() => {
                    client.end();
                })
        })
    }
    static async getAll(): Promise<Product[]> {
        const client = new Client({ database: 'rental', user: 'postgres', password: 'postgres' });
        await client.connect();
        return new Promise((resolve, reject) => {
            client.query('SELECT * FROM products;')
                .then(results => {

                    let productList = results.rows.map((productRow)=>ProductRepository.rowToProduct(productRow.slice(1) as ProductRow));
                    productList = productList.filter((potentialProduct: Product | undefined)=>potentialProduct != undefined);
                    resolve(productList as Product[]);
                }).catch((e) => {
                    reject(`error connecting to db: ${e}`)
                })
                .finally(() => {
                    client.end();
                })
        })
    }

    static async getAllRawData(): Promise<ProductRowExtended[]> {
        const client = new Client({ database: 'rental', user: 'postgres', password: 'postgres' });
        await client.connect();
        return new Promise((resolve, reject) => {
            client.query('SELECT * FROM products;')
                .then(results => {
                    resolve(results.rows as ProductRowExtended[]);
                }).catch((e) => {
                    reject(`error connecting to db: ${e}`)
                })
                .finally(() => {
                    client.end();
                })
        })
    }

    static async findBy(filterFunction: (item: Product) => boolean) {
        ProductRepository.getAll().then(allProducts=>{
            return allProducts.filter(filterFunction)
        })
    }

    static async findBySerialNumber(number: string) {
        return ProductRepository.findBy(product => product.serialNumber === number)
    }
}

export default ProductRepository;