import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';
import {Topic} from '../../../models/topic';
import {UserService} from '../../../services/user.service';
import {TopicService} from '../../../services/topic.service';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers:[UserService,TopicService]
})
export class ListComponent implements OnInit {
	public page_title:string;
	public topics:Array<Topic>;
	public identity;
	public token;
	public status;


  constructor(
  	private _router:Router,
  	private _route:ActivatedRoute,
  	private _userService:UserService,
  	private _topicService:TopicService
  	){
  	this.page_title='Mis Temas';
  	this.identity = this._userService.getIdentity();
  	this.token = this._userService.getToken();
  }

  ngOnInit() {
  	this.getTopics();
  }

  getTopics(){
  	var user_id = this.identity._id;

  	this._topicService.getTopicsByUser(user_id).subscribe(
  		response=>{
  			if(response.topics){
  				this.topics = response.topics;
  			}
  		},
  		error=>{
  			console.log(error);
  		}
  		);
  }

  deleteTopic(id){
    if(confirm('Estas seguro de borrar este tema?')){
      this._topicService.delete(this.token,id).subscribe(
        response=>{
          if(response.topic){
            this.status='success';
            this.getTopics();
          }
          
        },
        error=>{
          this.status='error';
          console.log(error);
        }
      );
    }
  }





}
