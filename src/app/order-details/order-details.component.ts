import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit{


  displayedColumns: string[] = ['Id','Product Name','Name','Address','Contact Number','Status','Action'];
  dataSource:any=[];
  status:string="All";

  constructor(private productService:ProductService){}


  ngOnInit():void{
    this.getAllOrderDetailsForAdmin(this.status);
  }
  getAllOrderDetailsForAdmin(status:string){
    this.productService.getAllOrderDetailsForAdmin(status).subscribe({
        next:(response)=>{
          this.dataSource=response;
          console.log(response);
        },
        error:(error)=>console.log(error),
        complete:()=>console.log("complete")
    });
  }


  markAsDelivered(orderId:any){
      console.log(orderId);
      this.productService.markAsDelivered(orderId).subscribe({
        next:(response)=>{
          this.getAllOrderDetailsForAdmin(this.status);
          console.log(response);
        },
        error:(error)=>console.log(error),
        complete:()=>console.log("complete")
    });
  }

}
