import { Component, OnInit } from '@angular/core';
import { Product } from '../domain/product';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  newProduct: Product = {
    id: 0, // Inclua um ID inicial para o novo produto
    name: '',
    active: true,
    manufacturing: new Date(),
    expiration: new Date(),
    supplierCode: '',
    supplierDescription: '',
    cnpj: ''
  };

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void { }

  saveProduct(): void {
    this.productService.addProduct(this.newProduct) // Salve o novo produto
      .subscribe(() => {
        this.router.navigate(['/products']); // Volte para a lista após salvar
      });
  }
}
