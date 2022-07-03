import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LinearProgress } from '@mui/material';

/**
 *@fileOverview Zeigt einen Ladefortschritt an, wenn die Show-Prop wahr ist.
 *@author Kim Kausler, Luca Trautmann
*/
class Loader extends Component {
    render() {
      //Rendert die Komponente
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