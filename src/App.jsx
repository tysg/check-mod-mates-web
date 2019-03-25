import React, { Component } from 'react';
import { Button, Label } from 'semantic-ui-react'
import queryString from 'query-string'
import './App.css';

const key = "EKCnWpNMgPfzGr9psFhqq"; // key is constant, used in constructing API calls

function Toggle(props) {
    return (
        <Button active={props.isToggleOn} onClick={props.onClick}>
            {props.content}
        </Button>
    );
}

class Content extends Component {
    // Content takes in name lists as props. It handles the processing of the name lists and presentation
    componentDidMount() {
        this.props.getNamelist();
    }

    findIntersection() {
        // refer to the global name_list var, and compare with buttonState
        // return the intersection in an array
        const name_obj = this.props.nameList;
        const id_list = this.props.id;

        const selectedLists = []
        for (let i = 0; i < this.props.buttonState.length; i++) {
            if (this.props.buttonState[i]) {
                const id = id_list[i];
                selectedLists.push(name_obj[id]);
            }
        }


        try {
            // 
            return selectedLists.reduce(
                (accum, current) => accum.filter(x => current.includes(x))
            )
        } catch (TypeError) {
            // Type Error occurs when processing empty arrays 
            return;
        }

    }

    renderLabels(array) {
        // each label contains a name
        if (array) {
            // console.log(typeof (array))
            return array.map(
                (value, index) => {
                    return (<Label key={index}>{value}</Label>)
                }
            )
        }
    }


    render() {
        const module_buttons = this.props.courseCode.map(
            (value, index) => {
                return (
                    <Toggle
                        onClick={() => this.props.onClick(index)}
                        isToggleOn={this.props.buttonState[index]}
                        content={this.props.courseCode[index]}
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
                    {/* list of names here */}
                    {this.renderLabels(this.findIntersection())}
                </div>

            </div>
        )

    };

}

class App extends Component {
    // App class handles fetching all module lists and respective name lists
    constructor(props) {
        super(props);
        this.state = {
            isInitialized: false,
            buttonState: null,
            ID: null,
            courseCode: null,
            moduleResponse: null,
            nameList: {},
        }

        this.getNamelist = this.getNamelist.bind(this);

    }

    componentDidMount() {
        // initialise the page once its loaded 
        if (!this.state.isInitialized) { this.initialize() };

    }

    initialize() {
        // clear the token in the address field
        this.props.history.push("/app")
        const token = queryString.parse(this.props.location.search).token
        this.setState({
            token: token,
        })

        const url = "https://ivle.nus.edu.sg/api/Lapi.svc/Modules?APIKey=" +
            key + "&AuthToken=" +
            token + "&Duration=10&IncludeAllInfo=false";


        return fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState((state) => {
                    return {
                        isInitialized: true,
                        buttonState: Array(data.Results.length).fill(false),
                        courseCode: data.Results.map(obj => obj.CourseCode),
                        ID: data.Results.map(obj => obj.ID),
                    };
                }
                );
            })
    }



    getNamelist() {
        const token = this.state.token

        const urls = id => "https://ivle.nus.edu.sg/API/Lapi.svc/Class_Roster?APIKey=" + key + "&AuthToken=" + token + "&CourseID=" + id
        this.state.ID.map(
            id => fetch(urls(id))
                .then(resp => resp.json())
                .then(data => this.setState(
                    (state) => {
                        let nameList = { ...state.nameList }
                        nameList[id] = data.Results.map(obj => obj.Name)
                        return { nameList }
                    }
                ))
        )
    }


    handlesClick(i) {
        const buttonState_copy = this.state.buttonState.slice();

        // update buttonState
        buttonState_copy[i] = !buttonState_copy[i];

        this.setState(
            { buttonState: buttonState_copy });
    }

    render() {
        return (
            <div>
                {(this.state.isInitialized)
                    ? <Content
                        buttonState={this.state.buttonState}
                        courseCode={this.state.courseCode}
                        onClick={i => this.handlesClick(i)}
                        getNamelist={this.getNamelist}
                        nameList={this.state.nameList}
                        id={this.state.ID}
                    />
                    : null}
            </div>
        );
    }

}



export default App;
