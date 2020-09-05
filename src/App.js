import React from 'react';
import './App.css';


const API_ENDPOINT = 'https:/hn.algolia.com/api/v1/search?query=';


function App() {

		// make a reducer for manageing the state of the stories
		const storiesReducer = (state, action) =>{
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
						case 'REMOVE_STORIES':
								console.log(action.payload)
								return {
										...state, 
										data: state.data.filter( story => story.objectID !== action.payload.objectID ),
								}
						default:
								throw new Error();
				}
		}

		// define dispatcher for the stories 
		const [stories, dispatchStories] = React.useReducer( storiesReducer, {data: [], IsLoading: false, isError: false } );


		// fuction for make a persitant state
		const useSemiPersistentSate = key => { 
				const [value, setValue] = React.useState( localStorage.getItem(key) || '');
				React.useEffect( (key) => { localStorage.setItem(key, value)} , [value] );
				return [value, setValue];
		}
		// get state fuctions
		const [ searchTerm, setSearchTerm] = useSemiPersistentSate('search');

		// handle the change by seting the state variable to 
		const handleSearchChange = change => setSearchTerm(change.target.value);

		const handleSearchSubmit = () => { setUrl(`${API_ENDPOINT}${searchTerm}`) };

		// load asyc Stories
		//const getAsyncStories = () => new Promise( (resolve, reject) => setTimeout( () => resolve({data: {}}), 200 ) );

		// new definition of the url 
		const [url, setUrl] = React.useState(`${API_ENDPOINT}${searchTerm}`)
		// use effect to load up the data for the inital state
		const handleFetchStories = React.useCallback(() => {
				if(!searchTerm) return;
				// set the state as loading 
				dispatchStories({ type: 'SET_FETCH_INIT'});
				// fetch with APIA the word react?
				fetch(url)
				// traslate to json
						.then( response => response.json() )
				// dispatch succes result and dat to state 
						.then( result => dispatchStories({
								type: 'SET_FETCH_SUCCESS', 
								payload: result.hits,
						}))
						.catch( () => dispatchStories({ type: 'SET_FETCH_FAILED' }) );
		}, [url]);

		React.useEffect(() => { handleFetchStories(); }, [handleFetchStories]);

		// filter the stories with the searchedterm 
		//const searchedStories = stories.data.filter( story => story.title? story.title.includes(searchTerm.toLowerCase()): null )

		// remove entry handler
		const RemoveStory = story => dispatchStories({ type: 'REMOVE_STORIES', payload: story})
	

		return (
				<div>
					<h1>Imanalla to React Stories</h1>
					<InputWithLabel id="search" type="text" isFocuse value={searchTerm} onInputChange={handleSearchChange}>
						<strong>Search:</strong>
					</InputWithLabel>
					<button type="button" disable={!searchTerm} onClick={handleSearchSubmit}>
						Search
					</button>
				<hr/>
					{ stories.isError && <p> something went wrong</p> }
					{ stories.isLoading ? (
							<p> Loading...</p>
						):(
							<List list={stories.data} onRemoveItem={RemoveStory}/>
						)}
				</div>
		)
}


const InputWithLabel = ({ id, type, value, onInputChange, isFocused, children }) => {
		/* A component with the Input and a Label */
		// Define an input ref for passing to input component
		const inputRef = React.useRef()
		// set up a side effect it is updates if the focus changes
		React.useEffect(() => { if(isFocused && inputRef.current) inputRef.current.focused(); }, [isFocused])
		return <>
						<label htmlFor={id}> {children} </label>
						&nbsp;
						<input id={id} ref={inputRef} type={type} value={value} onChange={onInputChange}/>
					</>
}

const List = ({list , onRemoveItem }) => {
		/*for every Item in the list pass the item into an Item component */
		return list.map( (item, iter) => <Item key={iter}  {...item} onRemoveItem={onRemoveItem}/> )
}

const Item = (item) => {
	/* item fuction for rendering a single word*/
	const { title, url, author, created_at,  num_comments, points, onRemoveItem } = item;
	return (
			<>
				<div>
				<a href={url}>{title}</a>
				<p>by: {author}</p>
				<p>comments: {num_comments}</p>
				<p>points: {points}</p>
				<p>date: {created_at}</p>
			</div>
				<button type="button" onClick={() => onRemoveItem(item)}> Dissmiss </button>
				<hr/>
			</>
		)
}

export default App;
