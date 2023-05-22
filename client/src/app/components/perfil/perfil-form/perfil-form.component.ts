import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../../services/repository.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-perfil-form',
  templateUrl: './perfil-form.component.html',
  styleUrls: ['./perfil-form.component.scss'],
})
export class PerfilFormComponent implements OnInit {
  msgError = '';
  sucesso: boolean = false;
  cursos: any = [];
  perfilForm: FormGroup = this.formBuilder.group({
    aluno: ['', [Validators.required]],
    ra: ['', [Validators.required]],
    curso: ['', [Validators.required]],
    telefone: ['', [Validators.required]],
    titulo: ['', [Validators.required]],
    descricao: ['', [Validators.required]],
  });
  constructor(private repository: RepositoryService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.repository.getCursos().subscribe((res) => {
      this.cursos = res.result;
    });
  }

  submit() {
    if (!this.perfilForm.valid) {
      this.msgError = 'Formulário inválido'
      return;
    }
    let formValues = this.perfilForm.value;
    formValues.curso = parseInt(formValues.curso);
    formValues.ra = parseInt(formValues.ra);
    this.repository.save(formValues).subscribe((data) => {
      this.sucesso = true;
      if (!data.error) {
        this.perfilForm.reset();
        setTimeout(() => {
          this.sucesso = false;
        }, 3000);
      } else {
        console.log(data.error);
      }
      this.perfilForm.reset();
    });
  }
}
