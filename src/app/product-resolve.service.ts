import { Injectable } from '@angular/core';
import { Product } from './_model/product.model';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { EventListenerFocusTrapInertStrategy } from '@angular/cdk/a11y';
import { ProductService } from './_services/product.service';
import { ImageProcessingService } from './image-processing.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolveService implements Resolve<Product>{

  constructor(private productService:ProductService,
              private imageProcessingService:ImageProcessingService) { }


  resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<Product>{
    const id=route.paramMap.get("productId");
    if(id){
      return this.productService.getProductDetailsById(id)
      .pipe(
        map(p => this.imageProcessingService.createImages(p))
      );

    }else{
      //return empty product information
        return of(this.getProductDetails());
    }
  }
  

  getProductDetails(){
    return {
      productId:0,
      productName:"",
      productDescription:"",
      productDiscountedPrice:0,
      productActualPrice:0,
      productImages: []
    };
  }
}
