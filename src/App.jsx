import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// const key = get_token()[0]; // key is constant
//***REMOVED*** = get_token()[1];

/* this code doesn't really work 
const key = "EKCnWpNMgPfzGr9psFhqq"; // key is constant
const token = "5ADC923208A41CDD38E28F8D97383F3B261C7CCDCB69BE826B9F51361BF9404FC9E5E524CA57B3D573D084E642AF16BE5311FE0229D135E00F26244B4FC3C8BE23D365DA846ABD06F24CE7405BE9A1D4B3EEF513DD0EF0782AB019995E1230B3DAC6D087A12F11464AC8BA5ADF98E3478CA2CB9E77969FB83609BFBC9FEE2826A6855D3CFE4FEF5F39A4AA8764FEAD03639EFDD76A2179F0FB118F8A40D16BE734D73C8F4EF99C5E2A4C1371918C1D064EE587C68AEDBD5F5982B44ABEB9980BF29FA6764A9802F4C6A8B9170320B97C209F233A9DC9F2C09DD469B4CD0B004F8044213AB39D35A52CD1D69E3923F948";

const module_call = "https://ivle.nus.edu.sg/api/Lapi.svc/Modules?APIKey=" +
  key + "&AuthToken=" +
  token + "%s&Duration=10&IncludeAllInfo=false";


function getObject(url) {
  request(url, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
  });
}

function getModules() {
  // returns an array of modules 
}

*/

// Assume we already have a list of modules
const module_list = [
    'MA1521',
    'CS1101S',
    'CS1231',
];

function Toggle(props) {
    return (
        <button onClick={props.onClick}>
            {props.content} {props.isToggleOn ? 'ON' : 'OFF'}
        </button>

    );
}


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonState: Array(module_list.length).fill(false),
        }
    }

    handlesClick(i) {
        const buttonState_copy = this.state.buttonState.slice();

        // update buttonState
        buttonState_copy[i] = !buttonState_copy[i];

        this.setState(
            { buttonState: buttonState_copy });


        // return;
    }

    render() {
        // const currentModules = this.state.currentModules.slice();

        const module_buttons = module_list.map(
            (value, index) => {
                return (
                    // <button key={index}>{value}</button>
                    <Toggle
                        onClick={() => this.handlesClick(index)}
                        isToggleOn={this.state.buttonState[index]}
                        content={module_list[index]}
                    />
                )
            }
        );


        return (
            <div>
                <div className="buttons">
                    {module_buttons}
                </div>


                <div>
                    {/* list of namesd here */}
                </div>
            </div>

        );
    }

}

export default App;
