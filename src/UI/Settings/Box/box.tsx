import React, {FC}  from "react";
import "./box.css";

const Box: FC <{size:[string,string]}>= ({children,size}) => {
    return (
        <div id="outer_box" style={{width:size[0],height:size[1]}}>
            <div id="Box">
                {children}
            </div>
        </div>
    );
};

export default Box;
