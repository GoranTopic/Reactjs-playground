import React from 'react';
import './App.css';
import { dict } from "./dictionary";

function App() {

	const [searchTerm, setSearchTerm] = React.useState('react');

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
				<Search search={searchTerm} onSearch={handleChange}/>
				<hr/>
				<List dict={searchedDict}/>
			</div>
  )
}

function Search( {search, onSearch} ){
		/*fuction for returning search component*/
	return (
		<div>
			<label htmlFor="search">Search: </label>
			<input id="search" type="text" value={search} onChange={onSearch}/>
		</div>
	)
}

//for every Item in the list pass the Itme into an Item component 
const List = ({dict}) => dict.map( (item, iter) => <Item key = {iter} item={item}/> )




const Item = ({item}) => {
	/* item fuction for rendering a single word*/
	return (
			<div> 
				<a href={item.url}>{item.word}</a>
				<p>{Object.entries(item.definitions)}</p>
				<hr/>
			</div>
	)
}

export default App;
