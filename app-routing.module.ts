import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {WelcomeComponent}   from "./components/welcome/welcome.component";
import {ProjectsComponent}  from "./components/project/projects.component";
import {ICOsComponent}  from "./components/icos/icos.component";

const routes: Routes = [
    { path: '',             component: WelcomeComponent },
    { path: 'projects',     component: ProjectsComponent },
    { path: 'icos',         component: ICOsComponent },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule { }