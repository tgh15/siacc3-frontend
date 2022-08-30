import classnames from 'classnames'
import "./index.scss"
import { MessageCircle } from 'react-feather'

const EmptyChat = () => {
    return (
        <div className="empty-chat">
            <div className='chat-app-window'>
                <div className={classnames('start-chat-area')}>
                    <div className='start-chat-icon mb-1'>
                        <MessageCircle />
                    </div>
                    <h4 className='sidebar-toggle start-chat-text' >
                        Mulai Pengaduan Yang Ingin Dilihat
                    </h4>
                </div>
            </div>
        </div>
    )
}


export default EmptyChat