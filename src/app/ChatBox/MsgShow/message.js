import React from 'react';
import 'react-chat-elements/dist/main.css'
import { MessageList } from 'react-chat-elements'

/* <MessageBox
    position={'left'}
    type={'photo'}
    text={'react.svg'}
    data={{
        uri: 'https://facebook.github.io/react/img/logo.svg',
        status: {
            click: false,
            loading: 0,
        }
    }}/> */
function MessageBubble(datasource) {
    console.log(datasource)
    return (
        <div>
            <MessageList
                lockable={true}
                toBottomHeight={'100%'}
                dataSource={datasource.data}          
            />
        </div>
    )
}

export default MessageBubble;