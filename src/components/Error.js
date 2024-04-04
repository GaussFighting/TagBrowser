import React from "react";
import "../styles/index.scss";
import PropTypes from 'prop-types';



const Error = ({ error, primary, size }) => {
    const mode = primary ? 'storybook-error--primary' : 'storybook-error--secondary';
    if (window.location.port === "6006"){
        return (<div className={["storybook-error", `storybook-error--${size}`, mode].join(' ')}>{"error at storybook"}</div>)
    }  
        return (<div className={["storybook-error",`storybook-error--${size}`, mode].join(' ')}>{error}</div>)
    
}

export default Error;

Error.propTypes = {
    primary: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'large']),
    label: PropTypes.string.isRequired,
}

Error.defaultProps = {
    primary: false,
    size: 'small'
}