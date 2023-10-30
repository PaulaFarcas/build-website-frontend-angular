import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-product-view-details',
  templateUrl: './product-view-details.component.html',
  styleUrls: ['./product-view-details.component.css']
})
export class ProductViewDetailsComponent implements OnInit{

  selectedProductIndex=0;

  product: Product={
    productId:0,
    productName:"",
    productDescription:"",
    productDiscountedPrice:0,
    productActualPrice:0,
    productImages: []
  }

  constructor(private activatedRoute:ActivatedRoute,
              private router:Router,
              private productService:ProductService){}

  ngOnInit():void{
    this.product = this.activatedRoute.snapshot.data['product'];
    console.log(this.product);
  }

  changeIndex(index: number){
    this.selectedProductIndex=index;
  }

  buyProduct(productId:any){
    this.router.navigate(['/buyProduct',{
      isSingleProductCheckout:true,id:productId
    }
  
  ]);
  }

  addToCart(productId:any){
    this.productService.addToCart(productId).subscribe({
        next:(response)=>console.log(response),
        error:(error)=>console.log(error),
        complete:()=>console.log("complete")
    });
  }
  

}
