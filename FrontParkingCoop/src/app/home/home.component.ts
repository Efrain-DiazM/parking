import {Component} from '@angular/core';
import {ApiConection} from "../Shared/ApiConection";
import {MenubarModule} from 'primeng/menubar';
import {MenuItem} from "primeng/api";
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import { DialogModule } from 'primeng/dialog';
import {InputTextModule} from "primeng/inputtext";
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MenubarModule,
    TableModule,
    ButtonModule,
    DialogModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  formParqueadero : FormGroup;
  formTarifa : FormGroup;
  items: MenuItem[] | undefined;
  parqueaderos: any[] = [];
  verFormParqueadero: boolean = false;
  selectedParqueadero: any = {};

  constructor(private api: ApiConection, private fb: FormBuilder) {
    this.api.token = localStorage.getItem('token')
    this.formParqueadero = this.fb.group({
      id:[''],
      nombre:['',Validators.required],
      nit :['',Validators.required],
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
        label: 'Vehiculos',
        icon: 'pi pi-user',
        routerLink: '/vehiculo'
      },
      {
        label: 'Ingresar Vehiculo',
        icon: 'pi pi-user',
        routerLink: '/entrada-salida'
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => {
          console.log('logout')
          this.api.logout();
          localStorage.removeItem('token');
          // Add any additional logout logic here
        },
        routerLink: '/login'
      }
    ]
    this.listaParqueaderos()
  }

  listar() {
    this.api.get('parqueadero')
      .subscribe(data => {
        console.log(data);
      })
  }

  listaParqueaderos() {
    console.log(this.api.token)
    this.api.get('parqueadero')
      .subscribe(
        data => {
          this.parqueaderos = data
        })
  }

  accionFormularioParqueadero(){
    if(this.formParqueadero.value['id']){
      this.updateParqueadero()
    }else {
      this.addParqueadero()
    }
  }

  addParqueadero() {

    this.api.add('parqueadero/', this.formParqueadero.value)
      .subscribe(
        data => {
          this.listaParqueaderos()
          this.verFormParqueadero  = false
          this.formParqueadero.reset()
        }
      )
  }

  updateParqueadero(){
    this.api.update('parqueadero', this.formParqueadero.value,this.selectedParqueadero.id)
      .subscribe(
        data => {
          this.listaParqueaderos()
          this.verFormParqueadero  = false
          this.formParqueadero.reset()
        }
      )
  }

  seleccionarParqueadero() {
    this.formParqueadero.patchValue(this.selectedParqueadero)
    this.verFormParqueadero = true
  }

  cancel(){
    this.formParqueadero.reset()
    this.verFormParqueadero = false
    this.selectedParqueadero = {}
  }
}
