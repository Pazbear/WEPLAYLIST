import React from 'react';
import { useNavigate } from 'react-router-dom'
import ModalFrame from './_App/ModalFrame';
import { Formik } from 'formik';
import * as Yup from 'yup'
import { Input, Space, Button } from 'antd';
import { UserOutlined, CustomerServiceOutlined, YoutubeOutlined } from '@ant-design/icons';
import Logo from '../../assets/WEPLAYLIST_logo.png'
import { useDispatch } from 'react-redux';
import { addMusic } from '../../_actions/music_actions';


const AddMusicModal = (props) => {
    const dispatch = useDispatch()

    return (
        <ModalFrame setOnModal={props.setOnModal}>
            <div>
                <Formik
                    initialValues={{
                        name: '',
                        artist: '',
                        youtube_url: '',
                        password: '',
                    }}
                    validationSchema={Yup.object({
                        name: Yup.string(),
                        artist: Yup.string(),
                        youtube_url: Yup.string().url(),
                        password: Yup.string()
                            .min(6, '6자 이상 12자 이하로 적어주세요')
                            .max(12, '6자 이상 12자 이하로 적어주세요')
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        let dataToSubmit = {
                            name: values.name,
                            artist: values.artist,
                            youtube_url: values.youtube_url,
                            playlist_id: props.playlist_id,
                            password: values.password,
                        }
                        dispatch(addMusic(dataToSubmit))
                            .then(response => {
                                if (response.payload === 201) {
                                    props.refreshMusics()
                                    props.setOnModal(false)
                                } else {
                                    alert('저장 실패')
                                }
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
                                    placeholder="곡명을 입력해주세요"
                                    prefix={<CustomerServiceOutlined className="site-form-item-icon" />}
                                    {...formik.getFieldProps('name')}
                                />
                                {formik.touched.name && formik.errors.name ? (
                                    <div style={{ "color": "red" }}>{formik.errors.name}</div>
                                ) : null}
                                <Input
                                    size='large'
                                    placeholder="가수를 입력해주세요"
                                    prefix={<UserOutlined className="site-form-item-icon" />}
                                    {...formik.getFieldProps('artist')}
                                />
                                {formik.touched.artist && formik.errors.artist ? (
                                    <div style={{ "color": "red" }}>{formik.errors.artist}</div>
                                ) : null}
                                <Input
                                    size='large'
                                    placeholder="유튜브 URL을 입력해주세요"
                                    prefix={<YoutubeOutlined className="site-form-item-icon" />}
                                    {...formik.getFieldProps('youtube_url')}
                                />
                                {formik.touched.youtube_url && formik.errors.youtube_url ? (
                                    <div style={{ "color": "red" }}>{formik.errors.youtube_url}</div>
                                ) : null}
                                <input hidden value={props.playlist_id} {...formik.getFieldProps('playlist_id')} />
                                <Input.Password size='large' placeholder="플레이리스트 비밀번호"
                                    {...formik.getFieldProps('password')} />
                                {formik.touched.password && formik.errors.password ? (
                                    <div style={{ "color": "red" }}>{formik.errors.password}</div>
                                ) : null}
                                <Space direction='horizontal'>
                                    <button type='submit' className="btn btn-primary">추가하기</button>
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

export default AddMusicModal