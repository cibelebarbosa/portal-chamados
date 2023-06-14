import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class MasksService {
  telefoneMask(value: string){
    console.log(value);

  }
}
