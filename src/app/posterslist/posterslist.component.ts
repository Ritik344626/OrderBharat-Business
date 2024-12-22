import { Component, HostListener, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { TokenService } from "../Services/token.service";
import MessagingserviceComponent from "../messagingservice/messagingservice.component";
import { environment } from "../../environments/environment";
declare var $: any;

@Component({
  selector: 'app-posterslist',
  templateUrl: './posterslist.component.html',
  styleUrls: ['./posterslist.component.scss'],
})
export class PosterslistComponent  implements OnInit {
  categoryName: any;
  posters: any;

  constructor(
    private Token: TokenService,
    private httpclient: HttpClient,
    private router: Router   
  ) {   
  }

  loading: boolean = true;
  response: any;
  categoriesWithPosters: any[] = [];
  poster_category: any;


  ngOnInit(): void {
 
 //   this.user_id = localStorage.getItem("user_id");
   this.poster_category = localStorage.getItem("poster_category");
  // const posterCategory = localStorage.getItem('poster_category');
 // localStorage.removeItem("order_bharat_posters_id");

    this.getallcategoryposters();
  }


  getallcategoryposters() {
   console.log(this.poster_category);
    this.loading = true;  // Start loader

    this.httpclient
      .post(environment.apiBaseUrl + "getallcategoryposters", [
        {
          api_key: environment.apikey,
          postercategory: this.poster_category
        },
      ])
      .subscribe((res: any) => {
        this.response = res;

        if (this.response.success == true) {
           const categoriesWithPosters = res.data.categories_with_posters;

          if (categoriesWithPosters && categoriesWithPosters.length > 0) {
            this.categoryName = categoriesWithPosters[0].category_name;
          }

          this.posters = res.data.categories_with_posters[0].posters;

        } else {
          // Handle error case
        }


        this.loading = false;  // Stop loader
      }, (error) => {
        // Handle error case
        this.loading = false;  // Stop loader even if there's an error
      });
  }

  goBack() {  
   
      this.router.navigate(['/home']);
  }

  posterview(id: any) {

  //  console.log(id);
   localStorage.setItem("order_bharat_posters_id", id);
    this.router.navigate(["/posterview"]);
  }


}


