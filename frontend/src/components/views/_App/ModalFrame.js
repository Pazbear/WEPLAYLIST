import React from 'react'
import ModalPortal from './ModalPortal'

const ModalFrame = (props) => {
    return (
        <ModalPortal>
            <div onClick={() => props.setOnModal(false)}
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "fixed",
                    left: "0",
                    top: "0",
                    textAlign: "center",
                    zIndex: "1000"
                }}>
                <div style={{
                    height: "400px",
                    width: "600px",
                    marginTop: "70px",
                    position: "relative",
                    overflow: "scroll",
                    borderRadius: "10px",
                    background: "#141414"
                }}>
                    {props.children}
                    <button className="close" onClick={() => props.setOnModal(false)}>
                        X
                    </button>
                </div>
            </div>
        </ModalPortal>
    )
}

export default ModalFrame;