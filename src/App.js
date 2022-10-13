import React, { useState, useEffect, useCallback } from 'react';
import { ResultsList } from './components/ResultsList/ResultsList';
import { Input } from './components/Input/Input';
import { Button } from './components/Button/Button';
import './App.css';
import { SearchContainer } from './SearchContainer';
import axios from 'axios';

const API_URL = 'http://localhost:8010/proxy/suburbs.json?q=';

export default function App() {
	const [value, setValue] = useState('');
	const [data, setData] = useState([]);
	const [suburb, setSuburb] = useState('');
	const inputChangeHandler = (value) => {
		setValue(value);
	};

	const fetchData = useCallback(async (value) => {
		try {
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
		} catch (err) {
			alert(err);
		}
	}, []);

	useEffect(() => {
		if (value) {
			fetchData(value);
		}
	}, [value, fetchData]);

	const onSelectHandler = (item) => {
		setValue(item.name);
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
				<label aria-label="Suburb">Suburb</label>
				<Input
					type="text"
					value={value}
					onChange={(e) => inputChangeHandler(e)}
					placeholder="Type to search suburb"
				/>
				<Button onClick={buttonClickHandler} />
			</SearchContainer>
			{data?.length > 0 && (
				<ResultsList
					items={data}
					onSelect={(item) => {
						onSelectHandler(item);
					}}
				/>
			)}
		</section>
	);
}
