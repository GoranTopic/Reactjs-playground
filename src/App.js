import React from 'react';
import './App.css';
import { dict } from "./dictionary_short_half";

function App() {

		// make a reducer for manageing the state of the entries
	const dictReducer = (state, action) =>{
			switch (action.type){
				case 'SET_ENTRIES':
					return action.payload;
				case 'REMOVE_ENTRY':
					return state.filter( entry => entry.word !== action.payload.word );
				default:
					throw new Error();
			}
	}

		//make dipatcher for the dict reducer
	const [ entries, dispathcEntries ] = React.useReducer(dictReducer, [] );

	const useSemiPersistentSate = key => { 
			const [value, setValue] = React.useState( localStorage.getItem(key) || '');
			React.useEffect( (key) => { localStorage.setItem(key, value)} , [value] );
			return [value, setValue];
	}

		// get state fuctions
	const [ searchTerm, setSearchTerm] = useSemiPersistentSate('search')

		// state to hold the words and fo the dict
	//const [entries, setEntries ] = React.useState([]);
		// save infromations weather the async Promis is still wating for data
	const [isLoading, setIsLoading ] = React.useState(true);
		// record wheather the promise got an error
	const [isError, setIsError ] = React.useState(false);

	const getAsyncEntries = () => new Promise( resolve => setTimeout( () => resolve({data: { entries: dict }}), 200 ) );

	React.useEffect(() => {
			setIsLoading(true)
			getAsyncEntries()
					.then(result => {
							dispathcEntries({
									type: 'SET_ENTRIES',
									payload: result.data.entries
							});
							setIsLoading(false);
					})
					.catch(() => {
							setIsError(true)
					})
			}, []) 


	
		// handle the change by seting the state variable to 
	const handleChange = change => setSearchTerm(change.target.value);
	
		// filter the dic with the searchedterm 
		console.log(entries)
	const searchedDict = searchTerm.length >= 1?  entries.filter( entry => entry.word.includes(searchTerm) ) : []

		// remove entry handler
	const RemoveEntry = entry => dispathcEntries({ type: 'REMOVE_ENTRY', payload: entry})
	
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
				{ isError && <p> something whent wrong</p>}
				{isLoading ? (
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
