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

  constructor(private productService: ProductService,
    private router: Router){}
  
    ngOnInit():void{  //angular life cycle method -which will be invoked when component is initialised
      this.reloadData();
    }

    reloadData(){
      this.productService.getProductList().subscribe({
        next: (data) => {
          this.products=data; //assign the plain data, no need fro async pipe in the template
        },
        error: (err) => {
          console.error('Error Fetching product list:',err.message);
        }
      });
    }

    addProduct():void{
      this.router.navigate(['/add-product/_add']);
    }

    editProduct(pid:number): void{
      this.router.navigate(['/add-product',pid]);
    }

    productDetails(pid:number):void{
      this.router.navigate(['/product-details', pid]);
    }

    deleteProduct(pid:number):void{
      this.productService.deleteProduct(pid).subscribe({
        next: () => {
          this.message = 'Product deleted successfully.';
          setTimeout(() => {
            this.message = '';
            this.reloadData();  // Refresh products list after deletion
          }, 2000);  // Clear the message after 2 seconds
        },
        error: (err) => {
          console.error('Error deleting product:', err.message);  // Handle the error
          this.message = 'Error deleting product. Please try again later.';
        }
      });
    }

}
