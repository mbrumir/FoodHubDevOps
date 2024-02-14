import React from 'react';
import { Navbar, Tile } from 'react-bulma-components';

function NavbarTop() {
	return (
			<Navbar
				color="primary"
				fixed="top"
				active={true}
				textSize={3}
			>
				<Navbar.Brand
					alignItems={"center"}
					py={3}
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
