import React, { Component } from 'react';
import Form from '../components/Form';

export default class FormContainer extends Component {
    constructor(props){
        super(props);
        this._input = React.createRef();
        this._inputParent = React.createRef();
        this._submitButton = React.createRef();
        this._messageParent = React.createRef();
        this.state = {
            email: '',
            invalidChars: false,
            submissionSuccess: false,
            submissionAttempt: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.raiseInputParent = this.raiseInputParent.bind(this);
        this.closeSuccessMsg = this.closeSuccessMsg.bind(this);
    }

    componentDidMount() {
        const that = this;

        this._input.current.addEventListener('keypress', function (e) {
            if (e.keyCode === 13) that.handleSubmit(e);
        });

        setTimeout( () => this._inputParent.current.classList.add('Loaded'), 3400);

        window.addEventListener('resize', () => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
          });
    }

    handleSubmit(e) {
        e.preventDefault();     
        if (this.state.email.length === 0 || this.state.invalidChars){
            this._inputParent.current.classList.add('Invalid-field');
            if (document.body.scrollHeight < 425) setTimeout( () => window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'}), 900);
            this.setState({submissionAttempt: true})
            setTimeout( () => {
                this._inputParent.current.classList.remove('Invalid-field');
                this.setState({submissionAttempt: false});
            }, 5000)  
        } 
        if (!document.querySelector('.Invalid-field') && this.state.email.length > 0 && this.state.submissionSuccess === false && this.state.submissionAttempt === false) {
            this.setState({submissionSuccess: true})
            this._inputParent.current.classList.add('Submit-success');
            setTimeout( () => document.querySelector('.Message-parent-content').classList.add('Success'), 100);
            setTimeout( () => window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'}), 1700);
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
                this._submitButton.current.classList.add('Invalid-field');
                this.setState({ invalidChars: true});
            } else {
                this._submitButton.current.classList.remove('Invalid-field');
                this.setState({ invalidChars: false});
            }
        }
    }

    raiseInputParent(){
        if (document.activeElement === this._input.current) this._inputParent.current.classList.add('Focused')
             else this._inputParent.current.classList.remove('Focused');
    }

    closeSuccessMsg(){
        this._messageParent.current.classList.add('Close');
        setTimeout( () => {
            this._messageParent.current.classList.remove('Success')
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
                _input={this._input}
                _inputParent={this._inputParent}
                _submitButton={this._submitButton}
                _messageParent={this._messageParent}
            />
        )
    }
}
