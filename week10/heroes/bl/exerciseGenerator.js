export class ExerciseGenerator {
    constructor(url) {
        this.baseUrl = url;
    }

    async fetchRoutines(url) {
        const urlFull = this.baseUrl + url;
        console.log("requesting: " + urlFull);
        let result = null;
        await fetch(urlFull)
            .then((res) => res.json())
            .then((parsedJson) => result = parsedJson);
        console.log("result= " + JSON.stringify(result));
        return result;
    }

    async getExercise() {
        return await this.fetchRoutines("tasks/exercise");
    }
}
