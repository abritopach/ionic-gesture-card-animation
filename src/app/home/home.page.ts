import { Component, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';

import { GestureController } from '@ionic/angular';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {

    @ViewChild('card', {read: ElementRef, static: true}) card: ElementRef;

    constructor(private gestureCtrl: GestureController, private renderer: Renderer2) {}

    async ngAfterViewInit() {

        let gesture = await this.gestureCtrl.create({
            el: this.card.nativeElement,
            gestureName: 'card-swipe',
            gesturePriority: 100,
            threshold: 5,
            passive: false,
            onStart: () => {
                console.log('start');
                this.renderer.setStyle(this.card.nativeElement, 'transition', 'none');
            },
            onMove: ev => {
                console.log(ev);
                this.renderer.setStyle(this.card.nativeElement, 'transform', `translateX(${ev.deltaX}px)`);
            },
            onEnd: ev => {
                console.log('end');

                this.renderer.setStyle(this.card.nativeElement, 'transition', '0.4s ease-out');

                if (ev.deltaX > 125) {
                    this.renderer.setStyle(this.card.nativeElement, 'transform', `translateX(400px)`);
                } else if (ev.deltaX < -125) {
                    this.renderer.setStyle(this.card.nativeElement, 'transform', `translateX(-400px)`);
                } else {
                    this.renderer.setStyle(this.card.nativeElement, 'transform', `translateX(0px)`);
                }
            }
         });

        gesture.enable(true);
    }

}
