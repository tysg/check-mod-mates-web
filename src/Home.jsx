import React, { Component } from 'react';

const CALLBACK_URL = "http://localhost:3000/app/";

class Home extends Component {
    render() {
        return (
            <div>
                <div>
                    Check Module mates
                </div>

                <div>
                    <a href={"https://ivle.nus.edu.sg/api/login/?apikey=EKCnWpNMgPfzGr9psFhqq&url=" + CALLBACK_URL}>Click here</a>
                </div>

            </div>
        )
    }
}


export default Home;
