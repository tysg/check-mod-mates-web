import React, { Component } from 'react';
import queryString from 'query-string'
import './App.css';
import { Button, Label } from 'semantic-ui-react'

const key = "EKCnWpNMgPfzGr9psFhqq"; // key is constant

function Toggle(props) {
    return (
        <Button active={props.isToggleOn} onClick={props.onClick}>
            {props.content}
        </Button>
    );
}

class Content extends Component {


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
            return selectedLists.reduce(
                (accum, current) => accum.filter(x => current.includes(x))
            )
        }

        catch (TypeError) {
            return;
        }

    }

    renderLabels(array) {
        if (array) {
            console.log(typeof (array))
            return array.map(
                (value, index) => {
                    return (<Label key={index}>{value}</Label>)
                }
            )
        }
    }

    componentDidMount() {
        this.props.getNamelist();
    }

    render() {
        const module_buttons = this.props.courseCode.map(
            (value, index) => {
                return (
                    // <button key={index}>{value}</button>
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
                    {/* list of namesd here */}
                    {this.renderLabels(this.findIntersection())}
                </div>

            </div>
        )

    };

}

class App extends Component {
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
        console.log(this.props);
        if (!this.state.isInitialized) { this.initialize() };

    }

    initialize() {
        this.props.history.push("/app")
        const token = queryString.parse(this.props.location.search).token
        this.setState({
            token: token,
        })

        console.log(this.state.token);

        const url = "https://ivle.nus.edu.sg/api/Lapi.svc/Modules?APIKey=" +
            key + "&AuthToken=" +
            token + "&Duration=10&IncludeAllInfo=false";


        return fetch(url)
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
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

        // const token = queryString.parse(this.props.location.search).token
        const token = this.state.token

        console.log(token);
        const urls = id => "https://ivle.nus.edu.sg/API/Lapi.svc/Class_Roster?APIKey=" + key + "&AuthToken=" + token + "&CourseID=" + id



        this.state.ID.map(
            id => fetch(urls(id))
                .then(resp => resp.json())
                .then(data => this.setState(
                    (state) => {
                        console.log(data);

                        let nameList = { ...state.nameList }
                        nameList[id] = data.Results.map(obj => obj.Name)
                        // const nameList = state.nameList.concat(
                        //     [{ [id]: data.Results.map(i => i.Name) }])
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
                <div className="main">
                    {/* <button onClick={() => this.initialize()}>Initialize</button> */}
                </div>


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
            </div >
        );
    }

}



export default App;
