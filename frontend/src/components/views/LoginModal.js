import React from 'react';
import { useNavigate } from 'react-router-dom'
import ModalFrame from './_App/ModalFrame';
import { Formik } from 'formik';
import * as Yup from 'yup'
import { Input, Space, Button } from 'antd';
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import Logo from '../../assets/WEPLAYLIST_logo.png'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../_actions/user_actions';

const LoginModal = (props) => {
    const dispatch = useDispatch()

    return (
        <ModalFrame setOnModal={props.setOnModal}>
            <div>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={Yup.object({
                        email: Yup.string().email('이메일 형식이 아닙니다.'),
                        password: Yup.string()
                            .min(6, '6자 이상 12자 이하로 적어주세요')
                            .max(12, '6자 이상 12자 이하로 적어주세요')
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        let dataToSubmit = {
                            email: values.email,
                            password: values.password
                        }
                        dispatch(loginUser(dataToSubmit))
                            .then(response => {
                                localStorage.setItem('jwtToken', response.payload.access_token)
                                window.location.replace('/')
                            }).catch(error => {
                                console.error(error)
                            })
                        setSubmitting(false)
                    }}>
                    {formik => (
                        <form onSubmit={formik.handleSubmit}>
                            <Space direction='vertical'>
                                <img src={Logo} />
                                <Input
                                    size='large'
                                    placeholder="이메일을 입력해주세요"
                                    prefix={<UserOutlined className="site-form-item-icon" />}
                                    {...formik.getFieldProps('email')}
                                />
                                {formik.touched.email && formik.errors.email ? (
                                    <div style={{ "color": "red" }}>{formik.errors.email}</div>
                                ) : null}
                                <Input.Password size='large' placeholder="비밀번호를 입력해주세요"
                                    {...formik.getFieldProps('password')} />
                                {formik.touched.password && formik.errors.password ? (
                                    <div style={{ "color": "red" }}>{formik.errors.password}</div>
                                ) : null}
                                <Space direction='horizontal'>
                                    <button type='submit' className="btn btn-primary">로그인</button>
                                    <Button onClick={() => props.setOnModal(false)}>닫기</Button>
                                </Space>
                            </Space>
                        </form>
                    )}
                </Formik>
            </div>
        </ModalFrame>
    )
}

export default LoginModal