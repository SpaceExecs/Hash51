import React from "react";
import Message from "./Message";

const MessageList = (props) => {
console.log(props.msgs);
const list = props.msgs.map((msg, i) => {
    const {userId, message} = msg;
    return (<Message key={i} senderName={userId} text={message}/>);
});

return (<div>{list}</div>);
};

export default MessageList;
