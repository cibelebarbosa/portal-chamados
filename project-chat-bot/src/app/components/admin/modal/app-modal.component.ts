import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './app-modal.component.html',
  styleUrls: ['./app-modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() chamado: Array<any> = [];
  displayStyle = 'none';
  popUp = 1;

  ngOnInit() {}

  openPopup(value: number) {
    this.popUp = value;
    this.displayStyle = 'block';
  }

  closePopup() {
    this.displayStyle = 'none';
  }

  send() {
    //update no chamado
  }
}
