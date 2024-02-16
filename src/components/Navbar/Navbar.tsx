import React from 'react';
import { Navbar, Tile } from 'react-bulma-components';
import './Navbar.css';

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
			</Navbar>
	);
}

export default NavbarTop;
