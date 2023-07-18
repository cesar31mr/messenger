import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';

const appRouter: Routes = [
    {path: 'registro', component: RegistroComponent},
    {path: '', component: LoginComponent}
]

export const appRoutingProviders : any[] = [];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(appRouter);