//modulos 
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {PanelRoutingModule} from './panel-routing.module';
// se usar para formatear fechas
import {MomentModule} from 'angular2-moment';


//componentes
import { MainComponent } from './components/main/main.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { ListComponent } from './components/list/list.component';

//Servicios
import {UserService} from '../services/user.service';
import {UserGuard} from '../services/user.guard';

//NgModule
@NgModule({
	declarations:[
		MainComponent,
		AddComponent,
		EditComponent,
		ListComponent
	],
	imports:[
		CommonModule,
		FormsModule,
		HttpClientModule,
		PanelRoutingModule,
		MomentModule
	],
	exports:[
		MainComponent,
		AddComponent,
		EditComponent,
		ListComponent
	],
	providers:[UserService,UserGuard]
})

export class PanelModule{}
