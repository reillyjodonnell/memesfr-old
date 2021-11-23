import React, { useState } from 'react';

export default function NavbarItem(props) {
  const [openMenu, setOpenMenu] = useState(false);

  function toggleMenu() {
    setOpenMenu((prevState) => !prevState);
  }
  return (
    <>
      <div data-testid="section-1" onClick={toggleMenu}>
        {props.icon}
      </div>
      {openMenu && props.children}
    </>
  );
}
