import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../domain/product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.params['id'];
    this.loadProduct(this.productId);
  }

  loadProduct(id: number): void {
    this.productService.getProduct(id)
      .subscribe((product: Product) => this.product = product);
  }

  saveProduct(): void {
    this.productService.updateProduct(this.product)
      .subscribe(() => this.router.navigate(['/products']));
  }
}
