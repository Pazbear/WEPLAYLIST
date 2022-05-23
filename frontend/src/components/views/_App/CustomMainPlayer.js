import { Button, Slider, Space } from 'antd';
import React, { useState } from 'react';
import ReactPlayer from 'react-player/youtube'
import { PauseCircleOutlined, PlayCircleOutlined, CustomerServiceOutlined } from '@ant-design/icons'


const CustomMainPlayer = (props) => {
    const [IsPlay, setIsPlay] = useState(false)
    const [CurrentSeek, setCurrentSeek] = useState(0)
    const [VolumeBar, setVolumeBar] = useState(0)
    const [Volume, setVolume] = useState(0)
    const [TotalDuration, setTotalDuration] = useState(0)
    const [Muted, setMuted] = useState(false)

    const YoutubeVideoPlayer = React.useRef()

    const handleOnProgress = (e) => {
        setCurrentSeek(e.playedSeconds)
    }

    const handleVolumeChange = (volume) => {
        setVolume(volume / 100)
        setVolumeBar(volume)
    }

    const handleSeekChange = (e) => {
        setCurrentSeek(e)
        YoutubeVideoPlayer.current.seekTo(e)
    }

    const handlePlay = () => {
        if (TotalDuration === 0) {
            setTotalDuration(YoutubeVideoPlayer.current.getDuration())
        }
        setIsPlay(true)
    }

    const handlePause = () => {
        setIsPlay(false)
    }

    const onMute = () => {
        setMuted(!Muted)
    }

    return (
        <>
            <ReactPlayer
                ref={YoutubeVideoPlayer}
                url={props.youtube_url}
                controls={true}
                playing={IsPlay}
                light={false}
                pip={true}
                muted={Muted}
                volume={Volume}
                onProgress={(e) => handleOnProgress(e)}
                style={{ display: 'none' }}
            />
            <div style={{
                display: 'flex', justifyContent: 'center',
                padding: '20px', background: '#808080', borderRadius: '10px'
            }}>
                <Space direction='horizontal'>{IsPlay ? <div onClick={() => {
                    handlePause()
                }}><PauseCircleOutlined style={{ fontSize: '30px', color: '#FFFFFF' }} /></div> :
                    <div onClick={() => {
                        handlePlay()
                    }}><PlayCircleOutlined style={{ fontSize: '30px', color: '#FFFFFF' }} /></div>
                }
                    <div style={{ width: '300px' }}>
                        <Slider horizontal value={CurrentSeek} max={TotalDuration} tooltipVisible={false} onChange={handleSeekChange} />
                    </div>
                    <div onClick={() => { onMute() }}><CustomerServiceOutlined style={{ fontSize: '30px', color: Muted ? '#FF0000' : '#FFFFFF' }} /></div>
                    <div style={{ height: '20px' }}>
                        <Slider vertical value={VolumeBar} onChange={handleVolumeChange} />
                    </div>
                </Space>
            </div>
        </>
    )
}

export default CustomMainPlayer