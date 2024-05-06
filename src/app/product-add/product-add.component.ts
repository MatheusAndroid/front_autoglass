import { Component, OnInit } from '@angular/core';
import { Product } from '../domain/product';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {

  productForm = this.fb.group({
    id: [0],
    name: ['', Validators.required], // Campo nome com validação obrigatória
    active: [true], // Campo ativo com valor inicial true
    manufacturing: ['', Validators.required], // Campo data de fabricação com validação obrigatória
    expiration: ['', Validators.required], // Campo data de vencimento com validação obrigatória
    supplierCode: ['', Validators.required], // Campo código do fornecedor com validação obrigatória
    supplierDescription: ['', Validators.required], // Campo descrição do fornecedor com validação obrigatória
    cnpj: ['', Validators.required] // Campo CNPJ com validação obrigatória
  }, {
    validators: [this.compareDatesValidator()] // Adiciona o validador personalizado
  });
  constructor(private productService: ProductService, private router: Router, private fb: FormBuilder) {
  }

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

  ngOnInit(): void { }

  goTo(path: Array<String>) {
    this.router.navigate(path);
  }
  saveProduct(): void {
    const newProduct: Product = {
      id: this.productForm.value.id as number,
      name: this.productForm.value.name as string,
      active: this.productForm.value.active!.toString() as unknown as boolean,
      manufacturing: this.productForm.value.manufacturing as unknown as Date,
      expiration: this.productForm.value.expiration as unknown as Date,
      supplierCode: this.productForm.value.supplierCode as string,
      supplierDescription: this.productForm.value.supplierDescription as string,
      cnpj: this.productForm.value.cnpj as string,
    };

    this.productService.addProduct(newProduct) // Salve o novo produto
      .subscribe(() => {
        this.router.navigate(['/products']); // Volte para a lista após salvar
      });
  }
}
