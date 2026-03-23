class DAO {
    constructor() {
        this.baseUrl = "http://localhost:3001";
    }

    async fetchRoutines(url) {
        const fullUrl = this.baseUrl + url;
        console.log("requesting: " + fullUrl);
        // res > Promise, is not HttpResponse
        // result >> JSON
        let result = null;
        await fetch(fullUrl).then((res) => res.json())
            .then((parsedJson) => result = parsedJson);
        return result;
    }

    // data is JSON
    saveRoutines(url, data) {
        const urlFull = this.baseUrl + url;
        return fetch(urlFull,
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
            }
        );
    }

    async readClasses() {
        return await this.fetchRoutines("/classes/list");
    }

    async readStudents(idClass) {
        return await this.fetchRoutines("/students/class/" + idClass);
    }

    async readSubjects() {
        return await this.fetchRoutines("/subjects/list");
    }

    // contains one grade info
    saveGrade(gradeJson){
        return this.saveRoutines("/grades/add", gradeJson);
    }

    async readPerformance() {
        return await this.fetchRoutines("/reports/performance");
    }
}

module.exports.DAO = DAO;