import React, {ChangeEvent, FC} from "react";
import "./search.css";

//text input for searching
const Search: FC<{string_update:(arg0:string)=>void}> = ({string_update}) => {
    return (
            <div id="searchbar">
                <input id="search_box" type='text' onChange={(e: ChangeEvent<HTMLInputElement>) => string_update(e.target.value)}/>
                <div />
            </div>
    );
};

export default Search;
