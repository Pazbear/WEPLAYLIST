import React from 'react';
import { useNavigate } from 'react-router-dom'
import ModalFrame from './_App/ModalFrame';
import { Formik } from 'formik';
import * as Yup from 'yup'
import { Input, Space, Button } from 'antd';
import { MailOutlined, UserOutlined } from '@ant-design/icons';
import Logo from '../../assets/WEPLAYLIST_logo.png'
import { useDispatch } from 'react-redux';
import { registerUser } from '../../_actions/user_actions';

const RegisterModal = (props) => {
    const dispatch = useDispatch()

    return (
        <ModalFrame setOnModal={props.setOnModal}>
            <div>
                <Formik
                    initialValues={{ email: '', username: '', password: '' }}
                    validationSchema={Yup.object({
                        email: Yup.string().email('이메일 형식이 아닙니다.'),
                        username: Yup.string()
                            .min(2, '2자 이상 12자 이하로 적어주세요')
                            .max(12, '2자 이상 12자 이하로 적어주세요'),
                        password: Yup.string()
                            .min(6, '6자 이상 12자 이하로 적어주세요')
                            .max(12, '6자 이상 12자 이하로 적어주세요')
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        let dataToSubmit = {
                            email: values.email,
                            username: values.username,
                            password: values.password
                        }
                        dispatch(registerUser(dataToSubmit))
                            .then(response => {
                                alert('성공적으로 회원가입했습니다.')
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
                                    prefix={<MailOutlined className="site-form-item-icon" />}
                                    {...formik.getFieldProps('email')}
                                />
                                {formik.touched.email && formik.errors.email ? (
                                    <div style={{ "color": "red" }}>{formik.errors.email}</div>
                                ) : null}
                                <Input
                                    size='large'
                                    placeholder="닉네임을 입력해주세요"
                                    prefix={<UserOutlined className="site-form-item-icon" />}
                                    {...formik.getFieldProps('username')}
                                />
                                {formik.touched.username && formik.errors.username ? (
                                    <div style={{ "color": "red" }}>{formik.errors.username}</div>
                                ) : null}
                                <Input.Password size='large' placeholder="비밀번호를 입력해주세요"
                                    {...formik.getFieldProps('password')} />
                                {formik.touched.password && formik.errors.password ? (
                                    <div style={{ "color": "red" }}>{formik.errors.password}</div>
                                ) : null}
                                <Space direction='horizontal'>
                                    <button type='submit' className="btn btn-primary">회원가입</button>
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

export default RegisterModal