import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule  } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-services',
  imports: [RouterModule,CommonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent implements OnInit {
    products : Array<{image : string,price : string ,title : string}> = []
    nextPage : string | null = null
    previousPage : string | null = null

    isMoreActive = true

    constructor(private productService : ProductService){}

    ngOnInit(): void {
        this.loadProducts()
    }

    loadProducts(url? : string ) : void {
        this.productService.getProducts(url)
            .subscribe({
                next : res => {
                    this.products = [...this.products , ...res.results]
                    this.nextPage = res.next
                    this.isMoreActive = res.count == this.products.length ? false : true
                } ,
                error : err => console.log(err)
            })
    }

    loadNextPage(): void {
        if(this.nextPage){
            this.loadProducts(this.nextPage)
        }
    }
}
