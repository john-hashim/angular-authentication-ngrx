import { Component } from "@angular/core";
import { BannerComponent } from "src/app/shared/components/banner/banner.component";
import { ErrorMessageComponent } from "src/app/shared/components/errorMessage/errorMessage.component";
import { FeedTogglerComponent } from "src/app/shared/components/feedToggler/feedToggler.component";

@Component({
  selector: "mc-your-feed",
  templateUrl: "./yourFeed.component.html",
  standalone: true,
  imports: [BannerComponent, ErrorMessageComponent, FeedTogglerComponent],
})
export class YourFeedComponent {
  
}
