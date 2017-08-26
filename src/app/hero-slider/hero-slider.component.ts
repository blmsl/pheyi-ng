import { Component, OnInit } from '@angular/core';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-hero-slider',
  templateUrl: './hero-slider.component.html',
  styleUrls: ['./hero-slider.component.css']
})
export class HeroSliderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
   /**
    * Initialize JQuery Owl-Carousel Plugin for slider
    */
    var $heroSlider = $('.hero-slider .inner');
    
    if ($heroSlider.length > 0) {
      $heroSlider.each(function () {

          var loop = $(this).parent().data('loop'),
          autoplay = $(this).parent().data('autoplay'),
          interval = $(this).parent().data('interval') || 3000;

        $(this).owlCarousel({
          items: 1,
          loop: loop,
          margin: 0,
          nav: true,
          dots: true,
          navText: [,],
          autoplay: autoplay,
          autoplayTimeout: interval,
          autoplayHoverPause: true,
          smartSpeed: 450
        });

      });
    }
  }

}
