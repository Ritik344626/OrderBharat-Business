import { Component, Optional } from "@angular/core";
import { IonRouterOutlet, Platform } from "@ionic/angular";
import { App } from "@capacitor/app";
import { register } from "swiper/element/bundle";
register();
@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    @Optional() private routerOutlet?: IonRouterOutlet
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.backButton.subscribeWithPriority(-1, () => {
      console.log("Handler A was called!");
      if (!this.routerOutlet.canGoBack()) {
        App.exitApp();
      }
    });
  }
}
