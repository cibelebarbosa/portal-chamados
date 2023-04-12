import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './app-modal.component.html',
  styleUrls: ['./app-modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() chamado: Array<any> = [];
  displayStyle = 'none';

  ngOnInit() {}

  openPopup() {
    this.displayStyle = 'block';
  }

  closePopup() {
    this.displayStyle = 'none';
  }

  send() {
    //update no chamado
  }
}
