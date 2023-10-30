import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { MyOrderDetails } from '../_model/order-model';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit{



  displayedColumns: string[] = ['Name', 'Address', 'Contact Number', 'Amount','Status'];

  myOrderDetails:MyOrderDetails[]=[];
  constructor(private productService:ProductService){}

  ngOnInit():void{
    this.getOrderDetails();
  }

  getOrderDetails(){
    this.productService.getMyOrders().subscribe({
      next:(response:MyOrderDetails[])=>{
        console.log(response);
        this.myOrderDetails=response;
      },
      error:(error:any)=>console.log(error),
      complete:()=>console.log("complete")
    })
  }
}
