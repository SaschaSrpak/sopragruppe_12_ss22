import PersonBO from './PersonBO'
import ProjektBO from './ProjektBO'
import AktivitaetBO from './AktivitätBO'
import ZeitkontoBO from './ZeitkontoBO'
import EreignisBO from './Ereignisse/EreignisBO'
import StartereignisBO from './Ereignisse/StartereignisBO'
import EndereignisBO from './Ereignisse/EndereignisBO'
import KommenBO from './Ereignisse/KommenBO'
import GehenTransactionBO from './Ereignisse/GehenBO'
import ProjektDeadlineBO from './Ereignisse/ProjektDeadlineBO'
import ZeitintervallBO from './Zeitintervall/ZeitintervallBO'
import PauseBO from './Zeitintervall/PauseBO'
import ProjektlaufzeitBO from './Zeitintervall/ProjektlaufzeitBO'
import ProjektarbeitBO from './Zeitintervall/ProjektarbeitBO'
import Buchung from './Buchungen/BuchungBO'
import EreignisbuchungBO from './Buchungen/EreignisbuchungBO'
import ZeitintervallbuchungBO from './Buchungen/ZeitintervallbuchungBO'
import StartereignisBuchungBO from './Buchungen/StartereignisBuchungBO'
import EndereignisBuchungBO from './Buchungen/EndereignisBuchungBO'
import KommenBuchungBO from './Buchungen/KommenBuchungBO'
import GehenBuchungBO from './Buchungen/GehenBuchungBO'
import PauseBuchungBO from './Buchungen/PauseBuchungBO'
import ProjektarbeitBuchungBO from './Buchungen/ProjektarbeitBuchungBO'


/**
 * Abstracts the REST interface of the Python backend with convenient access methods.
 * The class is implemented as a singleton.
 *
 * @author Leonard Justus)
 */

export default class SystemAPI {

    static #api = null;

    #bankServerBaseURL = '/bank'



    //Person related
    #getPersonsURL = () => `${this.#bankServerBaseURL}/persons`;
    #getPersonURL = (id) => `${this.#bankServerBaseURL}/persons/${id}`;
    #addPersonURL = () => `${this.#bankServerBaseURL}/persons`;
    #getActivitiesForPersonURL = (id) => `${this.#bankServerBaseURL}/persons/${id}/activity`;
    #deletePersonURL = (id) => `${this.#bankServerBaseURL}/persons/${id}`;
    #updatePersonURL = (id) => `${this.#bankServerBaseURL}/persons/${id}`;

    //Project related

    #getProjectsURL = () => `${this.#bankServerBaseURL}/projects`;
    #addProjectURL = () => `${this.#bankServerBaseURL}/projects`;
    #getProjectURL = (id) => `${this.#bankServerBaseURL}/projects/${id}`;
    #deleteProjectURL = (id) => `${this.#bankServerBaseURL}/projects/${id}`;
    #updateProjectURL = (id) => `${this.#bankServerBaseURL}/projects/${id}`;
    #getActivitiesOnProjectURL = (id) => `${this.#bankServerBaseURL}/projects/${id}/activity`;
    #getPersonsOnProjectURL = (id) => `${this.#bankServerBaseURL}/projects/${id}/persons`;
    #addActivitiyToProjectURL = (id, activity_id) => `${this.#bankServerBaseURL}/projects/${id}/activity/${activity_id}`;
    #deleteActivitiyFromProjectURL = (id, activity_id) => `${this.#bankServerBaseURL}/projects/${id}/activity/${activity_id}`;
    #addPersonResponsibleToProjectURL = (id, person_id) => `${this.#bankServerBaseURL}/projects/${id}/persons/${person_id}`;
    #deletePersonResponsibleFromProjectURL = (id, person_id) => `${this.#bankServerBaseURL}/projects/${id}/persons/${person_id}`;

    //Activity related

    #getActivitiesURL = () => `${this.#bankServerBaseURL}/activities`;
    #addActivityURL = () => `${this.#bankServerBaseURL}/activities`;
    #getActivityURL = (id) => `${this.#bankServerBaseURL}/activities/${id}`;
    #deleteActivityURL = (id) => `${this.#bankServerBaseURL}/activities/${id}`;
    #updateActivityURL = (id) => `${this.#bankServerBaseURL}/activities/${id}`;
    #getPersonsResponsibleOnActivityURL = (id) => `${this.#bankServerBaseURL}/activities/${id}/person`;
    #addPersonsResponsibleOnActivityURL = (id, person_id) => `${this.#bankServerBaseURL}/activities/
                                                               ${id}/person/${person_id}`;
    #deletePersonsResponsibleOnActivityURL = (id, person_id) => `${this.#bankServerBaseURL}/activities/
                                                                ${id}/person/${person_id}`;

    //Account related

    #getAccountsURL = () => `${this.#bankServerBaseURL}/activities`;
    #getAccountURL = (id) => `${this.#bankServerBaseURL}/accounts/${id}`;
    #getAccountForPersonURL = (id) => `${this.#bankServerBaseURL}/accounts/person/${id}`;
    #updateAccountURL = (id) => `${this.#bankServerBaseURL}/accounts/${id}`;
    #getKommenTransactionsOfAccountURL = (id) =>`${this.#bankServerBaseURL}/accounts/kommen/transactions/${id}`;
    #getGehenTransactionsOfAccountURL = (id) =>`${this.#bankServerBaseURL}/accounts/gehen/transactions/${id}`;
    #getPauseTransactionsOfAccountURL = (id) =>`${this.#bankServerBaseURL}/accounts/pause/${id}`;
    #getPauseTimeOfAccountURL = (id) =>`${this.#bankServerBaseURL}/accounts/pause/${id}/Time`;
    #getWorktimeTransactionsOfAccountOnActivityURL = (id, activity_id) =>`${this.#bankServerBaseURL}/accounts/
                                                                         transactions/${id}/activities/${activity_id}`;
    #getWorktimeOfAccountOnActivityURL = (id, activity_id) =>`${this.#bankServerBaseURL}/accounts/
                                                            worktime/${id}/activities/${activity_id}`;

    #getWorktimeTransactionsOfAccountURL = (id) =>`${this.#bankServerBaseURL}/accounts/worktime-transactions/${id}`;

    //Commit-Transaction related

    #commitKommenTransactionURL = (account_id) =>`${this.#bankServerBaseURL}/commit-kommen-transaction/${account_id}`
    #commitGehenTransactionURL = (account_id) =>`${this.#bankServerBaseURL}/commit-gehen-transaction/${account_id}`
    #commitPauseTransactionURL = (account_id, name, start_time, end_time) =>`${this.#bankServerBaseURL}
                                                                             /commit-pause-transaction/${account_id}/
                                                                             ${name}/${start_time}/${end_time}`

    #commitProjectWorktimeTransactionURL = (account_id, name, activity_id, start_time, end_time) =>
                                                                            `${this.#bankServerBaseURL}
                                                                            /commit-pause-transaction/${account_id}/
                                                                            ${name}/${activity_id}/${start_time}/
                                                                            ${end_time}`


    // End-Event related

    #getEndEventURL = (id) => `${this.#bankServerBaseURL}/end-event/${id}`;
    #deleteEndEventURL = (id) => `${this.#bankServerBaseURL}/end-event/${id}`;
    #updateEndEventURL = (id) => `${this.#bankServerBaseURL}/end-event/${id}`;

    // End-Event Transaction related

    #getEndEventTransactionURL = (id) => `${this.#bankServerBaseURL}/end-event-transaction/${id}`;
    #deleteEndEventTransactionURL = (id) => `${this.#bankServerBaseURL}/end-event-transaction/${id}`;
    #updateEndEventTransactionURL = (id) => `${this.#bankServerBaseURL}/end-event-transaction/${id}`;

    //Gehen related

    #getGehenURL = (id) => `${this.#bankServerBaseURL}/gehen/${id}`;
    #deleteGehenURL = (id) => `${this.#bankServerBaseURL}/gehen/${id}`;
    #updateGehenURL = (id) => `${this.#bankServerBaseURL}/gehen/${id}`;

    //Gehen Transaction related

    #getGehenTransactionURL = (id) => `${this.#bankServerBaseURL}/gehen-transaction/${id}`;
    #deleteGehenTransactionURL = (id) => `${this.#bankServerBaseURL}/gehen-transaction/${id}`;
    #updateGehenTransactionURL = (id) => `${this.#bankServerBaseURL}/gehen-transaction/${id}`;

    //Kommen related

    #getKommenURL = (id) => `${this.#bankServerBaseURL}/kommen/${id}`;
    #deleteKommenURL = (id) => `${this.#bankServerBaseURL}/kommen/${id}`;
    #updateKommenURL = (id) => `${this.#bankServerBaseURL}/kommen/${id}`;

    //Kommen Transaction relate

    #getKommenTransactionURL = (id) => `${this.#bankServerBaseURL}/kommen-transaction/${id}`;
    #deleteKommenTransactionURL = (id) => `${this.#bankServerBaseURL}/kommen-transaction/${id}`;
    #updateKommenTransactionURL = (id) => `${this.#bankServerBaseURL}/kommen-transaction/${id}`;

    //Pause related

    #getPauseURL = (id) => `${this.#bankServerBaseURL}/pause/${id}`;
    #deletePauseURL = (id) => `${this.#bankServerBaseURL}/pause/${id}`;
    #updatePauseURL = (id) => `${this.#bankServerBaseURL}/pause/${id}`;

    //Pause Transaction relate

    #getPauseTransactionURL = (id) => `${this.#bankServerBaseURL}/pause-transaction/${id}`;
    #deletePauseTransactionURL = (id) => `${this.#bankServerBaseURL}/pause-transaction/${id}`;
    #updatePauseTransactionURL = (id) => `${this.#bankServerBaseURL}/pause-transaction/${id}`;

    //Start-event related

    #getStartEventURL = (id) => `${this.#bankServerBaseURL}/start-event/${id}`;
    #deleteStartEventURL = (id) => `${this.#bankServerBaseURL}/start-event/${id}`;
    #updateStartEventURL = (id) => `${this.#bankServerBaseURL}/start-event/${id}`;

    //Start-event Transaction relate

    #getStartEventTransactionURL = (id) => `${this.#bankServerBaseURL}/start-event-transaction/${id}`;
    #deleteStartEventTransactionURL = (id) => `${this.#bankServerBaseURL}/start-event-transaction/${id}`;
    #updateStartEventTransactionURL = (id) => `${this.#bankServerBaseURL}/start-event-transaction/${id}`;

    //Worktime related

    #getWorktimeURL = (id) => `${this.#bankServerBaseURL}/worktime/${id}`;
    #deleteWorktimeURL = (id) => `${this.#bankServerBaseURL}/worktime/${id}`;
    #updateWorktimeURL = (id) => `${this.#bankServerBaseURL}/worktime/${id}`;

    //Worktime Transaction relate

    #getWorktimeTransactionURL = (id) => `${this.#bankServerBaseURL}/worktime-transaction/${id}`;
    #deleteWorktimeTransactionURL = (id) => `${this.#bankServerBaseURL}/worktime-transaction/${id}`;
    #updateWorktimeTransactionURL = (id) => `${this.#bankServerBaseURL}/worktime-transaction/${id}`;

    //Project-deadline related

    #getProjectDeadlineURL = (id) => `${this.#bankServerBaseURL}/project_deadline/${id}`;
    #deleteProjectDeadlineURL = (id) => `${this.#bankServerBaseURL}/project_deadline/${id}`;
    #updateProjectDeadlineURL = (id) => `${this.#bankServerBaseURL}/project_deadline/${id}`;
    #addProjectDeadlineURL = () => `${this.#bankServerBaseURL}/project_deadline`;

    //Project-duration related

    #getProjectDurationURL = (id) => `${this.#bankServerBaseURL}/project_duration/${id}`;
    #deleteProjectDurationURL = (id) => `${this.#bankServerBaseURL}/project_duration/${id}`;
    #updateProjectDurationURL = (id) => `${this.#bankServerBaseURL}/project_duration/${id}`;
    #addProjectDurationURL = () => `${this.#bankServerBaseURL}/project_duration`;



    static getApi() {
        if (this.#api == null) {
            this.#api = new SystemAPI();
        }
        return this.#api;
    }

    #fetchAdvanced = (url, init) => fetch(url, init)
        .then(res=> {
            if (!res.ok){
                throw Error(`${res.status} ${res.statusText}`)
            }
            return res.json();
        }
        )

    /**
     * Gibt alle Personen im System aus
     *
     * @public
     */

    getPersons() {
        return this.#fetchAdvanced(this.#getPersonsURL()).then((responseJSON) => {
            let personBOs = PersonBO.fromJSON(responseJSON);
            return new Promise ( function (resolve){
                resolve(personBOs);
            })
        })
    }

    getPerson(person_id){
        return this.#fetchAdvanced(this.#getPersonURL(person_id)).then((responseJSON) => {
            let responsePersonBO = PersonBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve){
                resolve(responsePersonBO)
            })
        })
    }


    addPerson(personBO) {
        return this.#fetchAdvanced(this.#addPersonURL(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(personBO)
        }).then((responseJSON) => {
            let responseCustomerBO = PersonBO.fromJSON(responseJSON)[0];
            // console.info(personBO);
            return new Promise(function (resolve) {
                resolve(responseCustomerBO);
            })
        })
    }

    updatePerson(personBO) {
    return this.#fetchAdvanced(this.#updatePersonURL(personBO.getId()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(personBO)
    }).then((responseJSON) => {

      let responsePersonBO = PersonBO.fromJSON(responseJSON)[0];
      // console.info(personBO);
      return new Promise(function (resolve) {
        resolve(responsePersonBO);
      })
    })
  }

  deletePerson(person_id) {
        return this.#fetchAdvanced(this.#deletePersonURL(person_id), {
            method: 'DELETE'
        }).then((responseJSON) => {
            let responsePersonBO = PersonBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responsePersonBO);
            })
        })
  }

  getActivitiesForPerson(person_id) {
        return this.#fetchAdvanced(this.#getActivitiesForPersonURL(person_id)).then((responseJSON) => {
            let activityBOs = AktivitaetBO.fromJSON(responseJSON);
            return new Promise ( function (resolve){
                resolve(activityBOs);
            })
        })
  }

  //Project related Functions


  getProjects() {
        return this.#fetchAdvanced(this.#getProjectsURL()).then((responseJSON) => {
            let projectBOs = ProjektBO.fromJSON(responseJSON);
            return new Promise ( function (resolve){
                resolve(projectBOs);
            })
        })
  }

  getProject(project_id){
        return this.#fetchAdvanced(this.#getProjectURL(project_id)).then((responseJSON) => {
            let responseProjectBO = ProjektBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve){
                resolve(responseProjectBO)
            })
        })
  }

  addProject(projectBO) {
        return this.#fetchAdvanced(this.#addProjectURL(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(projectBO)
        }).then((responseJSON) => {
            let responseProjectBO = ProjektBO.fromJSON(responseJSON)[0];
            // console.info(projectBO);
            return new Promise(function (resolve) {
                resolve(responseProjectBO);
            })
        })
  }

  updateProject(projectBO) {
    return this.#fetchAdvanced(this.#updateProjectURL(projectBO.getId()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(projectBO)
    }).then((responseJSON) => {

      let responseProjectBO = ProjektBO.fromJSON(responseJSON)[0];
      // console.info(projectBO);
      return new Promise(function (resolve) {
        resolve(responseProjectBO);
      })
    })
  }

  deleteProject(project_id) {
        return this.#fetchAdvanced(this.#deleteProjectURL(project_id), {
            method: 'DELETE'
        }).then((responseJSON) => {
            let responseProjectBO = ProjektBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseProjectBO);
            })
        })
  }

  getActivitiesOnProject(project_id) {
        return this.#fetchAdvanced(this.#getActivitiesOnProjectURL(project_id)).then((responseJSON) => {
            let activityBOs = AktivitaetBO.fromJSON(responseJSON);
            return new Promise ( function (resolve){
                resolve(activityBOs);
            })
        })
  }

  getPersonsOnProject(project_id) {
        return this.#fetchAdvanced(this.#getPersonsOnProjectURL(project_id)).then((responseJSON) => {
            let personBOs = PersonBO.fromJSON(responseJSON);
            return new Promise ( function (resolve){
                resolve(personBOs);
            })
        })
  }

  addActivityToProject(project_id, activity_id) {
        return this.#fetchAdvanced(this.#addActivitiyToProjectURL(project_id, activity_id), {
            method: 'POST'
        })
  }

  deleteActivityToProject(project_id, activity_id) {
        return this.#fetchAdvanced(this.#deleteActivitiyFromProjectURL(project_id, activity_id), {
            method: 'DELETE'
        })
  }

  addPersonResponsibleToProject(project_id, person_id) {
        return this.#fetchAdvanced(this.#addPersonResponsibleToProjectURL(project_id, person_id), {
            method: 'POST'
        })
  }

  deletePersonResponsibleToProject(project_id, person_id) {
        return this.#fetchAdvanced(this.#deletePersonResponsibleFromProjectURL(project_id, person_id), {
            method: 'DELETE'
        })
  }


  //Activity related Functions

  getActivities() {
        return this.#fetchAdvanced(this.#getActivitiesURL()).then((responseJSON) => {
            let activityBOs = AktivitaetBO.fromJSON(responseJSON);
            return new Promise ( function (resolve){
                resolve(activityBOs);
            })
        })
  }

  getActivity(activity_id){
        return this.#fetchAdvanced(this.#getActivityURL(activity_id)).then((responseJSON) => {
            let responseActivityBO = AktivitaetBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve){
                resolve(responseActivityBO)
            })
        })
  }

  addActivity(activityBO) {
        return this.#fetchAdvanced(this.#addActivityURL(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(activityBO)
        }).then((responseJSON) => {
            let responseActivityBO = AktivitaetBO.fromJSON(responseJSON)[0];
            // console.info(activityBO);
            return new Promise(function (resolve) {
                resolve(responseActivityBO);
            })
        })
  }

  updateActivity(activityBO) {
    return this.#fetchAdvanced(this.#updateActivityURL(activityBO.getId()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(activityBO)
    }).then((responseJSON) => {

      let responseActivityBO = AktivitaetBO.fromJSON(responseJSON)[0];
      // console.info(activityBO);
      return new Promise(function (resolve) {
        resolve(responseActivityBO);
      })
    })
  }

  deleteActivity(activity_id) {
        return this.#fetchAdvanced(this.#deleteActivityURL(activity_id), {
            method: 'DELETE'
        }).then((responseJSON) => {
            let responseActivityBO = AktivitaetBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseActivityBO);
            })
        })
  }

  getPersonsResponsibleOnActivity(activity_id) {
        return this.#fetchAdvanced(this.#getPersonsResponsibleOnActivityURL(activity_id)).then((responseJSON) => {
            let personBOs = PersonBO.fromJSON(responseJSON);
            return new Promise ( function (resolve){
                resolve(personBOs);
            })
        })
  }

  addPersonResponsibleOnActivity(activity_id, person_id) {
        return this.#fetchAdvanced(this.#addPersonsResponsibleOnActivityURL(activity_id, person_id), {
            method: 'POST'
        })
  }

  deletePersonResponsibleOnActivity(activity_id, person_id) {
        return this.#fetchAdvanced(this.#deletePersonsResponsibleOnActivityURL(activity_id, person_id), {
            method: 'DELETE'
        })
  }


  // Account related Functions

  getAccounts() {
        return this.#fetchAdvanced(this.#getAccountsURL()).then((responseJSON) => {
            let accountBOs = ZeitkontoBO.fromJSON(responseJSON);
            return new Promise ( function (resolve){
                resolve(accountBOs);
            })
        })
  }

  getAccount(account_id){
        return this.#fetchAdvanced(this.#getAccountURL(account_id)).then((responseJSON) => {
            let responseAccountBO = ZeitkontoBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve){
                resolve(responseAccountBO)
            })
        })
  }

  getAccountForPerson(person_id){
        return this.#fetchAdvanced(this.#getAccountForPersonURL(person_id)).then((responseJSON) => {
            let responseAccountBO = ZeitkontoBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve){
                resolve(responseAccountBO)
            })
        })
  }


  updateAccount(accountBO) {
    return this.#fetchAdvanced(this.#updateAccountURL(accountBO.getId()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(accountBO)
    }).then((responseJSON) => {

      let responseAccountBO = ZeitkontoBO.fromJSON(responseJSON)[0];
      // console.info(activityBO);
      return new Promise(function (resolve) {
        resolve(responseAccountBO);
      })
    })
  }

  getKommenTransactionsOfAccount(account_id){
        return this.#fetchAdvanced(this.#getKommenTransactionsOfAccountURL(account_id)).then((responseJSON) => {
            let transactionBOs = KommenBuchungBO.fromJSON(responseJSON);
            return new Promise(function (resolve){
                resolve(transactionBOs)
            })
        })
  }

  getGehenTransactionsOfAccount(account_id){
        return this.#fetchAdvanced(this.#getGehenTransactionsOfAccountURL(account_id)).then((responseJSON) => {
            let transactionBOs = GehenBuchungBO.fromJSON(responseJSON);
            return new Promise(function (resolve){
                resolve(transactionBOs)
            })
        })
  }

  getPauseTransactionsOfAccount(account_id){
        return this.#fetchAdvanced(this.#getPauseTransactionsOfAccountURL(account_id)).then((responseJSON) => {
            let transactionBOs = PauseBuchungBO.fromJSON(responseJSON);
            return new Promise(function (resolve){
                resolve(transactionBOs)
            })
        })
  }

  getPauseTimeOfAccount(account_id){
        return this.#fetchAdvanced(this.#getPauseTimeOfAccountURL(account_id)).then((responseJSON) => {
            let pause_time = responseJSON;
            return new Promise(function (resolve){
                resolve(pause_time)
            })
        })
  }

  getWorktimeTransactionsOfAccount(account_id){
        return this.#fetchAdvanced(this.#getWorktimeTransactionsOfAccountURL(account_id)).then((responseJSON) => {
            let transactionBOs = ProjektarbeitBuchungBO.fromJSON(responseJSON);
            return new Promise(function (resolve){
                resolve(transactionBOs)
            })
        })
  }

  getWorktimeTransactionsOfAccountOnActivity(account_id, activity_id){
        return this.#fetchAdvanced(this.#getWorktimeTransactionsOfAccountOnActivityURL(account_id, activity_id)).then((responseJSON) => {
            let transactionBOs = ProjektarbeitBuchungBO.fromJSON(responseJSON);
            return new Promise(function (resolve){
                resolve(transactionBOs)
            })
        })
  }

  getWorktimeOfAccountOnActivity(account_id, activity_id){
        return this.#fetchAdvanced(this.#getWorktimeOfAccountOnActivityURL(account_id, activity_id)).then((responseJSON) => {
            let worktime = responseJSON;
            return new Promise(function (resolve){
                resolve(worktime)
            })
        })
  }

  //Commit-Transaction related Functions

  commitKommenTransaction(account_id, kommenBO) {
        return this.#fetchAdvanced(this.#commitKommenTransactionURL(account_id), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(kommenBO)
        }).then((responseJSON) => {
            let responseKommmenBO = KommenBO.fromJSON(responseJSON)[0];
            // console.info(personBO);
            return new Promise(function (resolve) {
                resolve(responseKommmenBO);
            })
        })
  }

  commitGehenTransaction(account_id, gehenBO) {
        return this.#fetchAdvanced(this.#commitGehenTransactionURL(account_id), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(gehenBO)
        }).then((responseJSON) => {
            let responseGehenBO = GehenBO.fromJSON(responseJSON)[0];
            // console.info(personBO);
            return new Promise(function (resolve) {
                resolve(responseGehenBO);
            })
        })
  }

  commitPauseTransaction(account_id, name, start_time, end_time) {
        return this.#fetchAdvanced(this.#commitPauseTransactionURL(account_id, name, start_time, end_time), {
            method: 'POST',
        })
  }

  commitProjectWorktimeTransaction(account_id, name, activity_id, start_time, end_time) {
        return this.#fetchAdvanced(this.#commitProjectWorktimeTransactionURL(account_id, name, activity_id, start_time, end_time), {
            method: 'POST',
        })
  }



  //Start-Event related Functions

  /**
   * Returns a Promise, which resolves to a StartereignisBO.
   *
   * @param {Number} StartEvent_id to be retrieved
   * @public
   */

    getStartEvent(StartEvent_id){
        return this.#fetchAdvanced(this.#getStartEventURL(StartEvent_id)).then((responseJSON) => {
            let responseStartereignisBO = StartereignisBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve){
                resolve(responseStartereignisBO)
            })
        })
    }

  /**
   * Returns a Promise, which resolves to an Array of StartereignisBO.
   *
   * @param {Number} StartEvent_id to be deleted
   * @public
   */

    deleteStartEvent(StartEvent_id) {
        return this.#fetchAdvanced(this.#deleteStartEventURL(StartEvent_id), {
            method: 'DELETE'
        }).then((responseJSON) => {
            let responseStartereignisBO = StartereignisBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseStartereignisBO);
            })
        })
    }
  /**
   * Updates a endevent and returns a Promise, which resolves to a StartereignisBO.
   *
   * @param {StartereignisBO} StartereignisBO to be updated
   * @public
   */
  updateStartEvent(StartereignisBO) {
    return this.#fetchAdvanced(this.#updateStartEventURL(StartereignisBO.getId()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(StartereignisBO)
    }).then((responseJSON) => {
      // We always get an array of StartereignisBO.fromJSON
      let responseStartereignisBO = StartereignisBO.fromJSON(responseJSON)[0];
      // console.info(StartereignisBO);
      return new Promise(function (resolve) {
        resolve(responseStartereignisBO);
      })
    })
  }


  //Start-Event-Transaction related Functions

   /**
   * Returns a Promise, which resolves to a EndereignisBuchungBO.
   *
   * @param {Number} StartEventTransaction_id to be retrieved
   * @public
   */

    getStartEventTransaction(StartEventTransaction_id){
        return this.#fetchAdvanced(this.#getStartEventTransactionURL(StartEventTransaction_id)).then((responseJSON) => {
            let responseStartereignisBuchungBO = StartereignisBuchungBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve){
                resolve(responseStartereignisBuchungBO)
            })
        })
    }

  /**
   * Returns a Promise, which resolves to an Array of StartereignisBuchungBO.
   *
   * @param {Number} StartEventTransaction_id to be deleted
   * @public
   */

    deleteStartEventTransaction(StartEventTransaction_id) {
        return this.#fetchAdvanced(this.#deleteStartEventTransactionURL(StartEvent_id), {
            method: 'DELETE'
        }).then((responseJSON) => {
            let responseStartereignisBuchungBO = StartereignisBuchungBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseStartereignisBuchungBO);
            })
        })
    }
  /**
   * Updates a endevent and returns a Promise, which resolves to a StartereignisBuchungBO.
   *
   * @param {StartereignisBuchungBO} StartereignisBuchungBO to be updated
   * @public
   */
  updateStartEventTransaction(StartereignisBuchungBO) {
    return this.#fetchAdvanced(this.#updateStartEventTransactionURL(StartereignisBuchungBO.getId()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(StartereignisBuchungBO)
    }).then((responseJSON) => {
      // We always get an array of StartereignisBuchungBO.fromJSON
      let responseStartereignisBuchungBO = StartereignisBuchungBO.fromJSON(responseJSON)[0];
      // console.info(StartereignisBuchungBO);
      return new Promise(function (resolve) {
        resolve(responseStartereignisBuchungBO);
      })
    })
  }



  //End-Event related Functions

  /**
   * Returns a Promise, which resolves to a EndereignisBO.
   *
   * @param {Number} EndEvent_id to be retrieved
   * @public
   */

    getEndEvent(EndEvent_id){
        return this.#fetchAdvanced(this.#getEndEventURL(EndEvent_id)).then((responseJSON) => {
            let responseEndereignisBO = EndereignisBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve){
                resolve(responseEndereignisBO)
            })
        })
    }




  /**
   * Returns a Promise, which resolves to an Array of EndereignisBO.
   *
   * @param {Number} EndEvent_id to be deleted
   * @public
   */

    deleteEndEvent(EndEvent_id) {
        return this.#fetchAdvanced(this.#deleteEndEventURL(EndEvent_id), {
            method: 'DELETE'
        }).then((responseJSON) => {
            let responseEndereignisBO = EndereignisBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseEndereignisBO);
            })
        })
    }

  /**
   * Updates a endevent and returns a Promise, which resolves to a EndereignisBO.
   *
   * @param {EndereignisBO} EndereignisBO to be updated
   * @public
   */
  updateEndEvent(EndereignisBO) {
    return this.#fetchAdvanced(this.#updateEndEventURL(EndereignisBO.getId()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(EndereignisBO)
    }).then((responseJSON) => {
      // We always get an array of EndereignisBO.fromJSON
      let responseEndereignisBO = EndereignisBO.fromJSON(responseJSON)[0];
      // console.info(EndereignisBO);
      return new Promise(function (resolve) {
        resolve(responseEndereignisBO);
      })
    })
  }

  //End-Event-Transaction related Functions

  /**
   * Returns a Promise, which resolves to a EndereignisBuchungBO.
   *
   * @param {Number} EndEventTransaction_id to be retrieved
   * @public
   */

    getEndEventTransaction(EndEventTransaction_id){
        return this.#fetchAdvanced(this.#getEndEventTransactionURL(EndEventTransaction_id)).then((responseJSON) => {
            let responseEndereignisBuchungBO = EndereignisBuchungBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve){
                resolve(responseEndereignisBuchungBO)
            })
        })
    }

  /**
   * Returns a Promise, which resolves to an Array of EndereignisBuchungBO.
   *
   * @param {Number} EndEventTransaction_id to be deleted
   * @public
   */

    deleteEndEventTransaction(EndEventTransaction_id) {
        return this.#fetchAdvanced(this.#deleteEndEventTransactionURL(EndEvent_id), {
            method: 'DELETE'
        }).then((responseJSON) => {
            let responseEndereignisBuchungBO = EndereignisBuchungBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseEndereignisBuchungBO);
            })
        })
    }
  /**
   * Updates a endevent and returns a Promise, which resolves to a EndereignisBuchungBO.
   *
   * @param {EndereignisBuchungBO} EndereignisBuchungBO to be updated
   * @public
   */
  updateEndEventTransaction(EndereignisBuchungBO) {
    return this.#fetchAdvanced(this.#updateEndEventTransactionURL(EndereignisBuchungBO.getId()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(EndereignisBuchungBO)
    }).then((responseJSON) => {
      // We always get an array of EndereignisBuchungBO.fromJSON
      let responseEndereignisBuchungBO = EndereignisBuchungBO.fromJSON(responseJSON)[0];
      // console.info(EndereignisBuchungBO);
      return new Promise(function (resolve) {
        resolve(responseEndereignisBuchungBO);
      })
    })
  }


  //Gehen-Event related Functions

    /**
   * Returns a Promise, which resolves to a GehenBO.
   *
   * @param {Number} Gehen_id to be retrieved
   * @public
   */

    getGehen(Gehen_id){
        return this.#fetchAdvanced(this.#getGehenURL(Gehen_id)).then((responseJSON) => {
            let responseGehenBO = GehenBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve){
                resolve(responseGehenBO)
            })
        })
    }

  /**
   * Returns a Promise, which resolves to an Array of GehenBO.
   *
   * @param {Number} Gehen_id to be deleted
   * @public
   */

    deleteGehen(Gehen_id) {
        return this.#fetchAdvanced(this.#deleteGehenURL(Gehen_id), {
            method: 'DELETE'
        }).then((responseJSON) => {
            let responseGehenBO = GehenBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseGehenBO);
            })
        })
    }
  /**
   * Updates a endevent and returns a Promise, which resolves to a GehenBO.
   *
   * @param {GehenBO} GehenBO to be updated
   * @public
   */
  updateGehen(GehenBO) {
    return this.#fetchAdvanced(this.#updateGehenURL(GehenBO.getId()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(GehenBO)
    }).then((responseJSON) => {
      // We always get an array of GehenBO.fromJSON
      let responseGehenBO = GehenBO.fromJSON(responseJSON)[0];
      // console.info(GehenBO);
      return new Promise(function (resolve) {
        resolve(responseGehenBO);
      })
    })
  }

  //Gehen-Event-Transaction related Functions

      /**
   * Returns a Promise, which resolves to a GehenBuchungBO.
   *
   * @param {Number} GehenTransaction_id to be retrieved
   * @public
   */

    getGehenTransaction(GehenTransaction_id){
        return this.#fetchAdvanced(this.#getGehenTransactionURL(GehenTransaction_id)).then((responseJSON) => {
            let responseGehenBuchungBO = GehenBuchungBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve){
                resolve(responseGehenBuchungBO)
            })
        })
    }

  /**
   * Returns a Promise, which resolves to an Array of GehenBuchungBO.
   *
   * @param {Number} GehenTransaction_id to be deleted
   * @public
   */

    deleteGehenTransaction(GehenTransaction_id) {
        return this.#fetchAdvanced(this.#deleteGehenTransactionURL(GehenTransaction_id), {
            method: 'DELETE'
        }).then((responseJSON) => {
            let responseGehenBuchungBO = GehenBuchungBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseGehenBuchungBO);
            })
        })
    }
  /**
   * Updates a endevent and returns a Promise, which resolves to a GehenBuchungBO.
   *
   * @param {GehenBuchungBO} GehenBuchungBO to be updated
   * @public
   */
  updateGehenTransaction(GehenBuchungBO) {
    return this.#fetchAdvanced(this.#updateGehenTransactionURL(GehenBuchungBO.getId()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(GehenBuchungBO)
    }).then((responseJSON) => {
      // We always get an array of GehenBO.fromJSON
      let responseGehenBuchungBO = GehenBuchungBO.fromJSON(responseJSON)[0];
      // console.info(GehenBuchungBO);
      return new Promise(function (resolve) {
        resolve(responseGehenBuchungBO);
      })
    })
  }

  //Gehen-Event related Functions

      /**
   * Returns a Promise, which resolves to a KommenBO.
   *
   * @param {Number} Kommen_id to be retrieved
   * @public
   */

    getKommen(Kommen_id){
        return this.#fetchAdvanced(this.#getKommenURL(Kommen_id)).then((responseJSON) => {
            let responseKommenBO = KommenBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve){
                resolve(responseKommenBO)
            })
        })
    }

  /**
   * Returns a Promise, which resolves to an Array of KommenBO.
   *
   * @param {Number} Kommen_id to be deleted
   * @public
   */

    deleteKommen(Kommen_id) {
        return this.#fetchAdvanced(this.#deleteKommenURL(Kommen_id), {
            method: 'DELETE'
        }).then((responseJSON) => {
            let responseKommenBO = KommenBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseKommenBO);
            })
        })
    }
  /**
   * Updates a endevent and returns a Promise, which resolves to a KommenBO.
   *
   * @param {KommenBO} KommenBO to be updated
   * @public
   */
  updateKommen(KommenBO) {
    return this.#fetchAdvanced(this.#updateKommenURL(KommenBO.getId()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(KommenBO)
    }).then((responseJSON) => {
      // We always get an array of KommenBO.fromJSON
      let responseKommenBO = KommenBO.fromJSON(responseJSON)[0];
      // console.info(KommenBO);
      return new Promise(function (resolve) {
        resolve(responseKommenBO);
      })
    })
  }

     /**
   * Returns a Promise, which resolves to a KommenBuchungBO.
   *
   * @param {Number} KommenTransaction_id to be retrieved
   * @public
   */

  getKommenTransaction(KommenTransaction_id){
        return this.#fetchAdvanced(this.#getKommenTransactionURL(KommenTransaction_id)).then((responseJSON) => {
            let responseKommenBuchungBO = KommenBuchungBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve){
                resolve(responseKommenBuchungBO)
            })
        })
  }

  /**
   * Returns a Promise, which resolves to an Array of KommenBuchungBO.
   *
   * @param {Number} KommenTransaction_id to be deleted
   * @public
   */

    deleteKommenTransaction(KommenTransaction_id) {
        return this.#fetchAdvanced(this.#deleteKommenTransactionURL(KommenTransaction_id), {
            method: 'DELETE'
        }).then((responseJSON) => {
            let responseKommenBuchungBO = KommenBuchungBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseKommenBuchungBO);
            })
        })
    }
  /**
   * Updates a endevent and returns a Promise, which resolves to a KommenBuchungBO.
   *
   * @param {KommenBuchungBO} KommenBuchungBO to be updated
   * @public
   */
  updateKommenTransaction(KommenBuchungBO) {
    return this.#fetchAdvanced(this.#updateKommenTransactionURL(KommenBuchungBO.getId()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(KommenBuchungBO)
    }).then((responseJSON) => {
      // We always get an array of KommenBuchungBO.fromJSON
      let responseKommenBuchungBO = KommenBuchungBO.fromJSON(responseJSON)[0];
      // console.info(KommenBuchungBO);
      return new Promise(function (resolve) {
        resolve(responseKommenBuchungBO);
      })
    })
  }

  //Pause related Functions

  /**
   * Returns a Promise, which resolves to a PauseBO.
   *
   * @param {Number} Pause_id to be retrieved
   * @public
   */

    getPause(Pause_id){
        return this.#fetchAdvanced(this.#getPauseURL(Pause_id)).then((responseJSON) => {
            let responsePauseBO = PauseBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve){
                resolve(responsePauseBO)
            })
        })
    }

  /**
   * Returns a Promise, which resolves to an Array of PauseBO.
   *
   * @param {Number} Pause_id to be deleted
   * @public
   */

    deletePause(Pause_id) {
        return this.#fetchAdvanced(this.#deletePauseURL(Pause_id), {
            method: 'DELETE'
        }).then((responseJSON) => {
            let responsePauseBO = PauseBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responsePauseBO);
            })
        })
    }
  /**
   * Updates a endevent and returns a Promise, which resolves to a PauseBO.
   *
   * @param {PauseBO} PauseBO to be updated
   * @public
   */
  updatePause(PauseBO) {
    return this.#fetchAdvanced(this.#updatePauseURL(PauseBO.getId()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(PauseBO)
    }).then((responseJSON) => {
      // We always get an array of PauseBO.fromJSON
      let responsePauseBO = PauseBO.fromJSON(responseJSON)[0];
      // console.info(PauseBO);
      return new Promise(function (resolve) {
        resolve(responsePauseBO);
      })
    })
  }

  //Pause-Transaction related Functions

   /**
   * Returns a Promise, which resolves to a KommenBuchungBO.
   *
   * @param {Number} PauseTransaction_id to be retrieved
   * @public
   */

    getPauseTransaction(PauseTransaction_id){
        return this.#fetchAdvanced(this.#getPauseTransactionURL(PauseTransaction_id)).then((responseJSON) => {
            let responsePauseBuchungBO = PauseBuchungBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve){
                resolve(responsePauseBuchungBO)
            })
        })
    }

  /**
   * Returns a Promise, which resolves to an Array of PauseBuchungBO.
   *
   * @param {Number} PauseTransaction_id to be deleted
   * @public
   */

    deletePauseTransaction(PauseTransaction_id) {
        return this.#fetchAdvanced(this.#deletePauseTransactionURL(PauseTransaction_id), {
            method: 'DELETE'
        }).then((responseJSON) => {
            let responsePauseBuchungBO = PauseBuchungBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responsePauseBuchungBO);
            })
        })
    }
  /**
   * Updates a endevent and returns a Promise, which resolves to a PauseBuchungBO.
   *
   * @param {PauseBuchungBO} PauseBuchungBO to be updated
   * @public
   */
  updatePauseTransaction(PauseBuchungBO) {
    return this.#fetchAdvanced(this.#updatePauseTransactionURL(PauseBuchungBO.getId()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(PauseBuchungBO)
    }).then((responseJSON) => {
      // We always get an array of PauseBO.fromJSON
      let responsePauseBuchungBO = PauseBuchungBO.fromJSON(responseJSON)[0];
      // console.info(PauseBuchungBO);
      return new Promise(function (resolve) {
        resolve(responsePauseBuchungBO);
      })
    })
  }


  //Project-Worktime related Functions

  /**
   * Returns a Promise, which resolves to a ProjektarbeitBO.
   *
   * @param {Number} Worktime_id to be retrieved
   * @public
   */

    getWorktime(Worktime_id){
        return this.#fetchAdvanced(this.#getWorktimeURL(Worktime_id)).then((responseJSON) => {
            let responseProjektarbeitBO = ProjektarbeitBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve){
                resolve(responseProjektarbeitBO)
            })
        })
    }

  /**
   * Returns a Promise, which resolves to an Array of ProjektarbeitBO.
   *
   * @param {Number} Worktime_id to be deleted
   * @public
   */

    deleteWorktime(Worktime_id) {
        return this.#fetchAdvanced(this.#deleteWorktimeURL(Worktime_id), {
            method: 'DELETE'
        }).then((responseJSON) => {
            let responseProjektarbeitBO = ProjektarbeitBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseProjektarbeitBO);
            })
        })
    }
  /**
   * Updates a endevent and returns a Promise, which resolves to a ProjektarbeitBO.
   *
   * @param {ProjektarbeitBO} ProjektarbeitBO to be updated
   * @public
   */
  updateWorktime(ProjektarbeitBO) {
    return this.#fetchAdvanced(this.#updateWorktimeURL(ProjektarbeitBO.getId()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(ProjektarbeitBO)
    }).then((responseJSON) => {
      // We always get an array of ProjektarbeitBO.fromJSON
      let responseProjektarbeitBO = ProjektarbeitBO.fromJSON(responseJSON)[0];
      // console.info(ProjektarbeitBO);
      return new Promise(function (resolve) {
        resolve(responseProjektarbeitBO);
      })
    })
  }

     /**
   * Returns a Promise, which resolves to a EndereignisBuchungBO.
   *
   * @param {Number} EndEventTransaction_id to be retrieved
   * @public
   */

    getWorktimeTransaction(WorktimeTransaction_id){
        return this.#fetchAdvanced(this.#getWorktimeTransactionURL(WorktimeTransaction_id)).then((responseJSON) => {
            let responseProjektarbeitBuchungBO = ProjektarbeitBuchungBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve){
                resolve(responseProjektarbeitBuchungBO)
            })
        })
    }


  //Project-Worktime-Transaction related Functions

  /**
   * Returns a Promise, which resolves to an Array of ProjektarbeitBuchungBO.
   *
   * @param {Number} WorktimeTransaction_id to be deleted
   * @public
   */

    deleteWorktimeTransaction(WorktimeTransaction_id) {
        return this.#fetchAdvanced(this.#deleteWorktimeTransactionURL(Worktime_id), {
            method: 'DELETE'
        }).then((responseJSON) => {
            let responseProjektarbeitBuchungBO = ProjektarbeitBuchungBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseProjektarbeitBuchungBO);
            })
        })
    }
  /**
   * Updates a Project-Worktime-Transaction and returns a Promise, which resolves to a ProjektarbeitBuchungBO.
   *
   * @param {ProjektarbeitBuchungBO} ProjektarbeitBuchungBO to be updated
   * @public
   */
  updateWorktimeTransaction(ProjektarbeitBuchungBO) {
    return this.#fetchAdvanced(this.#updateWorktimeTransactionURL(ProjektarbeitBuchungBO.getId()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(ProjektarbeitBuchungBO)
    }).then((responseJSON) => {
      // We always get an array of ProjektarbeitBuchungBO.fromJSON
      let responseProjektarbeitBuchungBO = ProjektarbeitBuchungBO.fromJSON(responseJSON)[0];
      // console.info(ProjektarbeitBuchungBO);
      return new Promise(function (resolve) {
        resolve(responseProjektarbeitBuchungBO);
      })
    })
  }


  //Project-Deadline related Functions

  /**
   * Returns a Promise, which resolves to a ProjektDeadlineBO.
   *
   * @param {Number} ProjectDeadline_id to be retrieved
   * @public
   */

    getProjectDeadline(ProjectDeadline_id){
        return this.#fetchAdvanced(this.#getProjectDeadlineURL(ProjectDeadline_id)).then((responseJSON) => {
            let responseProjektDeadlineBO = ProjektDeadlineBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve){
                resolve(responseProjektDeadlineBO)
            })
        })
    }

  /**
   * Returns a Promise, which resolves to an Array of ProjektDeadlineBO.
   *
   * @param {Number} ProjectDeadline_id to be deleted
   * @public
   */

    deleteProjectDeadline(ProjectDeadline_id) {
        return this.#fetchAdvanced(this.#deleteProjectDeadlineURL(ProjectDeadline_id), {
            method: 'DELETE'
        }).then((responseJSON) => {
            let responseProjektDeadlineBO = ProjektDeadlineBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseProjektDeadlineBO);
            })
        })
    }
  /**
   * Updates a endevent and returns a Promise, which resolves to a ProjektDeadlineBO.
   *
   * @param {ProjektDeadlineBO} ProjektDeadlineBO to be updated
   * @public
   */
  updateProjectDeadline(ProjektDeadlineBO) {
    return this.#fetchAdvanced(this.#updateProjectDeadlineURL(ProjektDeadlineBO.getId()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(ProjektDeadlineBO)
    }).then((responseJSON) => {
      // We always get an array of ProjektDeadlineBO.fromJSON
      let responseProjektDeadlineBO = ProjektDeadlineBO.fromJSON(responseJSON)[0];
      // console.info(ProjektDeadlineBO);
      return new Promise(function (resolve) {
        resolve(responseProjektDeadlineBO);
      })
    })
  }

  /**
   * Adds a ProjektDeadline and returns a Promise
   *
   * @param ProjektDeadlineBO to be added
   * @public
   */

      addProjectDeadline(ProjektDeadlineBO) {
        return this.#fetchAdvanced(this.#addProjectDeadlineURL(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(ProjektDeadlineBO)
        }).then((responseJSON) => {
            let responseProjektDeadlineBO = ProjektDeadlineBO.fromJSON(responseJSON)[0];
            // console.info(ProjektDeadlineBO);
            return new Promise(function (resolve) {
                resolve(responseProjektDeadlineBO);
            })
        })
    }


   //Project-Duration related Functions

    /**
   * Returns a Promise, which resolves to a ProjektDeadlineBO.
   *
   * @param {Number} ProjectDuration_id to be retrieved
   * @public
   */

    getProjectDuration(ProjectDuration_id){
        return this.#fetchAdvanced(this.#getProjectDurationURL(ProjectDuration_id)).then((responseJSON) => {
            let responseProjektlaufzeitBO = ProjektlaufzeitBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve){
                resolve(responseProjektlaufzeitBO)
            })
        })
    }

  /**
   * Returns a Promise, which resolves to an Array of ProjektlaufzeitBO.
   *
   * @param {Number} ProjectDuration_id to be deleted
   * @public
   */

    deleteProjectDuration(ProjectDuration_id) {
        return this.#fetchAdvanced(this.#deleteProjectDurationURL(ProjectDuration_id), {
            method: 'DELETE'
        }).then((responseJSON) => {
            let responseProjektlaufzeitBO = ProjektlaufzeitBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseProjektlaufzeitBO);
            })
        })
    }
  /**
   * Updates a endevent and returns a Promise, which resolves to a ProjektlaufzeitBO.
   *
   * @param {ProjektlaufzeitBO} ProjektlaufzeitBO to be updated
   * @public
   */
  updateProjectDuration(ProjektlaufzeitBO) {
    return this.#fetchAdvanced(this.#updateProjectDurationURL(ProjektlaufzeitBO.getId), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(ProjektlaufzeitBO)
    }).then((responseJSON) => {
      // We always get an array of ProjektlaufzeitBO.fromJSON
      let responseProjektlaufzeitBO = ProjektlaufzeitBO.fromJSON(responseJSON)[0];
      // console.info(ProjektlaufzeitBO);
      return new Promise(function (resolve) {
        resolve(responseProjektlaufzeitBO);
      })
    })
  }
    /**
   * Adds a ProjektDuration and returns a Promise
   *
   * @param ProjektlaufzeitBO to be added
   * @public
   */

      addProjectDuration(ProjektlaufzeitBO) {
        return this.#fetchAdvanced(this.#addProjectDurationURL(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(ProjektlaufzeitBO)
        }).then((responseJSON) => {
            let responseProjektlaufzeitBO = ProjektlaufzeitBO.fromJSON(responseJSON)[0];
            // console.info(ProjektlaufzeitBO);
            return new Promise(function (resolve) {
                resolve(responseProjektlaufzeitBO);
            })
        })
    }
}