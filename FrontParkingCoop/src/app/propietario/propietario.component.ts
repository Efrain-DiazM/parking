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
  selector: 'app-propietario',
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
  templateUrl: './propietario.component.html',
  styleUrl: './propietario.component.css'
})
export class PropietarioComponent {

  formPropietario : FormGroup;
  // formTarifa : FormGroup;
  items: MenuItem[] | undefined;
  propietarios: any[] = [];
  // parqueaderos: any[] = [];
  verFormPropietario: boolean = false;
  selectedPropietario: any = {};

  constructor(private api: ApiConection, private fb: FormBuilder) {
    this.api.token = localStorage.getItem('token')
    this.formPropietario = this.fb.group({
      id:[''],
      nombres:['',Validators.required],
      identificacion:['',Validators.required],
      email:['',Validators.required],
      edad:['',Validators.required]

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
        label: 'Ingresar Vehiculo',
        icon: 'pi pi-user',
        routerLink: '/entrada-salida'
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
    // this.listaParqueaderos()
    this.listaPropietarios()
  }

  listar() {
    this.api.get('propietario')
      .subscribe(data => {
        console.log(data);
      })
  }

  listaPropietarios() {
    console.log(this.api.token)
    this.api.get('propietario')
      .subscribe(
        data => {
          this.propietarios = data
        })
        console.log(this.propietarios)
  }

  accionFormularioPropietario(){
    if(this.formPropietario.value['id']){
      this.updatePropietario()
    }else {
      this.addPropietario()
    }
  }

  addPropietario() {
    console.log(this.formPropietario.value)

    this.api.add('propietario/', this.formPropietario.value)
      .subscribe(
        data => {
          console.log(data)
          this.listaPropietarios()
          this.verFormPropietario  = false
          this.formPropietario.reset()
        }
      )
  }

  updatePropietario(){
    this.api.update('propietario', this.formPropietario.value,this.selectedPropietario.id)
      .subscribe(
        data => {
          this.listaPropietarios()
          this.verFormPropietario  = false
          this.formPropietario.reset()
        }
      )
  }

  seleccionarPropietario() {
    this.formPropietario.patchValue(this.selectedPropietario)
    this.verFormPropietario = true
  }

  cancel(){
    this.formPropietario.reset()
    this.verFormPropietario = false
    this.selectedPropietario = {}
  }

}
