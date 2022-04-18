import React, {FC}  from "react";
import "./graph.css";

//Used to generate the SVG used for displaying time of browsing
const Graph: FC<{size:[string,string],browser_data:number[]}> = ({size,browser_data}) => {
    //path that creates the graph
    let path = "M " + 0 + ", " + (210 - browser_data[0]*200) + " ";
    for(let i = 0; i<browser_data.length; i++){
        path += "L " + i*10 + ", " + (210 - browser_data[i]*200) + " ";
     }

     //svg block
    return (
        <div className="graph" style={{width:size[0],height:size[1]}}>
            <svg preserveAspectRatio="none" viewBox="0 -20 480 250">
                <path fill="none" stroke="yellow"  d={path}/>
                <line stroke="yellow" x1="0" x2="480" y1="210" y2="210"/>
                <line stroke="yellow" x1="0" x2="0" y1="0" y2="210"/>
                <text x="10" y="0"  className="small"> Frequency </text>
                <text x="0" y="230"className="small"> 12:00 AM </text>
                <text x="200" y="230"className="small"> 12:00 PM </text>
                <text x="400" y="230"className="small"> 11:30 PM </text>
            </svg>
        </div>
    );
};

export default Graph;
