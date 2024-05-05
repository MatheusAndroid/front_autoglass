import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './domain/product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl: string = 'http://localhost:3000/products'; // URL base da API

  constructor(private http: HttpClient) { }

  // Método para obter lista de produtos
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  // Método para obter um produto específico
  getProduct(id: number): Observable<Product> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Product>(url);
  }

  // Método para criar um novo produto
  addProduct(product: Product): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<any>(this.baseUrl, product, httpOptions);
  }

  // Método para atualizar um produto existente
  updateProduct(product: Product): Observable<any> {
    const url = `${this.baseUrl}/${product.id}`;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put<any>(url, product, httpOptions);
  }
  deleteProduct(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.delete<any>(url, httpOptions);
  }

}
