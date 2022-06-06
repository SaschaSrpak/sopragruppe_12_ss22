import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import AutorenewIcon from '@material-ui/icons/Autorenew';

/**
 *@fileOverview 
 *@author Kim Kausler, Luca Trautmann
*/

// class Error extends Component {
//     #standardText = 'Da ist wohl etwas schief geloffen... Sorry!';

//     /** Renders the ContextErrorMessage if error object is not null  */
//     render() {
//         const { error, contextErrorMsg, onReload } = this.props;

//         return (
//             (error !== null) ?
//                 <Alert severity='error'>
//                     <div>
//                         {this.#standardText}
//                     </div>
//                     <AlertTitle>
//                         {contextErrorMsg}
//                     </AlertTitle>
//                     <div>
//                         Error message (for debugging only) is:
//                     </div>
//                     <div>
//                         {error.message}
//                     </div>
//                     {
//                         onReload ?
//                             <div>
//                                 <Button variant='contained' color='primary' startIcon={<AutorenewIcon />} onClick={onReload}>
//                                     Reload
//                                 </Button>
//                             </div>
//                             : null
//                     }
//                 </Alert>
//                 : null
//         );
//     }
// }

// export default Error;