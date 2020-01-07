import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';
import {Topic} from '../../../models/topic';
import {UserService} from '../../../services/user.service';
import {TopicService} from '../../../services/topic.service';



@Component({
	selector: 'app-edit',
	//reutilizar la vista del componente add
	templateUrl: '../add/add.component.html',
	styleUrls: ['./edit.component.css'],
	providers:[UserService,TopicService]
})
export class EditComponent implements OnInit {

	public page_title:string;
	public topic:Topic;
	public identity;
	public token;
	public status;
	public is_edit;

	constructor(
		private _router:Router,
		private _route:ActivatedRoute,
		private _userService:UserService,
		private _topicService:TopicService)
	{
		this.page_title = 'Editar tema';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.topic = new Topic('','','','','','',this.identity._id,null);
		this.is_edit = true;
	}

	ngOnInit() {
		this.getTopic();
	}

	getTopic(){
		//recoger el parametro de la url
		this._route.params.subscribe(params=>{
			let id = params['id'];
			this._topicService.getTopic(id).subscribe(
				response=>{
					if(!response.topic){
						this._router.navigate(['/panel']);
					}else{
						//rellenar el formulario con los datos del topic encontrado
						this.topic = response.topic;
					}
					
				},
				error=>{
					console.log(error);
				}
				);
		});
	}

	onSubmit(form){
		let id = this.topic._id;
		this._topicService.update(this.token,id,this.topic).subscribe(
			response=>{
				if(response.topic){
					this.status='success';
					this.topic = response.topic;

				}else{
					this.status='error';
				}
			},
			error=>{
				this.status='error';
				console.log(error);
			}
			);

	}

}