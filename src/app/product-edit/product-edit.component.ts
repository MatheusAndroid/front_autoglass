import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../domain/product';
import { ProductService } from '../product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  productId: number = 0;
  
  productForm = this.fb.group({
    id: [0],
    name: ['', Validators.required], // Campo nome com validação obrigatória
    active: [true], // Campo ativo com valor inicial true
    manufacturing: [new Date, Validators.required], // Campo data de fabricação com validação obrigatória
    expiration: [new Date, Validators.required], // Campo data de vencimento com validação obrigatória
    supplierCode: ['', Validators.required], // Campo código do fornecedor com validação obrigatória
    supplierDescription: ['', Validators.required], // Campo descrição do fornecedor com validação obrigatória
    cnpj: ['', Validators.required] // Campo CNPJ com validação obrigatória
  }, {
    validators: [this.compareDatesValidator()] // Adiciona o validador personalizado
  });


  constructor(
    @Inject(ProductService) private productService: ProductService,
    @Inject(ActivatedRoute) private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) { }

  compareDatesValidator() {
    return (formGroup: FormGroup) => {
      const manufacturingDate = formGroup.get('manufacturing')?.value;
      const expirationDate = formGroup.get('expiration')?.value;

      if (manufacturingDate && expirationDate && manufacturingDate > expirationDate) {
        return { dates: true }; // Retorna um objeto de erro
      }

      return null; // Validação bem-sucedida
    };
  }

  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.params['id'];
    this.loadProduct(this.productId);
  }

  loadProduct(id: number): void {
    this.productService.getProduct(id)
      .subscribe((product: Product) => {
        const productFormValue: Partial<Product> = {
          ...product,
          manufacturing: new Date(product.manufacturing) as Date,
          expiration: new Date(product.expiration) as Date,
        };
        this.productForm.patchValue(productFormValue);
      });
  }
  goTo(path: Array<String>) {
    this.router.navigate(path);
  }

  saveProduct(): void {
    const newProductEdited: Product = {
      id: this.productForm.value.id as number,
      name: this.productForm.value.name as string,
      active: this.productForm.value.active as boolean,
      manufacturing: this.productForm.value.manufacturing as unknown as Date,
      expiration: this.productForm.value.expiration as unknown as Date,
      supplierCode: this.productForm.value.supplierCode as string,
      supplierDescription: this.productForm.value.supplierDescription as string,
      cnpj: this.productForm.value.cnpj as string,
    };

    this.productService.updateProduct(newProductEdited)
      .subscribe(() => this.goTo(['/products']));
  }
}
