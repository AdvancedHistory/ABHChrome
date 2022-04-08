import React, { FC, useState }  from "react";
import Search from "../Search/search";
import Filter from "../Filter/filter";
import "./history.css";

import { useAppDispatch, useAppSelector } from "../../store";



const History: FC<{browser_history:HistoryEntry[]}> = ({browser_history}) => {

    const [search_string, update_search] = useState<string>("");
    const [start_date, update_start] = useState<string>("");
    const [end_date, update_end] = useState<string>("");
    const [category_mask,update_mask] = useState<boolean[]>([]);
    const [filter_page, update_filter_page] = useState<boolean>(false);
    const toggle_filter_page = () => {
        update_filter_page(!filter_page);
    }

    const { categories } = useAppSelector((state) => state.categories );


    // Returns the HTML for a corresponding history element
    const display = (item:HistoryEntry, key:number) => {
        const [date, time] = (new Date(item.time)).toLocaleString(navigator.language, {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone}).split(", ");
        return (
            <div className="row data_columns" key={key}>
                <div>{date}</div>
                <div>{time}</div>
                <div id="data-title">{item.title}</div>
                <div id="data-link" ><a href={item.url} target="_blank">{item.url}</a></div>
                <div id="categories" >{item.categories?item.categories.join(", "):""}</div>
            </div>
        );
    }

    // Helper function to get a date object from a string of user input
    const get_date = (time:string) => {
        let [year, month, day] = time.split("-");
        return new Date(month + "/" + day + "/" + year);
    };

    // Apply the time and search filters to the history
    const filter_mask = (item:HistoryEntry) => {
        if(start_date!=="" && item.time < get_date(start_date).getUTCMilliseconds()) {
            return false;
        }
        if(end_date!=="" && item.time > get_date(end_date).getUTCMilliseconds()) {
            return false;
        }
        if(category_mask!==[] && category_mask[0] !== true){
            for(let i=1; i<category_mask.length; i++){
                return !categories.map((el,i) => !category_mask[i+1] || (item.categories?item.categories.includes(el.name):false)).includes(false);
            }
        }
        return search_string === "" || item.title.toLowerCase().includes(search_string.toLowerCase()) || item.url.toLowerCase().includes(search_string.toLowerCase());
    };

    const [sort_by, set_sort] = useState<number>(0);
    const [accending,set_accending] = useState<boolean>(false);

    // Sort descending initially or ascending if toggled
    const sort_date = (a: HistoryEntry, b: HistoryEntry, doAccending: boolean = accending) => {
        if(doAccending) return (a.time < b.time) ? -1 : 1;
        else return (a.time > b.time) ? -1 : 1;
    };

    // Determines the sort function to be based on time or alphabetical order
    const sort_key = (a: HistoryEntry, b: HistoryEntry) => {
        if(sort_by === 0) {
            return sort_date(a,b);
        }
        if(a.title.toLowerCase() === b.title.toLowerCase()) {
            return sort_date(a,b, false);
        }
        return (a.title.toLowerCase() < b.title.toLowerCase() ? !accending:accending) ? 1:-1;
    };

    // Builds the history tab including the entries dynamically
    return (
        <div className="history">
            <div id="topbar">
                <div id="filter">
                    <div className="top_box" onClick={toggle_filter_page}>
                        <i className="material-icons">filter_list</i>
                    </div>
                </div>
                <Search string_update={update_search} />
                <div id="sort_box">
                  <div id="sort_by"   onClick={() => {set_sort((sort_by+1)%2)}}> {["Time","Title"][sort_by]} </div>
                  <div id="accending" onClick={() => {set_accending(!accending)}}> <i className="material-icons">{accending?"arrow_drop_up":"arrow_drop_down"}</i></div>
                </div>
            </div>

            {filter_page? <Filter  dates={[start_date,end_date]} set_dates={[update_start,update_end]} category_masks={[category_mask,update_mask]} close={toggle_filter_page}/>:""}

            <div id="data_header" className="data_columns">
                <div id="date">Date</div>
                <div id="time">Time</div>
                <div id="title">Title</div>
                <div id="link">Link</div>
                <div id="category">Category</div>
            </div>

            <div id="data">
                {browser_history!==undefined?browser_history.filter(filter_mask).sort(sort_key).splice(0, 500).map((el,i) => display(el,i)):""}
            </div>

        </div>
    );
};

export default History;
