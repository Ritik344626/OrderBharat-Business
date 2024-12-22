import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TokenService } from '../Services/token.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {

  constructor(
    private Token: TokenService,
    private httpclient: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {}

  chats() {
    this.router.navigate(['/chats']);
  }

  friends() {
    this.router.navigate(['/friends']);
  }

  invite() {
    this.router.navigate(['/invite']);
  }
  posts() {
    this.router.navigate(['/posts']);
  }
  invitepending() {
    this.router.navigate(['/invitepending']);
  }

  postsadd() {
    this.router.navigate(['/postsadd']);
  }
}
