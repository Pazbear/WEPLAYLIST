import { useEffect, useState } from 'react';
import './App.css';
import LoginModal from './views/LoginModal';

import { Table, Tag, Space, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { authUser } from '../_actions/user_actions';
import { my_playlist, search_playlist } from '../_actions/playlist_actions';
const { Column, ColumnGroup } = Table
const { Search } = Input

function App() {
    const [isLoaderActive, setIsLoaderActive] = useState(true)
    const [onLoginModal, setOnLoginModal] = useState(false)
    const [myPlaylist, setMyPlaylist] = useState(null)
    const [playlists, setPlaylists] = useState([{ name: "테스트1", musics: 6 }, { name: "테스트2", musics: 5 }, { name: "테스트3", musics: 1 },])
    const [musics, setMusics] = useState(null)
    const [Me, setMe] = useState(null)

    const dummyData1 = [
        {
            name: '정이라고 하자',
            artist: '빅나티',
            length: '3:12',
        },
        {
            name: '스물다섯 스물하나',
            artist: '자우림',
            length: '3:25',
        },
    ];

    const dispatch = useDispatch()

    setTimeout(() => {
        setIsLoaderActive(false)
    }, 2000);

    useEffect(() => {
        if (localStorage.getItem('jwtToken')) {
            dispatch(authUser())
                .then(response => {
                    setMe(response.payload)
                }).catch(error => {
                    console.error(error)
                })
        }
    }, [localStorage.getItem('jwtToken')])

    useEffect(() => {
        if (Me) {
            dispatch(my_playlist())
                .then(response => {
                    setMyPlaylist(response.payload)
                }).catch(error => {
                    console.error(error)
                })
        }
    }, [Me])

    const onShowMusic = () => {
        setMusics(dummyData1)
    }

    const onSearchPlaylist = value => {
        if (value) {
            dispatch(search_playlist(value))
                .then(response => {
                    console.log(response.payload)
                }).catch(error => {
                    console.error(error)
                })
        }
    }

    return (
        <div>
            {onLoginModal && <LoginModal setOnModal={(bool) => setOnLoginModal(bool)} />}
            <div class="loader loader-bar-ping-pong is-active" style={isLoaderActive ? {} : { display: 'none' }}></div>
            <div id="site">
                {/*<!--=========================-->
                <!--=        Navbar         =-->
                <!--=========================-->*/}
                <header class="header">
                    <div class="top-header">
                        <div class="tim-container clearfix">
                            <ul class="site-social-link">
                                <li><a href=""><i class="fa fa-facebook"></i></a></li>
                                <li><a href=""><i class="fa fa-twitter"></i></a></li>
                                <li><a href=""><i class="fa fa-google-plus"></i></a></li>
                                <li><a href=""><i class="fa fa-pinterest-p"></i></a></li>
                                <li><a href=""><i class="fa fa-instagram"></i></a></li>
                            </ul>
                            {/*<!-- /.site-social-link -->*/}

                            {Me ?
                                <ul class="user-login float-right">
                                    <li>{Me.username} 님</li>
                                    <li><a href="#" onClick={() => {
                                        localStorage.removeItem('jwtToken')
                                        window.location.replace('/')
                                    }}>Logout</a></li>
                                </ul>
                                :
                                <ul class="user-login float-right">
                                    <li><a href="#">Sing Up</a></li>
                                    <li><a href="#" onClick={() => setOnLoginModal(true)}>Sign In</a></li>
                                </ul>
                            }
                        </div>
                        {/*<!-- /.tim-container -->*/}
                    </div>
                    {/*<!-- /.top-header -->*/}
                </header>
                {/*<!-- /#header -->*/}


                {/*
                <!--=============================-->
                <!--=        Mobile Nav         =-->
                <!--=============================-->
                */}
                <header id="mobile-nav-wrap">
                    <div class="mob-header-inner d-flex justify-content-between">
                        <div id="mobile-logo" class="d-flex justify-content-start">
                            <a href="index.html"><img src="assets/img/logo.png" alt="Site Logo" /></a>
                        </div>

                        <ul class="user-link nav justify-content-end">
                            <li><a onClick={() => setOnLoginModal(true)}><i class="fa fa-user"></i>Login</a></li>
                            <li><a ><i class="fa fa-sign-in"></i>Sign Up</a></li>
                        </ul>

                        <div id="nav-toggle" class="nav-toggle hidden-md">
                            <div class="toggle-inner">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                    {/*<!-- /.mob-header-inner -->*/}
                </header>
                {/*<!-- /#mobile-header -->*/}

                {/*
                <!--===========================-->
                <!--=        	About         =-->
                <!--===========================-->
                */}
                <section class="shop site-main">
                    <div class="tim-container">
                        <div class="row">
                            <div class="col-xl-3 col-lg-4 col-md-4">

                                <aside class="widget widget-shop widget_tags_entries">
                                    <h3 class="widget-title-shop">내 플레이리스트</h3>
                                    <ul class="shop-catgories-links">
                                        {myPlaylist && <li><a onClick={() => onShowMusic()}>{myPlaylist.name} <span>{myPlaylist.musics}</span></a></li>}
                                    </ul>
                                </aside>


                                <aside class="widget widget-shop widgit_add">
                                    <h2 class="widget-title-shop">플레이리스트 <span>검색</span></h2>
                                    <Search
                                        placeholder="플레이리스트명을 검색해주세요"
                                        allowClear
                                        enterButton="Search"
                                        size="large"
                                        onSearch={onSearchPlaylist}
                                    />
                                </aside>
                            </div>
                            {/*<!-- /.col-lg-3 -->*/}

                            <div class="col-xl-9 col-lg-8 col-md-8">
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'end', marginBottom: '30px' }}>
                                    <Search placeholder="input search text" style={{ width: 200 }} />
                                </div>
                                <div class="woocommerce columns-3 row" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                    {musics ? <Table dataSource={musics}>
                                        <Column title="Name" dataIndex="name" key="name" />
                                        <Column title="Artist" dataIndex="artist" key="artist" />
                                        <Column title="Length" dataIndex="length" key="length" />
                                        <Column
                                            title="Action"
                                            key="action"
                                            render={(text, record) => (
                                                <Space size="middle">
                                                    <a>Invite {record.lastName}</a>
                                                    <a>Delete</a>
                                                </Space>
                                            )}
                                        />
                                    </Table> : <div>플레이리스트를 선택해주세요</div>}
                                </div>
                            </div>
                            {/*<!-- /.col-lg-9 -->*/}
                        </div>
                        {/*<!-- /.row -->*/}
                    </div>
                    {/*<!-- /.tim-container -->*/}

                </section>
                {/*<!-- /#product -->*/}

                <div class="backtotop">
                    <i class="fa fa-angle-up backtotop_btn"></i>
                </div>
            </div>
        </div>
    );
}

export default App;
