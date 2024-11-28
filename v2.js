

class Cell { 
    constructor(row, col, css) {
        this.row = row 
        this.col = col 
        this.id = row + "|" + col
        this.css = css
    }
    getHtml() {
        return `<td class="${this.css}" id="${this.id}">${this.id}</td>`
    }
}



