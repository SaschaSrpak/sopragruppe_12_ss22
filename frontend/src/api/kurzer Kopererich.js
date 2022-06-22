 #getActivitiesForPerson = (id) => `${this.#bankServerBaseURL}/persons/${id}/activity`;
 #addActivitiyToProjectURL = (id, activity_id) => `${this.#bankServerBaseURL}/projects/${id}/activity/${activity_id}`;
 #deleteActivitiyToProjectURL = (id, activity_id) => `${this.#bankServerBaseURL}/projects/${id}/activity/${activity_id}`;
 #deleteActivitiyToProjectURL = (id, activity_id) => `${this.#bankServerBaseURL}/projects/${id}/activity/${activity_id}`;
 #addPersonResponsibleToProjectURL = (id, person_id) => `${this.#bankServerBaseURL}/projects/${id}/persons/${person_id}`;
 #deletePersonResponsibleToProjectURL = (id, person_id) => `${this.#bankServerBaseURL}/projects/${id}/persons/${person_id}`;
 #getAccountForPerson = (id) => `${this.#bankServerBaseURL}/accounts/person/${id}`;



 getActivitiesForPerson() {
        return this.#fetchAdvanced(this.#getActivitiesForPerson()).then((responseJSON) => {
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

