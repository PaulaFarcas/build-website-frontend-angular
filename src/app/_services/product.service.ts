import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../_model/product.model';
import { OrderDetails } from '../_model/order-details.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor( private httpCLient:HttpClient) { }

  public addProduct(product:FormData){
    return this.httpCLient.post<Product>("http://localhost:9090/addNewProduct",product);
  }

  public getAllProducts(pageNumber:any,searchKey:string=""){
    return this.httpCLient.get<Product[]>("http://localhost:9090/getAllProducts?pageNumber="+pageNumber+"&searchKey="+searchKey);
  }

  public getProductDetailsById(productId:any){
    return this.httpCLient.get<Product>("http://localhost:9090/getProductDetailsById/"+productId);
  }

  public deleteProduct(productId:Number){
    return this.httpCLient.delete("http://localhost:9090/deleteProductDetails/"+productId);
  }

  public getProductDetails(isSingleProductCheckout:any,productId:any){
    return this.httpCLient.get<Product[]>("http://localhost:9090/getProductDetails/"+isSingleProductCheckout+"/"+productId);
  }
  public placeOrder(orderDetails:OrderDetails,isSingleProductCheckout:any){
    return this.httpCLient.post("http://localhost:9090/placeOrder/"+isSingleProductCheckout,orderDetails);
  }

  public addToCart(productId:any){
    return this.httpCLient.get("http://localhost:9090/addToCart/"+productId);
  }

  public getCartDetails(){
    return this.httpCLient.get("http://localhost:9090/getCartDetails")
  }
} 
