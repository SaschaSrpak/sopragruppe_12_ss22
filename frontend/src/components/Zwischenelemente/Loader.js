import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LinearProgress } from '@mui/material';

/* 
 *@fileOverview 
 *@author Kim Kausler
*/

class Loader extends Component {
    render() {
    const { loading } = this.props;

    return (
      loading ?
        <div >
          <LinearProgress sx={{width: '100%', marginTop: 2}} color='secondary' />
        </div>
        : null
    );
    }
}

Loader.propTypes = {
    show: PropTypes.bool.isRequired,
}

export default Loader;