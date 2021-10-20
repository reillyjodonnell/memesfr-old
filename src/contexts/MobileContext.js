import React, { useContext, useState, useEffect } from 'react';

const MobileContext = React.createContext();

export function useMobile() {
  return useContext(MobileContext);
}

export default function MobileProvider({ children }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    let mount = true;
    if (mount) {
      if (
        navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/iPod/i) ||
        navigator.userAgent.match(/BlackBerry/i) ||
        navigator.userAgent.match(/Windows Phone/i)
      ) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }
    return () => {
      mount = false;
    };
  }, []);

  const values = { isMobile };

  return (
    <MobileContext.Provider value={values}>{children}</MobileContext.Provider>
  );
}
