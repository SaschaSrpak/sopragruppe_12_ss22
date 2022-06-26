import React, { Component } from 'react';
import SystemAPI from '../../api/SystemAPI';
import Delete from '../Zwischenelemente/Delete';
import PropTypes from 'prop-types';

/** 
 *@fileOverview 
 *@author Kim Kausler
*/

class Listen extends Component {

    constructor(props) {
      super(props);

      this.state = {
        worktime: [],
        pause: [],
        kommen:[],
        gehen:[],
        showDelete: false, 
        
      };

    }

    getWorktime = () => {
    SystemAPI.getAPI().getWorktimeTransactionURL()
      .then(ZeitkontoBO=>
        this.setState({               
          worktime: ZeitkontoBO,
          loader: false,   
          error: null
        })).catch(e =>
          this.setState({             
            worktime: [],
            loader: false,  
            error: e
          })
        );

    this.setState({
      loader: true,
      error: null
    });
    }

    getPause = () => {
        SystemAPI.getAPI().getPauseTransactionURL()
            .then(PauseBuchungBO=>
                this.setState({               
                pause: PauseBuchungBO,
                loader: false,   
                error: null
            })).catch(e =>
                this.setState({             
                pause: [],
                loader: false,  
                error: e
                })
            );

        this.setState({
            loader: true,
            error: null
            });
    } 

    getKommen = () => {
        SystemAPI.getAPI().getKommenTransactionURL()
            .then(KommenBuchungBO=>
                this.setState({               
                    kommen: KommenBuchungBO,
                    loader: false,   
                    error: null
            })).catch(e =>
                this.setState({             
                    kommen: [],
                    loader: false,   
                    error: e
                })
            );

        this.setState({
            loader: true,
            error: null
            });
    }

    getGehen = () => {
        SystemAPI.getAPI().getGehenTransactionURL()
            .then(GehenBuchungBO=>
                this.setState({               
                    gehen: GehenBuchungBO,
                    loader: false,   
                    error: null
            })).catch(e =>
                this.setState({             
                    gehen: [],
                    loader: false,  
                    error: e
                })
            );

        this.setState({
            loader: true,
            error: null
         });
    }

    componentDidMount() {
        this.getWorktime();
        this.getPause();
        this.getKommen();
        this.getGehen();
    }

    deleteKommenButtonClicked = (event) => {
        event.stopPropagation();
        this.setState({
        showDelete: true
        });
    }

    deleteKommenDialogClosed = (kommen) => {
        if (kommen) {
        this.props.onKommenDeleted(kommen);
        };

        this.setState({
            showDelete: false
        });
    }
/*
    render(){
        return(
            <div sx={{ width: '100%' }}>
                <List sx={{ marginBottom: 2 }}>
                    {
                    accounts.map(account => <AccountListEntry key={account.getID()} customer={customer} account={account} onAccountDeleted={this.deleteAccountHandler}
                    show={this.props.show} />)
                }
                <ListItem>
                    <LoadingProgress show={loadingInProgress} />
                    <ContextErrorMessage error={loadingAccountError} contextErrorMsg={`List of accounts for customer ${customer.getID()} could not be loaded.`} onReload={this.getAccounts} />
                    <ContextErrorMessage error={addingAccountError} contextErrorMsg={`Account for customer ${customer.getID()} could not be added.`} onReload={this.addAccount} />
                </ListItem>
                </List>
                <ButtonGroup variant='text' size='small' style={{alignItems: "right"}}>
                  <Button color='primary' onClick={""}>
                    edit
                  </Button>
                  <Button color='secondary' onClick={this.deleteKommenButtonClicked}>
                    delete
                  </Button>
                </ButtonGroup>
            </div>
        )
    }
*/
}

export default Listen;