import React from 'react';
import './App.css';
import { dic } from "./dictionary";

function App() {

	const handleSearch = search => console.log(search.target.value)

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
				<Search onSearch={handleSearch}/>
				<hr/>
				<List dic={dic}/>
			</div>
  )
}

function Search(props){
	
	const [ searchTerm, setSearchTerm] = React.useState('');

	const handleChange = change => {
			setSearchTerm(change.target.value);
			props.onSearch(change);
	}

	return (
		<div>
			<label htmlFor="search">Search: </label>
			<input id="search" type="text" onChange={handleChange}/>
			<p> Searching for <strong> {searchTerm}</strong></p>
		</div>
	)
}


function List(props){
	return (
			<div> 
			{props.dic.map(
					(item, i) =>  
						<div key={i}>
							<a href={item.url}>{item.word}</a>
							<p>{ Object.entries(item.definitions) }</p>
							<hr/>
						</div>
			)}
			</div>
	)
}

export default App;
