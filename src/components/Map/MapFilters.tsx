import React from 'react';
import { Form } from 'react-bulma-components';
function MapFilters() {
	return (
		<div style={{position: "absolute", top: "30px", left: "30px"}} className={'map--filters'}>
			<div>
				<Form.Checkbox>MUALA</Form.Checkbox>
			</div>
			<div>
				<Form.Select>
					<option>Cena</option>
					<option>Option 1</option>
					<option>Option 2</option>
					<option>Option 3</option>
				</Form.Select>
			</div>
			<div>
				<Form.Select>
					<option>Rodzaj</option>
					<option>Option 1</option>
					<option>Option 2</option>
					<option>Option 3</option>
				</Form.Select>
			</div>
		</div>
	);
}

export default MapFilters;
