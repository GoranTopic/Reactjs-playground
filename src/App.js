import React from 'react';
import './App.css';
import { dict } from "./dictionary_super_short";

function App() {

	const useSemiPersistentSate = key => { 
			const [value, setValue] = React.useState( localStorage.getItem(key) || '');
			React.useEffect( key => localStorage.setItem(key, setValue) , [value] );
			return [value, setValue];
	}
		// get state fuctions
	const [ searchTerm, setSearchTerm] = useSemiPersistentSate('search')
	
	// handle the change by seting the state variable to 
	const handleChange = change => setSearchTerm(change.target.value);
	
	// filter the dic with the searchedterm 
	const searchedDict = searchTerm.length >= 1?  dict.filter( entry => entry.word.includes(searchTerm) ) : []


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

//const List = ({dict}) => dict.map( (item, iter) => <Item key = {iter}  {...item}/> )
	/*for every Item in the list pass the Itme into an Item component */

const List = ({dict}) => dict.map( (item, iter) => <Item key = {iter}  {...item}/> )
	/*for every Item in the list pass the Itme into an Item component */


const Item = ({ word, url, definitions }) => {
	/* item fuction for rendering a single word*/
	return (
			<div> 
				<a href={url}>{word}</a>
				<p>{Object.entries(definitions)}</p>
				<hr/>
			</div>
	)
}

export default App;
