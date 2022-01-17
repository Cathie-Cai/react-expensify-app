// higher order component(HOC): a component(HOC) that renders another component
// reuse code
// render hijacking 
// prop manipulation
// abstract state

import React from 'react';
import ReactDOM from 'react-dom';



const Info = (props)=>(
    <div>
        <h1>Info</h1>
        <p>The info is: {props.info}</p>
    </div>
);

const withAdminWarning = (WrappedComponent)=> {
    return (props)=>(
        <div>
            {props.isAdmin && <p>this is private info</p>}
            <WrappedComponent {...props}/>
        </div>
    );
};

const requireAutentication = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAuthenticated ? (<WrappedComponent {...props} />):(<p>please log in first</p>) }          
        </div>
    );
};

const AdminInfo = withAdminWarning(Info);

const AuthInfo = requireAutentication(Info);

//ReactDOM.render(<AdminInfo isAdmin={true} info='There are the details'/>, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={false} info='There are the details'/>, document.getElementById('app'));
