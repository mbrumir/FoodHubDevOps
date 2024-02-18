import React from 'react';
import { Form } from 'react-bulma-components';
import './MapFilters.css';

// function activeHandle (e: React.MouseEvent<HTMLSelectElement, MouseEvent>) {
//     const target = e.target as HTMLElement;
// 	const select = target.closest('div') as HTMLElement;
// 	const test = document.querySelector('.type-select') as HTMLElement;

// 	if (!select.classList.contains('active')) {
// 		select.classList.add('active');
// 	} else {
// 		select.classList.remove('active');
// 	}
// }

function handleGlobalClick (e: MouseEvent) {
	const target = e.target as HTMLElement;
	const priceSelect = document.querySelector('.price-select') as HTMLElement;
	const typeSelect = document.querySelector('.type-select') as HTMLElement;
	const creatorSelect = document.querySelector('.creator-select') as HTMLElement;

	const removeActiveSelects = () => {
		const allActiveSelects = document.querySelectorAll('.active');

		allActiveSelects.forEach(select => {
			select.classList.remove('active');
		})
	}

	if (target.closest('div')?.classList.contains('price-select')) {
		priceSelect.classList.toggle('active');
		typeSelect.classList.remove('active');
		creatorSelect.classList.remove('active');

	} else if (target.closest('div')?.classList.contains('type-select')) {
		typeSelect.classList.toggle('active');
		priceSelect.classList.remove('active');
		creatorSelect.classList.remove('active');

	} else if (target.closest('div')?.classList.contains('creator-select')) {
		creatorSelect.classList.toggle('active');
		priceSelect.classList.remove('active');
		typeSelect.classList.remove('active');

	} else {
		removeActiveSelects();
	}
}

function MapFilters() {
	React.useEffect(() => {
		document.addEventListener('click', handleGlobalClick);
	})
	return (
		<div className={'map--filters'}>
			{/* <div>
				<Form.Checkbox>MUALA</Form.Checkbox>
			</div> */}
			<div>
				<Form.Select className={'creator-select'}>
					<option>Twórca</option>
					<option>Option 1</option>
					<option>Option 2</option>
					<option>Option 3</option>
				</Form.Select>
			</div>
			<div>
				<Form.Select className={'type-select'}>
					<option>Rodzaj</option>
					<option>Option 1</option>
					<option>Option 2</option>
					<option>Option 3</option>
				</Form.Select>
			</div>
			<div>
				<Form.Select className={'price-select'}>
					<option>Cena</option>
					<option>Option 1</option>
					<option>Option 2</option>
					<option>Option 3</option>
				</Form.Select>
			</div>
		</div>
	);
}

export default MapFilters;
