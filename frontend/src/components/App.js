import { useEffect, useState } from 'react';
import './App.css';
import LoginModal from './views/LoginModal';

import { Table, Tag, Space, Select } from 'antd';
import { useDispatch } from 'react-redux';
import { authUser, getUser } from '../_actions/user_actions';
import { get_playlist_by_id, my_playlist, search_playlist } from '../_actions/playlist_actions';
import { get_musics_by_playlist_id } from '../_actions/music_actions';
const { Column, ColumnGroup } = Table
const { Option } = Select;

function App() {
    const [isLoaderActive, setIsLoaderActive] = useState(true)
    const [onLoginModal, setOnLoginModal] = useState(false)
    const [myPlaylist, setMyPlaylist] = useState(null)
    const [selectedPlaylistId, setSelectedPlaylistId] = useState(null)
    const [selectedPlaylist, setSelectedPlaylist] = useState(null)
    const [searchedPlaylists, setSearchedPlaylists] = useState(null)
    const [musics, setMusics] = useState(null)
    const [Me, setMe] = useState(null)

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

    useEffect(() => {
        if (selectedPlaylistId) {
            dispatch(get_playlist_by_id(selectedPlaylistId))
                .then(response => {
                    let playlist = response.payload
                    dispatch(getUser(playlist.owner))
                        .then(response => {
                            playlist.owner = response.payload
                            setSelectedPlaylist(playlist)
                            console.log(playlist)
                        }).catch(error => {
                            console.error(error)
                        })
                }).catch(error => {
                    console.error(error)
                })
        }
    }, [selectedPlaylistId])

    const ShowMusic = (playlist_id) => {
        setSelectedPlaylistId(playlist_id)
        dispatch(get_musics_by_playlist_id(playlist_id))
            .then(response => {
                setMusics(response.payload)
            }).catch(error => {
                console.error(error)
            })
    }

    const onSearchPlaylist = value => {
        if (value) {
            dispatch(search_playlist(value))
                .then(response => {
                    setSearchedPlaylists(response.payload)
                }).catch(error => {
                    console.error(error)
                })
        }
    }

    const onChangeSearchingPlaylist = value => {
        ShowMusic(value)
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
                                        {myPlaylist && <li><a onClick={() => ShowMusic(myPlaylist.id)}>{myPlaylist.name} <span>{myPlaylist.musics}</span></a></li>}
                                    </ul>
                                </aside>


                                <aside class="widget widget-shop widgit_add">
                                    <h2 class="widget-title-shop">플레이리스트 <span>검색</span></h2>
                                    <Select
                                        showSearch
                                        placeholder={"플레이리스트를 입력해주세요"}
                                        style={{ width: 200 }}
                                        defaultActiveFirstOption={false}
                                        showArrow={false}
                                        filterOption={false}
                                        onSearch={onSearchPlaylist}
                                        onChange={onChangeSearchingPlaylist}
                                        notFoundContent={null}
                                    >
                                        {searchedPlaylists && searchedPlaylists.map((playlist) => <Option key={playlist.id}>{playlist.name}</Option>)}
                                    </Select>
                                </aside>
                            </div>
                            {/*<!-- /.col-lg-3 -->*/}

                            <div class="col-xl-9 col-lg-8 col-md-8">
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'end', marginBottom: '30px' }}>

                                </div>
                                <div class="woocommerce columns-3 row" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>

                                    {musics ?
                                        <Space direction='vertical' style={{ width: '90%' }} >
                                            <div>
                                                {selectedPlaylist && <div>{selectedPlaylist.name}</div>}
                                            </div>
                                            <Table dataSource={musics}>
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
                                            </Table>
                                        </Space>
                                        : <div>플레이리스트를 선택해주세요</div>}
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
