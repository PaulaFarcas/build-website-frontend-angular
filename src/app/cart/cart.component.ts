import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{


  displayedColumns: string[] = ['Name','Description','Price','DiscountedPrice'];
  cartDetails:any =[];

  constructor(private productService:ProductService){}

  ngOnInit():void{
    this.getCartDetails();
  }

  getCartDetails(){
    this.productService.getCartDetails().subscribe({
      next:(response)=>{
        console.log(response);
        this.cartDetails=response;
      },
      error:(error)=>console.log(error),
      complete:()=>console.log("complete")
    }
    );
  }
}
