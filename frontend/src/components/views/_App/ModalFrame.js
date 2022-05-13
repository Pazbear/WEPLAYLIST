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
                    background: "rgba(0,0,0,0.4)",
                    zIndex: "1000"
                }}>
            </div>
            <div
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
                    background: "rgba(0,0,0,0.4)",
                    zIndex: "1000"
                }}>
                <div style={{
                    padding: "20px 80px",
                    marginTop: "30px",
                    position: "relative",
                    overflow: "scroll",
                    borderRadius: "10px",
                    background: "#FFFFFF",
                    opacity: 1
                }}>
                    {props.children}
                </div>
            </div>
        </ModalPortal>
    )
}

export default ModalFrame;