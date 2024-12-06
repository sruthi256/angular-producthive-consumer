import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { Product } from '../../model/product';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  //observable is a type to handle asynchronous data streams
  products:Observable<Product[]> | any;
  message:string='';

  constructor(private productservice: ProductService,
    private router: Router){}
  
    ngOnInit():void{
      this.reloadData();
    }

    reloadData(){
      this.productservice.getProductList().subscribe({
        next: (data) => {
          this.products=data; //assign the plain data, no need fro async pipe in the template
        },
        error: (err) => {
          console.error('Error Fetching product list:',err.message);
        }
      });
    }

}
