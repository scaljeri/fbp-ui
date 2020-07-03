import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  templateUrl: './random-number-generator.component.html',
  styleUrls: ['./random-number-generator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RandomNumberGeneratorComponent implements OnInit {

  public value: number;

  constructor() { }

  ngOnInit() {
    setInterval(() => {
     this.value = Math.random();
    }, 1000);
  }

}
