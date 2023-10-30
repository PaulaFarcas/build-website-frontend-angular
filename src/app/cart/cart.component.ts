import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{


  displayedColumns: string[] = ['Name','Description','Price','DiscountedPrice','Action'];
  cartDetails:any =[];

  constructor(private productService:ProductService,
    private router:Router){}

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

  checkout(){
    this.router.navigate(['/buyProduct',{
      isSingleProductCheckout:false,id:0
    }
  ]);
  }

  delete(cartId:any){
    console.log(cartId);
    this.productService.deleteCartItem(cartId).subscribe({
      next:(response)=>{
        console.log(response);
        this.getCartDetails();
      },
      error:(error)=>console.log(error),
      complete:()=>console.log("complete")
    })
  }
}
