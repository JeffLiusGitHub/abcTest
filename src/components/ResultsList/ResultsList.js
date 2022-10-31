import React from 'react';
import './ResultsList.css';
import { ComboboxItem, ComboboxPopover } from 'ariakit/combobox';
/**
 * <ResultsList
 *   items={[...]}
 *   onSelect={item => console.log(item.name)}
 *   className="MyResultsList"
 * />
 *
 * @prop {Array} items List of results of form { name: string, state: { abbreviation: string } }
 * @prop {Function} onSelect Callback to execute when item is selected, accepts object.
 * @prop {mixed} ... All other props will be forwarded to the container DOM node.
 */
export function ResultsList(props) {
	const { className, onSelect, items, combobox, ...otherProps } = props;
	return (
		<ComboboxPopover
			state={combobox}
			className={'ResultsList ' + (className || '')}
			{...otherProps}
		>
			{items.map(function (item, index) {
				return (
					<ComboboxItem
						key={'item' + index}
						className="ResultsList-item"
						value={`${item.name}, ${item.state.abbreviation} ${item.postcode}`}
						onClick={() => onSelect && onSelect(item)}
					>
						<button className="ResultsList-button">
							{item?.name}, {item?.state?.abbreviation} {item?.postcode}
							{/* add postcode, let user search the exact suburb they want */}
						</button>
					</ComboboxItem>
				);
			})}
		</ComboboxPopover>
	);
}
