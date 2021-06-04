
import { Component, ViewChild } from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import * as jQuery from 'jquery';
declare var $: any;


@Component({selector: 'app-home',
templateUrl: './home.component.html',
styleUrls: ['./home.component.css']
})
export class HomeComponent {

  ngOnInit(): void {

    const menuToggle= document.querySelector(".menu-bars");
    const nav = document.querySelector("nav ul");


    menuToggle.addEventListener("click", () => {
      nav.classList.toggle("slide");
      });

  }


}

