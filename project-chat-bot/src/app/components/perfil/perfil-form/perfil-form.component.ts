import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../../services/repository.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-perfil-form',
  templateUrl: './perfil-form.component.html',
  styleUrls: ['./perfil-form.component.scss'],
})
export class PerfilFormComponent implements OnInit {
  cursos: any = [];
  perfilForm: FormGroup = new FormGroup({
    aluno: new FormControl(''),
    ra: new FormControl(''),
    curso: new FormControl(0),
    telefone: new FormControl(''),
    titulo: new FormControl(''),
    descricao: new FormControl(''),
  });
  constructor(private repository: RepositoryService) {}

  ngOnInit(): void {
    this.repository.getCursos().subscribe((res) => {
      this.cursos = res.result;
    });
  }

  submit() {
    let formValues = this.perfilForm.value;
    formValues.curso = parseInt(formValues.curso);
    formValues.ra = parseInt(formValues.ra);
    this.repository.save(formValues).subscribe((data) => console.log(data));
  }
}
