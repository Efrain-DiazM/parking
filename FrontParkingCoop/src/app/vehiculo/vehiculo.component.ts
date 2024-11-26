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
  selector: 'app-vehiculo',
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
  templateUrl: './vehiculo.component.html',
  styleUrl: './vehiculo.component.css'
})
export class VehiculoComponent {

  formVehiculo : FormGroup;
  // formTarifa : FormGroup;
  items: MenuItem[] | undefined;
  vehiculos: any[] = [];
  propietarios: any[] = [];
  parqueaderos: any[] = [];
  verFormVehiculo: boolean = false;
  selectedVehiculo: any = {};

  constructor(private api: ApiConection, private fb: FormBuilder) {
    this.api.token = localStorage.getItem('token')
    this.formVehiculo = this.fb.group({
      id:[''],
      propietario_id:['',Validators.required],
      parqueadero_id:['',Validators.required],
      placa:['',Validators.required]

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
    this.listaPropietarios()
    this.listaVehiculos()
  }

  listar() {
    this.api.get('vehiculo')
      .subscribe(data => {
        console.log(data);
      })
  }

  listaVehiculos() {
    console.log(this.api.token)
    this.api.get('vehiculo')
      .subscribe(
        data => {
          this.vehiculos = data
        })
        console.log(this.vehiculos)
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

  listaParqueaderos() {
    console.log(this.api.token)
    this.api.get('parqueadero')
      .subscribe(
        data => {
          this.parqueaderos = data
        })
        console.log(this.parqueaderos)
  }

  accionFormularioVehiculo(){
    if(this.formVehiculo.value['id']){
      this.updateVehiculo()
    }else {
      this.addVehiculo()
    }
  }

  addVehiculo() {
    console.log(this.formVehiculo.value)

    this.api.add('vehiculo/', this.formVehiculo.value)
      .subscribe(
        data => {
          console.log(data)
          this.listaVehiculos()
          this.verFormVehiculo  = false
          this.formVehiculo.reset()
        }
      )
  }

  updateVehiculo(){
    this.api.update('vehiculo', this.formVehiculo.value,this.selectedVehiculo.id)
      .subscribe(
        data => {
          this.listaVehiculos()
          this.verFormVehiculo  = false
          this.formVehiculo.reset()
        }
      )
  }

  seleccionarVehiculo() {
    this.formVehiculo.patchValue(this.selectedVehiculo)
    this.verFormVehiculo = true
  }

  cancel(){
    this.formVehiculo.reset()
    this.verFormVehiculo = false
    this.selectedVehiculo = {}
  }

}
