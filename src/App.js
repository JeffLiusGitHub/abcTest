import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ResultsList } from './components/ResultsList/ResultsList';
// import { Input } from './components/Input/Input';
import '../src/components/Input/Input.css';
import { Button } from './components/Button/Button';
import './App.css';
import { SearchContainer } from './SearchContainer';
import axios from 'axios';
import { Combobox, useComboboxState } from 'ariakit/combobox';
import useDebounce from './components/hooks/useDebounce';

const API_URL = 'http://localhost:8010/proxy/suburbs.json?q=';

export default function App() {
	const [data, setData] = useState([]);
	const [suburb, setSuburb] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const combobox = useComboboxState({
		gutter: 12,
		sameWidth: true,
	});

	let value = useMemo(() => {
		return combobox.value;
	}, [combobox]);
	const debouncedSearchValue = useDebounce(value, 600);
	const inputChangeHandler = (value) => {
		combobox.setValue(debouncedSearchValue);
	};

	const fetchData = useCallback(async (value) => {
		try {
			setIsLoading(true);
			const res = await axios.get(`${API_URL}${value}`);
			setData(
				res?.data
					?.filter((item) =>
						item.name.toLowerCase().startsWith(value.toLowerCase())
					)
					.map((item) => {
						let { name, postcode, state } = item;
						return { name, postcode, state };
					})
			);
			setIsLoading(false);
			// user can type both uppercase and lowercase to search the result
		} catch (err) {
			alert(err);
		}
	}, []);

	useEffect(() => {
		if (debouncedSearchValue) {
			fetchData(debouncedSearchValue);
		}
	}, [debouncedSearchValue, fetchData]);

	const onSelectHandler = (item) => {
		setSuburb(item.name);
	};

	const buttonClickHandler = () => {
		if (suburb) {
			alert(`Your most recent suburb selection is ${suburb}.`);
		} else {
			alert('Please select the suburb first.');
		}
	};

	return (
		<section>
			<SearchContainer>
				<label aria-label="Suburb" htmlFor="Suburb">
					Suburb
				</label>
				<Combobox
					state={combobox}
					id="Suburb"
					type="text"
					className="Input"
					value={value}
					onChange={(e) => inputChangeHandler(e)}
					placeholder="Type to search"
				/>
				<Button onClick={buttonClickHandler} />
			</SearchContainer>
			{isLoading ? <p>Loading...</p> : null}
			{data?.length > 0 && (
				<ResultsList
					combobox={combobox}
					items={data}
					onSelect={(item) => {
						onSelectHandler(item);
					}}
				/>
			)}
		</section>
	);
}
