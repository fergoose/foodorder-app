import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchTerm:string = '';
  //adding modifier allows class to access param. Without, only constructor can access
  constructor(activatedRoute:ActivatedRoute, private router:Router) {
    activatedRoute.params.subscribe((params) => {
      if(params.searchTerm) this.searchTerm = params.searchTerm;
    });
  }

  ngOnInit(): void {
  }

  //search method
  search(term:string):void{
    if(term)
    this.router.navigateByUrl('/search/'+ term);
  }

}
