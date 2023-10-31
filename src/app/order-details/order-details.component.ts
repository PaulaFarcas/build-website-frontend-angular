import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit{


  displayedColumns: string[] = ['Id','Product Name','Name','Address','Contact Number','Status'];
  dataSource:any=[];

  constructor(private productService:ProductService){}


  ngOnInit():void{
    this.getAllOrderDetailsForAdmin();
  }
  getAllOrderDetailsForAdmin(){
    this.productService.getAllOrderDetailsForAdmin().subscribe({
        next:(response)=>{
          this.dataSource=response;
          console.log(response);
        },
        error:(error)=>console.log(error),
        complete:()=>console.log("complete")
    });
  }

}
