import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Product } from '../_model/product.model';
import { MatDialog } from '@angular/material/dialog';
import { ShowProductImagesDialogComponent } from '../show-product-images-dialog/show-product-images-dialog.component';
import { ImageProcessingService } from '../image-processing.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.css']
})
export class ShowProductDetailsComponent implements OnInit{
  showLoadMoreProduct=false;
  showTable=false;
  productDetails:Product[]=[];
  displayedColumns: string[] = ['Id', 'Product Name', 'description', 'Product Discounted Price', 'Product Actual Price','Actions'];
  pageNumber:number=0;

  constructor(private productService:ProductService,
              public imagesDialog:MatDialog,
              private imageProcessingService:ImageProcessingService,
              private router:Router){}

  ngOnInit(): void{
    this.getAllProducts();
  }

  public getAllProducts(searchKeyWord:string=""){
    this.showTable=false;
    this.productService.getAllProducts(this.pageNumber,searchKeyWord)
    .pipe(
      map((x:Product[],i:any)=> x.map((product:Product)=> this.imageProcessingService.createImages(product)))
    )
    .subscribe({ 
          next:(resp:Product[])=>{
            console.log(resp);
            resp.forEach(
              product=> this.productDetails.push(product));
            this.showTable=true;
            if(resp.length==12){
              this.showLoadMoreProduct=true;
            }else{
              this.showLoadMoreProduct=false;
            }
          },
          error:(error)=>console.log(error),
          complete:()=> console.log('complete')
          
      }
    );
  }


  loadMoreproduct(){
    this.pageNumber+=1;
    this.getAllProducts();
  }

  deleteProduct(productId: any){
    this.productService.deleteProduct(productId).subscribe({
        next:(resp)=> this.getAllProducts(),
        error:(error)=> console.log(error),
        complete:()=> console.log('complete')

    });
  }

  showImages(product:Product){
    console.log(product);
    this.imagesDialog.open(ShowProductImagesDialogComponent,{
      data:{
        images:product.productImages
      },
      height:'500px',
      width:'800px'
    });
  }

  editproductDetails(productId:any){
    this.router.navigate(['/addNewProduct',{productId}]);
  }

  searchByKeyWord(searchkeyword:any){
    console.log(searchkeyword);
    this.pageNumber=0;
    this.productDetails=[];
    this.getAllProducts(searchkeyword);
  }
}
