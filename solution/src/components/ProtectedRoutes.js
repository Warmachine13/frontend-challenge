import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

export default (props) => {
    const { token } = useSelector(({ auth }) => auth);

    // Verifica e existencia do token e permite que acesse as rotas protegidas
    if (token !== null) {
        if (props.secure)
            return <Route {...props} />
        else
            return <Redirect to={'/'} />
    } else {
        if (!props.secure)
            return <Route {...props} />
        else
            return <Redirect to={'/'} />
    }
}
