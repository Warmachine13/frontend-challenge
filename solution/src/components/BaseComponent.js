import React, { memo, Fragment } from "react";

const Topbar = require('./Topbar').default;

export default memo(({ children }) => {
    return <Fragment >
        <Topbar />
        {children}
    </Fragment>
}, () => false)