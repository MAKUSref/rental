import BoardGame from "../product/BoardGame";
import DifficultyLevel from "../product/DifficultyLevel";
import Movie from "../product/Movie";
import Music from "../product/Music";
import Product from "../product/Product";
import VideoGame from "../product/VideoGame";
import ProductRepository from "../repositories/ProductRepository";

class ProductManager{

    registerMusic( serialNumber: string, title: string, category: string, basePrice: number){
        ProductRepository.add(new Music(serialNumber, basePrice, title, category))
    }

    registerMovie( serialNumber: string, title: string, category: string, basePrice: number){
        ProductRepository.add(new Movie(serialNumber, basePrice, title, category))
    }

    registerVideodGame( serialNumber: string, title: string, category: string, basePrice: number, difficultyLevel: DifficultyLevel ){
        ProductRepository.add(new VideoGame(serialNumber, basePrice, title, category, difficultyLevel))
    }
    registerBoardGame( serialNumber: string, title: string, category: string, basePrice: number, difficultyLevel: DifficultyLevel ){
        ProductRepository.add(new BoardGame(serialNumber, basePrice, title, category, difficultyLevel))
    }
    unregisterProduct(product: Product){
        ProductRepository.remove(product);
    }
    async findProduct(filterFunction: (item: Product) => boolean){
        return  await ProductRepository.findBy(filterFunction);
    }
    async findAllProducts(){
        return await ProductRepository.getAll();
    }

}

export default ProductManager;