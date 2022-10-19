import BoardGame from "../product/BoardGame";
import DifficultyLevel from "../product/DifficultyLevel";
import Movie from "../product/Movie";
import Music from "../product/Music";
import Product from "../product/Product";
import VideoGame from "../product/VideoGame";
import ProductRepository from "../repositories/ProductRepository";

class ProductManager{

    products = new ProductRepository();

    registerMusic( serialNumber: string, title: string, category: string, basePrice: number){
        this.products.add(new Music(serialNumber, basePrice, title, category))
    }

    registerMovie( serialNumber: string, title: string, category: string, basePrice: number){
        this.products.add(new Movie(serialNumber, basePrice, title, category))
    }

    registerVideodGame( serialNumber: string, title: string, category: string, basePrice: number, difficultyLevel: DifficultyLevel ){
        this.products.add(new VideoGame(serialNumber, basePrice, title, category, difficultyLevel))
    }
    registerBoardGame( serialNumber: string, title: string, category: string, basePrice: number, difficultyLevel: DifficultyLevel ){
        this.products.add(new BoardGame(serialNumber, basePrice, title, category, difficultyLevel))
    }
    unregisterProduct(product: Product){
        this.products.remove(product);
    }
}

export default ProductManager;