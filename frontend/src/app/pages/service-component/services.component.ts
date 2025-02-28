import { Component, OnInit } from '@angular/core';
import { RouterModule} from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-services',
  imports: [RouterModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent implements OnInit{
    products : Array<{
        image : string
        price : string
        title : string
    }> = []

    constructor(
        private productService : ProductService
    ){}

    ngOnInit(): void {
        this.productService.getProducts()
            .subscribe({
                next : res => this.products = res ,
                error : err => console.log(err)
            })
    }
}
