import React from 'react';
import { AppBar, Toolbar, Box } from '@material-ui/core';

import useStyles from './styles';

const Navbar = () => {
    const classes = useStyles(); {/*hook to call imported styles*/}
    return (
        <AppBar position="static">
            <Toolbar className={classes.toolbar}>
                <div>
                    NAVBAR
                </div>
            </Toolbar>
        </AppBar>
    );        
}

export default Navbar;
