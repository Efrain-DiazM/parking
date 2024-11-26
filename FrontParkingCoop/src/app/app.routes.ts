import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import { UsersComponent } from './users/users.component';
import { PropietarioComponent } from './propietario/propietario.component';
import { VehiculoComponent } from './vehiculo/vehiculo.component';
import { EntradaSalidaComponent } from './entrada-salida/entrada-salida.component';
import {AuthGuard} from "./Shared/auth.guard";

export const routes: Routes = [
  {path : 'login', component : LoginComponent},
  {path : 'home',component:  HomeComponent,canActivate :[AuthGuard]},
  {path : 'users',component:  UsersComponent,canActivate :[AuthGuard]},
  {path : 'propietario',component:  PropietarioComponent,canActivate :[AuthGuard]},
  {path : 'vehiculo',component:  VehiculoComponent,canActivate :[AuthGuard]},
  {path : 'entrada-salida',component:  EntradaSalidaComponent,canActivate :[AuthGuard]},

  {path:"**",redirectTo:"login"}
];
