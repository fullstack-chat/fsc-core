import React, { ReactNode } from 'react'

type Props = {
  imgPath: string
  username: string
  children: ReactNode
}

function ChatBubble({ imgPath, username, children }: Props) {
  return (
    <div className="chat-bubble">
      <div className="avatar">
        <img src={`/assets/images/${imgPath}`} className="img-fluid" />
      </div>
      <div className="text-area">
        <div className="username">
          {username}
        </div>
        <div className="text">
          { children }
        </div>
      </div>
    </div>
  )
}

export default ChatBubble