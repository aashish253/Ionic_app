import { Component, OnInit } from "@angular/core";
import { NavController, ModalController } from "@ionic/angular";
import { AuthenticateService } from "../services/authentication.service";
@Component({
  selector: "app-chip",
  templateUrl: "./chip.page.html",
  styleUrls: ["./chip.page.scss"]
})
export class ChipPage implements OnInit {
  userEmail: string;

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService
  ) {}

  ngOnInit() {
    if (this.authService.userDetails()) {
      this.userEmail = this.authService.userDetails().email;
    } else {
      this.navCtrl.navigateBack("");
    }
  }

  logout() {
    this.authService
      .logoutUser()
      .then(res => {
        console.log(res);
        this.navCtrl.navigateBack("");
      })
      .catch(error => {
        console.log(error);
      });
  }
}
