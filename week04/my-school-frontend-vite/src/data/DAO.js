class DAO{
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

    async readClasses() {
        return await this.fetchRoutines("/classes/list");
    }
}

module.exports.DAO = DAO;