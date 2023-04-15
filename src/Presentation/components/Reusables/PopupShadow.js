import React from 'react';

const styles = {
    height: "100vh",
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    background: "rgba(0, 0, 0, 0.50)",
    zIndex: "1000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };


const PopupShadow = ({children}) => {
  return (
    <div style={styles}>
        {children}
    </div>
  )
}

export default PopupShadow