import path from "path"
import {promises as fs} from 'fs';

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};


export async function getProducts():Promise<Product[]> {

  const filepath = path.join(process.cwd(), 'data', 'products.json');
  const data = await fs.readFile(filepath, 'utf-8');

  return JSON.parse(data);
}


export async function getProduct(id: string):Promise<Product | undefined>{

  const products = await getProducts();
  return products.find(item => item.id === id)
}


export async function checkProductAndReturn(id:string) {

  let finalProductName:string = "";

  if (id === "women" || id === "man") {
    finalProductName = id;
  } 
  else {
    const product = await getProduct(id);

    if (product !== undefined) {
      finalProductName = product.name;
    }
  }

  return finalProductName;
}
