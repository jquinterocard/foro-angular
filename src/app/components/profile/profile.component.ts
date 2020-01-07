import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';
import {UserService} from '../../services/user.service';
import {TopicService} from '../../services/topic.service';
import {User} from '../../models/user';
import {Topic} from '../../models/topic';
import {global} from '../../services/global';


@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css'],
	providers:[UserService,TopicService]
})
export class ProfileComponent implements OnInit {

	public page_title:string;
	public user:User;
	public topics:Topic[];
	public url;

	constructor(
		private _userService:UserService,
		private _topicService:TopicService,
		private _router:Router,
		private _route:ActivatedRoute)
	{
		this.url = global.url;
	}

	ngOnInit(){
		this._route.params.subscribe(params=>{
			let userId = params['id'];
			this.getUser(userId);
			this.getTopics(userId);
		});
		
	}

	getUser(userId){
		this._userService.getUser(userId).subscribe(
			response=>{
				if(response.user){
					this.user = response.user;
				}else{
					//redireccion
				}
			},
			error=>{
				console.log(error);
			}
			);
	}

	getTopics(userId){
		this._topicService.getTopicsByUser(userId).subscribe(
			response=>{
				if(response.topics){
					this.topics = response.topics;
					console.log(this.topics);
				}
			},
			error=>{
				console.log(error);
			}
			);
	}




}
