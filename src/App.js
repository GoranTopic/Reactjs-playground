import React from 'react';
import logo from './logo.svg';
import './App.css';
import { dic } from "./dictionary";

function App() {

	const data ={
			greeting : "React",
			title : "Dictionary",
	}

	function greet(){
		return data.greeting + " " + data.title 
	}

		//for each of the keys 
		//	print the key 

  return (
			<div>
				<h1>{greet()}</h1>
				<label htmlFor="search">Search: </label>
				<input id="search" type="text"/>
				<hr/>
				<List/>
			</div>
  );
}

function List() {
	return (
			<div> 
			{dic.map((item, i) => { return (
						<div key={i}>
						<a href={item.url}>{item.word}</a>
						<p>{ Object.entries(item.definitions) }</p>
						<hr/>
						</div>
			)})}
			</div>
	)
}

export default App;
