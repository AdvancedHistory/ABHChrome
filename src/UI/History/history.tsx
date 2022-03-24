import React, {FC, useState, useEffect}  from "react";
import Search from "../Search/search";
import Filter from "../Filter/filter";
import "./history.css";

type history_element = {
   date:string, time:string, title:string, link:string,
};

const display = (item:history_element, key:number) => {
    return (
        <div className="row" key={key}>
            <div>{item.date}</div>
            <div>{item.time}</div>
            <div>{item.title}</div>
            <div><a href={item.link} target="_blank">{item.link}</a></div>
        </div>
    );
}

const History: FC<{browser_history:any[]}> = ({browser_history}) => {
    const dumb_data:history_element[]  = [
        {date:"1/22/2020",time:"12:05",title:"HTML Links Hyperlinks",link:"https://www.w3schools.com/html/"},
        {date:"1/22/2020",time:"12:06",title:"Slack",link:"slack.com"},
        {date:"1/22/2020",time:"12:07",title:"Slack",link:"slack.com"},
        {date:"1/22/2020",time:"12:08",title:"Slack",link:"slack.com"},
        {date:"1/22/2020",time:"12:09",title:"Slack",link:"slack.com"},
    ];

    const [search_string, update_search] = useState<string>("");
    const [start_date, update_start] = useState<string>("");
    const [end_date, update_end] = useState<string>("");

    const [filter_page, toggle_filter_page] = useState<boolean>(false);
    const toggle_page = () => {
        toggle_filter_page(!filter_page);
    }

    useEffect(() => {
    const handleEsc = (event: any) => {
      if (event.keyCode === 27){
        toggle_filter_page(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  });


    return (
        <div className="history">
            <div id="topbar">
                <div id="filter">
                    <div className="top_box" onClick={toggle_page}>
                        <i className="material-icons">filter_list</i>
                    </div>
                </div>
                <Search string_update={update_search} />
                {/*<div id="delete">
                     <div className="top_box">
                         <i className="material-icons">delete_forever</i>
                     </div>
                </div>*/}
            </div>

            {filter_page? <Filter  start_date={update_start} end_date={update_end} close={toggle_filter_page}/>:""}

            <div id="data_header">
                <div id="date">Date</div>
                <div id="time">Time</div>
                <div id="title">Title</div>
                <div id="link">Link</div>
            </div>

            <div id="data">
                {browser_history.map((el,i) => display(el,i))}
            </div>

        </div>
    );
};

export default History;
