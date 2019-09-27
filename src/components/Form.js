import React from 'react';

export default function Form(props) {
    return (
        <div className="Form-container">
            <div className="Form-parent">
                <h1 className="Hodinkee-logo">HODINKEE</h1>
                <p className="Release-date">Coming 06.26.19</p>
                <div className="Input-parent" ref={props._inputParent}>
                    <input  className="Email-input" 
                            id="Email" 
                            name="email" 
                            type="text" 
                            aria-label="Email address"
                            placeholder="Your email address" 
                            onChange={props.handleChange}
                            onFocus={() => props.raiseInputParent()}
                            onBlur={() => props.raiseInputParent()}
                            ref={props._input}
                    ></input>
                    <div className="Submit-button" 
                         onClick={ (e) => props.handleSubmit(e)}
                         ref={props._submitButton}
                         >NOTIFY ME</div>
                </div>  
                { props.submissionSuccess ?
                    <div className="Message-parent Success" ref={props._messageParent}>
                        <div className="Message-parent-content">
                            <div className="close-button-parent" onClick={ () => props.closeSuccessMsg() }>
                                <div className="close-button"></div>
                            </div>
                            <div className="Hodinkee-square-logo"></div>
                            <hr/>
                            <h3 className="Message-header">Thank you for your interest!</h3>
                            <p className="Message">
                                <span className="Message-email">{props.email} </span> 
                                will be notified when the limited edition watch is available.
                            </p>
                        </div>
                    </div>
                : props.submissionAttempt ? 
                    <div className="Message-parent Failure">
                        <p className="Message Failure"> Please enter a valid email address. </p>
                    </div> : null }
            </div>
        </div>
    )
}