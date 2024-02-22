import React from 'react';
import { Navbar, Tile } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import './Navbar.css';

function showInfoModal () {
	const body = document.querySelector('body') as HTMLElement;
	const modal = document.querySelector('div.info_modal') as HTMLElement;

	modal.style.display="block";
	setTimeout(() => {
		body.classList.add('show-info-modal');
	}, 1)
}

function NavbarTop() {
	return (
			<Navbar
				color="primary"
				active={true}
				textSize={3}
			>
				<Navbar.Brand
					alignItems={"center"}
				>
						<Tile
								textWeight={"semibold"}
								ml={5}
								textFamily={"monospace"}
								style={{textTransform: "uppercase"}}
						>
							Food
							<span style={{color: "black", fontWeight: "bold"}}>Hub</span>
						</Tile>
				</Navbar.Brand>

				<span onClick={showInfoModal} className='info'><FontAwesomeIcon icon={faCircleInfo}/></span>
			</Navbar>
	);
}

export default NavbarTop;
