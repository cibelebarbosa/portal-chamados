import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-overlay-msg',
  templateUrl: './overlay-msg.component.html',
  styleUrls: ['./overlay-msg.component.scss']
})
export class OverlayMsgComponent implements OnInit {

  @Input() isOpen = false;
  @Input() isOpenMsg = '';

  constructor() { }

  ngOnInit() {
  }

}
