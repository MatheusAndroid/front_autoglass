// product-detail.component.ts
import { Component, OnInit, Inject } from '@angular/core';
import { Product } from '../domain/product';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  productId: number = 0;
  product: Product = {
    id: 0,
    name: '',
    active: false,
    manufacturing: new Date(),
    expiration: new Date(),
    supplierCode: '',
    supplierDescription: '',
    cnpj: ''
  };

  constructor(
    @Inject(ProductService) private productService: ProductService,
    @Inject(ActivatedRoute) private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.params['id'];
    this.loadProduct(this.productId);
  }

  loadProduct(id: number): void {
    this.productService.getProduct(id)
      .subscribe((product: Product) => this.product = product);
  }
}
