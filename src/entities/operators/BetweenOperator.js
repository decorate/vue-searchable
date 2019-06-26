
export default class BetweenOperator {
    constructor(command) {
        const d = command.data[command.key]
        this.start = d[0]
        this.end = d[1]
    }
}