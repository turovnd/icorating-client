import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {WelcomeComponent}   from "./components/welcome/welcome.component";
import {ProjectsComponent}  from "./components/project/projects.component";

const routes: Routes = [
    { path: '',             component: WelcomeComponent },
    { path: 'projects',     component: ProjectsComponent },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule { }