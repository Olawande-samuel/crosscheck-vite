import React from 'react';
import styled from 'styled-components';

const NotFound = (props) => {
    return (
        <PageWrapper>
            <h1 className="display"> <span className="text-danger">404!</span> Page Not Found</h1>
            <h3>the requested URL <span className="text-danger">{props.location.pathname}</span> was not found</h3>
        </PageWrapper>
    )
};

const PageWrapper = styled.div`
background-color: #0092e0;
height: 100vh;    
font-size: 1.5rem;
align-items: center;
text-align: center;
font-family: "poppins";
font-weight: normal;
letter-spacing: 0.32px;
opacity: 1;
overflow: hidden;
color: #ffffff;
.display {
    .text-danger {
        color: red;
    }
}
h3 {
    text-transform: capitalize;
    .text-danger {
        color: red;
    }
}
`

export default NotFound;
