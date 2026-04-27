export class GameData {
    constructor(roundNumber, failNumber, backendUrl) {
        this.roundNumber = parseInt(roundNumber);
        this.failNumber = parseInt(failNumber);
        this.backendUrl = backendUrl;
        this.currentRound = 0;
        this.currentFailures = 0;
        this.currentExercise = {};
    }

    goNextRound() {
        this.currentRound++;
        //if (this.currentRound > this.roundNumber) this.currentRound = this.roundNumber;
    }

    isGameOver() {
        return this.currentFailures >= this.failNumber;
    }

    isGameCompleted() {
        return this.currentRound > this.roundNumber;
    }

    isGameRunning(){
        return !this.isGameOver() && !this.isGameCompleted();
    }

    getRoundInfo() {
        return "round " + this.currentRound + " of " + this.roundNumber;
    }

    setExercise(data) {
        this.currentExercise = data;
        // dynamically create answers and randomly replace with proper one
        this.currentExercise.answers = [];
        // position of the proper answer
        const properAnswer = Math.floor(Math.random() * 3);

        for (let i = 0; i < 3; i++) {
            // [1; 9x9]
            this.currentExercise.answers[i] = (i === properAnswer) ? parseInt(this.currentExercise.result) : Math.floor(Math.random() * 81) + 1;
        }
    }

    getExercisePrompt(){
        return this.currentExercise.v1 + " x " + this.currentExercise.v2 + " = ?";
    }

    getExerciseAnswers(){
        return this.currentExercise.answers == null ? [] : this.currentExercise.answers;
    }
}