import {Injectable} from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

import {global} from './global';

@Injectable()
export class TopicService{

	public url:string;


	constructor(
		private _http:HttpClient
		)
	{
		this.url = global.url;
	}

	addTopic(token,topic):Observable<any>{
		let params = JSON.stringify(topic);
		let headers = new HttpHeaders().set('Content-Type','application/json')
		.set('Authorization',token);
		return this._http.post(`${this.url}topic`,params,{headers:headers});
	}

	getTopicsByUser(user_id):Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.get(`${this.url}user-topics/${user_id}`,{headers:headers});
	}

	getTopic(id):Observable<any>{
		return this._http.get(`${this.url}topic/${id}`);
	}

	update(token,id_topic,topic):Observable<any>{
		let params = JSON.stringify(topic);
		let headers = new HttpHeaders().set('Content-Type','application/json')
										.set('Authorization',token);
		return this._http.put(`${this.url}topic/${id_topic}`,params,{headers:headers});
	}

	delete(token,id_topic):Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json')
										.set('Authorization',token);
		return this._http.delete(`${this.url}topic/${id_topic}`,{headers:headers});
	}

	getTopics(page=1):Observable<any>{
		return this._http.get(`${this.url}topics/${page}`);
	}

	search(searchString):Observable<any>{
		return this._http.get(`${this.url}search/${searchString}`);
	}

	
}
