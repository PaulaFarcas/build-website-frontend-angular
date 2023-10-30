import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrderDetails } from '../_model/order-details.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.css']
})
export class BuyProductComponent {


  productDetails:Product[]=[];

  orderDetails:OrderDetails={
    fullName:'',
    fullAddress:'',
    contactNumber:'',
    alternateContractNumber:'',
    orderProductQuantityList:[]

  }

  constructor(private activatedRoute:ActivatedRoute, private productService:ProductService,
              private router:Router){}

  ngOnInit():void{
    this.productDetails=this.activatedRoute.snapshot.data['productDetails'];
    this.productDetails.forEach(
        x=> this.orderDetails.orderProductQuantityList.push(
          {productId:x.productId,quantity:1}
        )
    );
    console.log(this.productDetails);
    console.log(this.orderDetails);
  }
  public placeOrder(orderForm:NgForm){
    this.productService.placeOrder(this.orderDetails).subscribe(
      {
        next: (reponse)=> {
          console.log(reponse);
          orderForm.reset();
          this.router.navigate(["/orderConfirm"]);
        },
        error:(error)=> console.log(error),
        complete:() => console.log('completed')
      }
    );
  }

  public getQuantityForProduct(productId:any){
    const filterProduct = this.orderDetails.orderProductQuantityList
          .filter((productQuantity)=> productQuantity.productId===productId);

    return filterProduct[0].quantity;
  }

  public getCalculatedTotal(productId:any,productDiscountedPrice:any){
    const filteredProduct = this.orderDetails.orderProductQuantityList.filter(
        (productQuanity)=> productQuanity.productId===productId
    );

    return filteredProduct[0].quantity * productDiscountedPrice;
  }

  public onQuantityChange(quantity:any,productId:any){
    this.orderDetails.orderProductQuantityList.filter(
      (orderProduct) => orderProduct.productId===productId
    )[0].quantity = quantity;

  }

  public getCalculatedGrandTotal(){
    let grandTotal=0;

    this.orderDetails.orderProductQuantityList.forEach(
       (productQuantity)=>{
        const price = this.productDetails.filter(
            product=> product.productId ===productQuantity.productId)[0].productDiscountedPrice
         grandTotal+=price*productQuantity.quantity;
      }
    );
    return grandTotal;
  }
}
