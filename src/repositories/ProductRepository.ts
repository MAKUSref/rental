import Product from "../product/Product";
import { IRepository } from "./Repository.type";
import { Client } from "ts-postgres";
import Movie from "../product/Movie";
import Music from "../product/Music";
import DifficultyLevel from "../product/DifficultyLevel";
import VideoGame from "../product/VideoGame";
import BoardGame from "../product/BoardGame";
import Game from "../product/Game";


type ProductRow = [string, number, string, string, string, string | null]

class ProductRepository {
    items: Product[] = [];

    rowToProduct(row: ProductRow): Product | undefined {
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

    productToRow(product: Product): ProductRow {

        return [product.constructor.name, product.basePrice, product.title, product.category, product.serialNumber, null]
    }

    gameToRow(game: Game): ProductRow {
        return [game.constructor.name, game.basePrice, game.title, game.category, game.serialNumber, game.difficultyLevel.toString()]
    }

    async get(index: number): Promise<Product> {
        const client = new Client({ database: 'rental', user: 'postgres', password: 'postgres' });
        await client.connect();
        return new Promise((resolve, reject) => {
            client.query('SELECT * FROM products;')
                .then(results => {
                    console.log(results);

                    let productObject = this.rowToProduct(results.rows[index].slice(1) as ProductRow);
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

    async add(item: Product): Promise<void> {
        const client = new Client({ database: 'rental', user: 'postgres', password: 'postgres' });
        let values: ProductRow;

        if ((item as Game).difficultyLevel) {
            values = this.gameToRow(item as Game);
        } else {
            values = this.productToRow(item);
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