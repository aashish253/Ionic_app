import { Product, CartService } from "./../../services/cart.service";
import { Component, OnInit } from "@angular/core";
import { ModalController, AlertController } from "@ionic/angular";

@Component({
  selector: "app-cart-modal",
  templateUrl: "./cart-modal.page.html",
  styleUrls: ["./cart-modal.page.scss"]
})
export class CartModalPage implements OnInit {
  constructor(
    private cartService: CartService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) {}

  cart: Product[] = [];

  ngOnInit() {
    this.cart = this.cartService.getCart();
    console.log(this.cart);
  }

  decreaseCartItem(product) {
    this.cartService.decreaseProduct(product);
  }

  increaseCartItem(product) {
    this.cartService.addProduct(product);
  }

  removeCartItem(product) {
    this.cartService.removeProduct(product);
  }

  getTotal() {
    return this.cart.reduce((i, j) => i + j.price * j.amount, 0);
  }

  close() {
    this.modalCtrl.dismiss();
  }

  async checkout() {
    let alert = await this.alertCtrl.create({
      header: "Thanks for your order",
      message: "We will deliver it to you as soon as possible",
      buttons: ["OK"]
    });

    alert.present().then(() => {
      this.modalCtrl.dismiss();
    });
  }
}
