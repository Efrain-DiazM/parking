// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-users',
//   standalone: true,
//   imports: [],
//   templateUrl: './users.component.html',
//   styleUrl: './users.component.css'
// })
// export class UsersComponent {

// }

import {Component} from '@angular/core';
import {ApiConection} from "../Shared/ApiConection";
import {MenubarModule} from 'primeng/menubar';
import {MenuItem} from "primeng/api";
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import { DialogModule } from 'primeng/dialog';
import {InputTextModule} from "primeng/inputtext";
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    MenubarModule,
    TableModule,
    ButtonModule,
    DialogModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    DropdownModule
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  formUsuario : FormGroup;
  formTarifa : FormGroup;
  items: MenuItem[] | undefined;
  usuarios: any[] = [];
  parqueaderos: any[] = [];
  verFormUsuario: boolean = false;
  selectedUsuario: any = {};

  constructor(private api: ApiConection, private fb: FormBuilder) {
    this.api.token = localStorage.getItem('token')
    this.formUsuario = this.fb.group({
      id:[''],
      parqueadero_id:['',Validators.required],
      // nit :['',Validators.required],
      username:['',Validators.required],
      password:['',Validators.required],
      email:['',Validators.required],
      is_staff:[false],
      first_name:[''],
      last_name:[''],
      direccion:['',Validators.required],
      telefono:['',Validators.required]

    })
    this.formTarifa = this.fb.group({
      id:[''],
      parqueadero_id:['',Validators.required],
      tamano:['',Validators.required],
      precio :['',Validators.required],
    })
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: '/home'
        },
        {
        label: 'Users',
        icon: 'pi pi-user',
        routerLink: '/users'
        },
        {
          label: 'Propietarios',
          icon: 'pi pi-user',
          routerLink: '/propietario'
        },
        {
          label: 'Vehiculos',
          icon: 'pi pi-user',
          routerLink: '/vehiculo'
        },
        {
          label: 'Logout',
          icon: 'pi pi-sign-out',
          command: () => {
            localStorage.removeItem('token');
            // Add any additional logout logic here
          },
          routerLink: '/login'
        }
    ]
    this.listaParqueaderos()
    this.listaUsuarios()
  }

  listar() {
    this.api.get('usuario')
      .subscribe(data => {
        console.log(data);
      })
  }

  listaUsuarios() {
    console.log(this.api.token)
    this.api.get('usuario')
      .subscribe(
        data => {
          this.usuarios = data
        })
        console.log(this.usuarios)
  }
  listaParqueaderos() {
    console.log(this.api.token)
    this.api.get('parqueadero')
      .subscribe(
        data => {
          this.parqueaderos = data
        })
        console.log(this.parqueaderos)
  }

  accionFormularioParqueadero(){
    if(this.formUsuario.value['id']){
      this.updateUsuario()
    }else {
      this.addUsuario()
    }
  }

  addUsuario() {
    console.log(this.formUsuario.value)

    this.api.add('usuario/', this.formUsuario.value)
      .subscribe(
        data => {
          console.log(data)
          this.listaUsuarios()
          this.verFormUsuario  = false
          this.formUsuario.reset()
        }
      )
  }

  updateUsuario(){
    this.api.update('usuario', this.formUsuario.value,this.selectedUsuario.id)
      .subscribe(
        data => {
          this.listaUsuarios()
          this.verFormUsuario  = false
          this.formUsuario.reset()
        }
      )
  }

  seleccionarParqueadero() {
    this.formUsuario.patchValue(this.selectedUsuario)
    this.verFormUsuario = true
  }

  cancel(){
    this.formUsuario.reset()
    this.verFormUsuario = false
    this.selectedUsuario = {}
  }
}
