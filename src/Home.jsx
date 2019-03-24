import React, { Component } from 'react';
// import 'semantic-ui-css/semantic.min.css'
import {
    Button,
    Container,
    Header,
    Icon,
    Segment,
} from 'semantic-ui-react'

const CALLBACK_URL = "http://localhost:3000/app/";

class Home extends Component {
    render() {
        const mobile = this.props.mobile;

        return (
            <div className="homepage">
                <style>{`
                    body > div,
                    body > div > div,
                    body > div > div > div.homepage {
                    height: 100%;
                    }   
                    
                 `}</style>
                <Segment style={{
                    background: '#dfdce3',
                    marginTop: '0px',
                    textAlign: 'center',
                    height: '100%',
                }}>



                    <Container text
                        style={{
                            margin: 'auto',
                        }}>
                        <Header
                            as='h1'
                            content='Check Module Mates'

                            style={{
                                fontSize: mobile ? '2em' : '4em',
                                fontWeight: 'normal',
                                marginBottom: 0,
                                marginTop: mobile ? '1.5em' : '3em',
                            }}
                        />
                        <Header
                            as='h2'
                            content='Find out who are taking the same modules as you'
                            style={{
                                fontSize: mobile ? '1.5em' : '1.7em',
                                fontWeight: 'normal',
                                marginTop: mobile ? '0.5em' : '1.5em',
                            }}
                        />
                        <Button primary size='huge' href={"https://ivle.nus.edu.sg/api/login/?apikey=EKCnWpNMgPfzGr9psFhqq&url=" + CALLBACK_URL}>
                            Get Started
                    <Icon name='right arrow' />
                        </Button>
                    </Container>
                </Segment>

            </div >

        );
    }
}


export default Home;
