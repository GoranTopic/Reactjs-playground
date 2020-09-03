import React from 'react';
import './App.css';
import { dict } from "./dictionary_super_short";

function App() {

	const useSemiPersistentSate = key => { 
			const [value, setValue] = React.useState( localStorage.getItem(key) || 'react');
			React.useEffect( (key) => localStorage.setItem(key, value), [value] );
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
				<InputWithLabel id="search" type="text" isFocuse value={searchTerm} onInputChange={handleChange}>
					<strong>Search:</strong>
				</InputWithLabel>
				<hr/>
				<List dict={searchedDict}/>
			</div>
  )
}


const InputWithLabel = ({ id, type, value, onInputChange, isFocused, children }) => {
	/*A component with the Input and a Label*/
		const inputRef = React.useRef()
		
		React.useEffect(() => { if(isFocused && inputRef.current) inputRef.current.focused(); }, [isFocused])

		return <>
						<label htmlFor={id}> {children} </label>
						&nbsp;
						<input id={id} ref={inputRef} type={type} value={value} onChange={onInputChange}/>
					</>
}

/*for every Item in the list pass the Itme into an Item component */
const List = ({dict}) => dict.map( (item, iter) => <Item key = {iter}  {...item}/> )


const Item = ({ word, url, definitions }) => {
	/* item fuction for rendering a single word*/
	return (
			<>
				<a href={url}>{word}</a>
				<p>{Object.entries(definitions)}</p>
				<hr/>
			</>
		)
}

export default App;
