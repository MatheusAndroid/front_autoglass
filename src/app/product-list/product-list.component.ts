import { Component, OnInit } from '@angular/core';
import { Product } from '../domain/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = []; // Array para armazenar produtos

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts(); // Carregue produtos na inicialização
  }

  loadProducts(): void {
    this.productService.getProducts() // Obtenha produtos do serviço
      .subscribe(products => this.products = products);
  }

  deleteProduct(product: Product): void {
    this.productService.deleteProduct(product.id) // Exclua o produto pelo ID
      .subscribe(() => this.loadProducts()); // Recarregue a lista após a exclusão
  }
}