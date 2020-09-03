import React from 'react';
import './App.css';
import { dict } from "./dictionary";

function App() {

	const [searchTerm, setSearchTerm] = React.useState('');

	const handleChange = change => setSearchTerm(change.target.value);
	
	
	const searchedDict = dict.filter( entry => entry.word.includes(searchTerm) );

	const data ={
			greeting : "React",
			title : "Dictionary",
	}

	function greet(){
		return data.greeting + " " + data.title
	}


  return (
			<div>
				<h1>{greet()}</h1>
				<Search onSearch={handleChange}/>
				<hr/>
				<List dict={searchedDict}/>
			</div>
  )
}

function Search(props){

	return (
		<div>
			<label htmlFor="search">Search: </label>
			<input id="search" type="text" onChange={props.onSearch}/>
		</div>
	)
}


function List(props){
	return (
			<div> 
			{props.dict.map(
					(item, i) =>  
						<div key={i}>
							<a href={item.url}>{item.word}</a>
							<p>{Object.entries(item.definitions)}</p>
							<hr/>
						</div> )}
			</div>
	)
}

export default App;
