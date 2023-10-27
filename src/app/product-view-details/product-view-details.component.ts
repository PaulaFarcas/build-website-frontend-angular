import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../_model/product.model';

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
              private router:Router){}

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
}
