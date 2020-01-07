import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';
import {Topic} from '../../models/topic';
import {TopicService} from '../../services/topic.service';


@Component({
	selector: 'app-search',
	templateUrl: '../topics/topics.component.html',
	styleUrls: ['./search.component.css'],
	providers:[TopicService]
})
export class SearchComponent implements OnInit {

	public page_title:string;
	public topics:Topic[];
	public no_paginate;
	

	constructor(
		private _router:Router,
		private _route:ActivatedRoute,
		private _topicService:TopicService)
	{
		this.no_paginate = true;
	}

	ngOnInit() {
		this._route.params.subscribe(params=>{
			let search = params['search'];
			this.page_title = `Resultados de la busqueda: ${search}`;
			this.getTopics(search);
		});
	}

	getTopics(search){
		this._topicService.search(search).subscribe(
			response=>{
				if(response.topics){
					this.topics = response.topics;

					
				}
			},
			error=>{
				console.log(error);
				this.topics = [];
			}
		);
	}

}
