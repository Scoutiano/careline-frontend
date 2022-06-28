import { Nav } from "react-bootstrap";

import React from 'react';
import TopNav from "../../Student/Navigation/TopNav/TopNav";
import './MoreInfo.css'
const MoreInfoPage = () => {

    return (
        <>
            <TopNav />
            <div className="container-fluid bg-light" id="viewport">
                <div className="row flex-nowrap">
                    <div className="info">
                        This event focuses on engaing in the stdent's community through tree planting everyone is welcome to join, we will meet @9am, on september 15th, infront of bamieh building,give you the tools and start wroking togethere, this aims to increase the sense of belogning and breaking the ice
                        <Nav.Link href="/student-registerEvent">
                            <button className="buttonStyling"> Register Here</button>
                        </Nav.Link>

                    </div>

                </div>
            </div>
        </>
    )
}
export default MoreInfoPage;