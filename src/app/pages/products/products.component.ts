import { Component, OnInit } from '@angular/core';
import { CreateProductModelDto, ProductModel, UpdateProductModelDto } from 'src/app/entities/product.model';
import { ProductHttpService } from 'src/app/services/products.service';


@Component({
  selector: 'app-product',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {

  products: ProductModel[] = [];
  selectedProduct: UpdateProductModelDto = {id: 0,title:'', price:0, description:''};

  constructor(private productHttpService: ProductHttpService) {}

  ngOnInit(): void {
    this.getProducts();
    //this.getProduct();
    //this.updateProduct();
    //this.createProduct();
    //this.deleteProduct();
  }
 getProducts(){
   this.productHttpService.getAll().subscribe(
    response=>{
       this.products= response
      console.log(response)}
      )
 }
 getProduct(id:ProductModel['id']){
   this.productHttpService.getOne(id).subscribe(
    response=>{
      console.log(response)})
 }
 createProduct(product: CreateProductModelDto){
  this.productHttpService.store(product).subscribe(
    response=>{
      console.log(response)})
 }
 editProduct(product:ProductModel){
  this.selectedProduct = product
 }
 updateProduct(id: ProductModel['id'], product: UpdateProductModelDto){
  this.productHttpService.update(id,product).subscribe(
    response => {
      console.log(response)})
 }
 deleteProduct(id:ProductModel['id']){
  this.productHttpService.destroy(id).subscribe(
    response => {
      this.products= this.products.filter(product => product.id != id);
      console.log(response)})
 }

}
