import { Component, OnInit } from '@angular/core';
import { Movie } from '../../../models/movie.model';
import { MovieService } from '../../../services/movie.service';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.model';
import { Options } from '@angular-slider/ngx-slider/options';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
selector: 'app-movie-list',
templateUrl: './movie-list.component.html',
styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
movies: Movie[] = [];
user: User | null = null;

currentRate = 0;
 type?:any;

	

// slider code
// value: number = 5;
//   options: Options = {
//     showTicksValues: true,
//     stepsArray: [
//       { value: 1, legend: "Very poor" },
//       { value: 2 },
//       { value: 3, legend: "Fair" },
//       { value: 4 },
//       { value: 5, legend: "Average" },
//       { value: 6 },
//       { value: 7, legend: "Good" },
//       { value: 8 },
//       { value: 9, legend: "Excellent" }
//     ]
//   };




constructor(private movieService: MovieService, private authService: AuthService,config: NgbModalConfig, private modalService: NgbModal,private route: ActivatedRoute) { 
  config.backdrop = 'static';
		config.keyboard = false;
    config.size= 'lg';
}

ngOnInit(): void {
// for routing
this.route.paramMap.subscribe((params: ParamMap) => {
  this.type = params.get('type');
});


this.movieService.getMovieList().subscribe((movies) => {
this.movies = movies;
});
this.authService.getCurrentUser().subscribe((user: User | null) => {
this.user = user;
});
}


open(content:any) {
  this.modalService.open(content);
}

ariaValueText(current: number, max: number) {
  return `${current} out of ${max} hearts`;
}
}