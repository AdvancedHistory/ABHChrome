import React, {FC}  from "react";
import Search from "../Search/search";

import "./history.css";


type history_element = {
    date:string, time:string, title:string, link:string,
};

const display = (item:history_element) => {
    return (
        <div className="row">
            <div>{item.date}</div>
            <div>{item.time}</div>
            <div>{item.title}</div>
            <div><a href={item.link} target="_blank">{item.link}</a></div>
        </div>
    );
}

const History: FC = () => {
    const dumb_data:history_element[]  = [
        {date:"1/22/2020",time:"12:05",title:"HTML Links Hyperlinks",link:"https://www.w3schools.com/html/"},
        {date:"1/22/2020",time:"12:06",title:"Slack",link:"slack.com"},
        {date:"1/22/2020",time:"12:07",title:"Slack",link:"slack.com"},
        {date:"1/22/2020",time:"12:08",title:"Slack",link:"slack.com"},
        {date:"1/22/2020",time:"12:09",title:"Slack",link:"slack.com"},
    ];

    return (
        <div className="history">
            <div id="topbar">
                <div id="filter">filter</div>
                <Search />
                <div id="delete">
                    <div id="delete_box">
                        <i className="material-icons">delete_forever</i>
                    </div>
                </div>
            </div>

            <div id="data_header">
                <div id="date">Date</div>
                <div id="time">Time</div>
                <div id="title">Title</div>
                <div id="link">Link</div>
            </div>

            <div id="data">
                {dumb_data.map(display)}
            </div>

        </div>
    );
};

export default History;
