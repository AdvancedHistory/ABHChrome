import React, {FC, useState, useEffect}  from "react";
import Search from "../Search/search";
import Filter from "../Filter/filter";
import "./history.css";

type history_element = {
   date:string, time:string, title:string, link:string,
};

const display = (item:history_element, key:number) => {
    return (
        <div className="row data_columns" key={key}>
            <div>{item.date}</div>
            <div>{item.time}</div>
            <div id="data-title">{item.title}</div>
            <div id="data-link" ><a href={item.link} target="_blank">{item.link}</a></div>
        </div>
    );
}

const History: FC<{browser_history:history_element[]}> = ({browser_history}) => {

    const [search_string, update_search] = useState<string>("");
    const [start_date, update_start] = useState<string>("");
    const [end_date, update_end] = useState<string>("");

    const [filter_page, toggle_filter_page] = useState<boolean>(false);
    const toggle_page = () => {
        toggle_filter_page(!filter_page);
    }

    const date = (time:string) => {
        let [year, month, day] = time.split("-");
        return new Date(month + "/" + day + "/" + year);
    };

    const filter_mask = (item:history_element) => {
        let item_date = new Date(item.date);
        if(start_date!=="" && item_date < date(start_date)) {
            return false;
        }
        if(end_date!=="" && item_date > date(end_date)) {
            return false;
        }
        return search_string==="" || item.title.toLowerCase().includes(search_string.toLowerCase()) || item.link.toLowerCase().includes(search_string.toLowerCase());
    };

    const [sort_by, set_sort] = useState<number>(0);
    const [accending,set_accending] = useState<boolean>(false);

    const sort_date = (a:history_element, b:history_element) => {
        let date_a = new Date(a.date + " " + a.time);
        let date_b = new Date(b.date + " " + b.time);
        if(date_a.getTime() === date_b.getTime()) {return 0;}
        return (date_a.getTime() < date_b.getTime() && accending)?-1:1;
    };

    const sort_key = (a:history_element, b:history_element) => {
        if(sort_by === 0) {
            return sort_date(a,b);
        }
        if(a.title.toLowerCase() === b.title.toLowerCase()) {return sort_date(a,b)}
        return (a.title.toLowerCase() < b.title.toLowerCase() ? !accending:accending) ? 1:-1;
    };
    return (
        <div className="history">
            <div id="topbar">
                <div id="filter">
                    <div className="top_box" onClick={toggle_page}>
                        <i className="material-icons">filter_list</i>
                    </div>
                </div>
                <Search string_update={update_search} />
                <div id="sort_box">
                  <div id="sort_by"   onClick={() => {set_sort((sort_by+1)%2)}}> {["Time","Title"][sort_by]} </div>
                  <div id="accending" onClick={() => {set_accending(!accending)}}> <i className="material-icons">{accending?"arrow_drop_up":"arrow_drop_down"}</i></div>
                </div>
            </div>

            {filter_page? <Filter  dates={[start_date,end_date]} set_dates={[update_start,update_end]} close={toggle_filter_page}/>:""}

            <div id="data_header" className="data_columns">
                <div id="date">Date</div>
                <div id="time">Time</div>
                <div id="title">Title</div>
                <div id="link">Link</div>
            </div>

            <div id="data">
                {browser_history!==undefined?[...browser_history].filter(filter_mask).sort(sort_key).map((el,i) => display(el,i)):""}
            </div>

        </div>
    );
};

export default History;
