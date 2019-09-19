import React, { Component } from 'react';
import Form from '../components/Form';

export default class FormContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            invalidChars: false,
            submissionSuccess: false,
            submissionAttempt: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const that = this;

        document.querySelector('.Email-input').addEventListener('keypress', function (e) {
            if (e.keyCode === 13) that.handleSubmit(e);
        });

        window.addEventListener('resize', () => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
          });
    }

    handleSubmit(e) {
        e.preventDefault();     
        if (this.state.email.length === 0 || this.state.invalidChars){
            document.querySelector('.Input-parent').classList.add('Invalid-field');
            this.setState({submissionAttempt: true})
            setTimeout( () => {
                document.querySelector('.Input-parent').classList.remove('Invalid-field');
                this.setState({submissionAttempt: false});
            }, 5000)  
        } 
        if (!document.querySelector('.Invalid-field') && this.state.email.length > 0 && this.state.submissionSuccess === false && this.state.submissionAttempt === false) {
            this.setState({submissionSuccess: true})
            document.querySelector('.Input-parent').classList.add('Submit-success');
            setTimeout( () => document.querySelector('.Message-parent-content').classList.add('Success'), 100) 
            console.log('Submission successful!');
        }
    }

    handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
    
        this.setState({ [name]: value.trim() }, this.validate(name, e));
    }

    validate(name, e) {
        if (name === 'email') { 
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.target.value)){
                document.querySelector('.Submit-button').classList.add('Invalid-field');
                this.setState({ invalidChars: true});
            } else {
                document.querySelector('.Submit-button').classList.remove('Invalid-field');
                this.setState({ invalidChars: false});
            }
        }
    }

    raiseInputParent(status){
        status === 'focus'? document.querySelector('.Input-parent').classList.add('Focused') : 
            document.querySelector('.Input-parent').classList.remove('Focused');
    }

    closeSuccessMsg(){
        document.querySelector('.Message-parent').classList.add('Close');
        setTimeout( () => {
            document.querySelector('.Message-parent').classList.remove('Success')
            window.scrollTo({top: 0, behavior: 'smooth'});
        } , 950);
        document.querySelector('body').classList.add('Close');
    }

    render() {
        return (
            <Form 
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                submissionSuccess={this.state.submissionSuccess}
                raiseInputParent={this.raiseInputParent}
                submissionAttempt={this.state.submissionAttempt}
                closeSuccessMsg={this.closeSuccessMsg}
                email={this.state.email}
            />
        )
    }
}
