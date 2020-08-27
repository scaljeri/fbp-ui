import { Component, OnInit, ChangeDetectionStrategy, NgZone, ChangeDetectorRef } from '@angular/core';

@Component({
  templateUrl: './random-number-generator.component.html',
  styleUrls: ['./random-number-generator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RandomNumberGeneratorComponent implements OnInit {

  public value: number;

  constructor(private ngZone: NgZone, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    // this.ngZone.runOutsideAngular(() => {
    //   setInterval(() => {
    //     this.value = Math.random();
    //     this.cdr.detectChanges();
    //   }, 1000);
    // });
  }

}
