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

        const windowWidth = window.innerWidth;
        const gesture = await this.gestureCtrl.create({
            el: this.card.nativeElement,
            gestureName: 'card-swipe',
            gesturePriority: 100,
            threshold: 5,
            passive: false,
            onStart: () => {
                // Do something as the gesture begins.
                console.log('start');
                this.renderer.setStyle(this.card.nativeElement, 'transition', 'none');
            },
            onMove: ev => {
                // Do something in response to movement.
                console.log(ev);
                this.renderer.setStyle(this.card.nativeElement, 'transform', `translateX(${ev.deltaX}px) rotate(${ev.deltaX / 20}deg)`);
            },
            onEnd: ev => {
                // Do something when the gesture ends.
                console.log('end');

                this.renderer.setStyle(this.card.nativeElement, 'transition', '0.3s ease-out');

                if (ev.deltaX > windowWidth/2) {
                    this.renderer.setStyle(this.card.nativeElement, 'transform', `translateX(${windowWidth * 1.5}px)`);
                } else if (ev.deltaX < -windowWidth/2) {
                    this.renderer.setStyle(this.card.nativeElement, 'transform', `translateX(-${windowWidth * 1.5}px)`);
                } else {
                    this.renderer.setStyle(this.card.nativeElement, 'transform', `translateX(0px)`);
                }
            }
         });

        gesture.enable(true);
    }

}
