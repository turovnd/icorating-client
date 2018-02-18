import { NgModule }      from '@angular/core';
import { FormsModule }   from "@angular/forms";
import { HttpModule }    from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";

import 'materialize-css';
import { MaterializeModule } from 'angular2-materialize';
import { ChartsModule } from 'ng2-charts';

import { AppComponent }         from "./components/app/app.component";
import { HeaderComponent }      from "./components/header/header.component";
import { WelcomeComponent }     from "./components/welcome/welcome.component";
import { ProjectsComponent }    from "./components/project/projects.component";
import { ICOsComponent }    from "./components/icos/icos.component";

import { CookieService }        from 'angular2-cookie/services/cookies.service';

import { AppRoutingModule }     from './app-routing.module';


@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        AppRoutingModule,
        MaterializeModule,
        ChartsModule
    ],
    declarations: [
        AppComponent,
        HeaderComponent,
        WelcomeComponent,
        ProjectsComponent,
        ICOsComponent,
    ],
    providers: [
        CookieService,
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule { }