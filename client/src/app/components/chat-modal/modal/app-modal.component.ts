import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './app-modal.component.html',
  styleUrls: ['./app-modal.component.scss'],
})
export class AppModal implements OnInit {
  displayStyle = 'none';
  textSend: string = '';
  conversation: Array<string> = [];
  teste = '';

  constructor() {}

  ngOnInit() {}

  openPopup() {
    this.displayStyle = 'block';
  }
  closePopup() {
    this.displayStyle = 'none';
    this.teste = '';
  }

  send() {
    let textFromatted = '';
    this.conversation.push(this.textSend);
    this.conversation.forEach((e) => {
      textFromatted = textFromatted + e + ' ';
    });
    this.teste = textFromatted;
    this.textSend = '';
  }
}
