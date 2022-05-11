import React from 'react';
import ModalFrame from './_App/ModalFrame';

const LoginModal = (props) => {
    return (
        <ModalFrame setOnModal={props.setOnModal}>
            <div>모달</div>
        </ModalFrame>
    )
}

export default LoginModal