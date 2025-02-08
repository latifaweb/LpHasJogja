import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-katalog',
  templateUrl: './katalog.component.html',
  styleUrls: ['./katalog.component.css']
})
export class KatalogComponent implements OnInit {
  products: any[] = [];
  page: number = 1;
  limit: number = 12;
  isLoading: boolean = false;
  allLoaded: boolean = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    if (this.isLoading || this.allLoaded) return;

    this.isLoading = true;
    this.productService.getProducts(this.page, this.limit).subscribe((data: any[]) => {
      if (data.length === 0) {
        this.allLoaded = true;
      } else {
        this.products = [...this.products, ...data];
        this.page++;
      }
      this.isLoading = false;
    });
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
