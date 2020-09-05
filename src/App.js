import React from 'react';
import './App.css';
import { dict } from "./dictionary_short_half";

function App() {

		// make a reducer for manageing the state of the entries
	const dictReducer = (state, action) =>{
		switch (action.type){
			case 'SET_FETCH_INIT':
				return { 
					...state, 
					isLoading: true,
					isError: false 
				};
			case 'SET_FETCH_SUCCESS':
				return {
					...state,
					isLoading: false,
					isError: false,
					data: action.payload,
				};
			case 'SET_FETCH_FAILED':
				return {
					...state,
					isLoading: false,
					isError: true,
				};
			case 'REMOVE_ENTRY':
				return {
					...state, 
					data: state.data.filter( entry => entry.word !== action.payload.word ),
				}
			default:
				throw new Error();
		}
	}

		// make dipatcher for the dict reducer nad set initial state
 	const [entries, dispatchEntries] = React.useReducer( dictReducer, {data: [], IsLoading: false, isError: false } );


	const useSemiPersistentSate = key => { 
			const [value, setValue] = React.useState( localStorage.getItem(key) || '');
			React.useEffect( (key) => { localStorage.setItem(key, value)} , [value] );
			return [value, setValue];
	}

		// get state fuctions
	const [ searchTerm, setSearchTerm] = useSemiPersistentSate('search')

	const getAsyncEntries = () => new Promise( (resolve, reject) => setTimeout( () => resolve({data: { entries: dict }}), 200 ) );

		// use effect to load up the data for the inital state
	React.useEffect(() => {
		dispatchEntries({ type: 'SET_FETCH_INIT'});
		getAsyncEntries()
			.then( result => dispatchEntries({ type: 'SET_FETCH_SUCCESS', payload: result.data.entries }) )
			.catch( () => dispatchEntries({ type: 'SET_FETCH_FAILED' }) );
	}, []);

		// handle the change by seting the state variable to 
	const handleChange = change => setSearchTerm(change.target.value);
	
		// filter the dic with the searchedterm 
	const searchedDict = searchTerm.length >= 1?  entries.data.filter( entry => entry.word.includes(searchTerm.toLowerCase()) ) : []

		// remove entry handler
	const RemoveEntry = entry => dispatchEntries({ type: 'REMOVE_ENTRY', payload: entry})
	
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
				{ entries.isError && <p> something went wrong</p>}
				{ entries.isLoading ? (
						<p> Loading...</p>
				):(
						<List dict={searchedDict} onRemoveItem={RemoveEntry}/>
				)}
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
const List = ({dict, onRemoveItem }) => dict.map( (item, iter) => <Item key={iter}  {...item} onRemoveItem={onRemoveItem}/> )

const Item = ({ word, url, definitions, onRemoveItem }) => {
	/* item fuction for rendering a single word*/
		
	return (
			<>
				<a href={url}>{word}</a>
				<p>{Object.entries(definitions)}</p>
				<button type="button" onClick={() => onRemoveItem({ "word": word })}> Dissmiss </button>
				<hr/>
			</>
		)
}

export default App;
