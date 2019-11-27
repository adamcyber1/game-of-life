"use strict"

window.onload = function() {
    let life = new Life()
    life.init()
}

class Life {

    constructor(columns= 90, rows = 48, resolution = 100) {
        this._table = null;
        this._columns = columns;
        this._rows = rows;
        this._colors = {
            dead : '#FFFFFF',
            visited : '#B5ECA2',
            
            // Blue to Red
            //alive : ['#7584EA', '#8278D5', '#8E6CBF', '#9B60AA', '#A75495', '#B44880', '#C03C6A', '#CD3055', '#D92440', '#E6182B', '#F20C15', '#FF0000', '#F20C15', '#E6182B', '#D92440', '#CD3055', '#C03C6A', '#B44880', '#A75495', '#9B60AA', '#8E6CBF', '#8278D5']
        
            // Blue
            alive : '#7272FF'
        };
        this._state = null
        this._new_state = null
        this._cells = null
    }

    init() {
        this._state = null;
        this._new_state = null;
        this._table = document.getElementById('world')
        this.seed_random()
        this.create_grid()
    }

    seed_random() {
        this._state = []
        this._new_state = []
        for (var i = 0; i < this._rows; i++) {
            this._state[i] = [];
            this._new_state[i] = [];
            for (var j = 0; j < this._columns; j++) {
              this._state[i][j] = Math.floor(Math.random()*2);
              this._new_state[i][j] = Math.floor(Math.random()*2);
            }
          }
    }

    create_grid() {
        let table = document.createElement('table');
        this._cells = [];

        for (var i = 0; i < this._rows; i++) {
            let line = document.createElement('tr');
            this._cells[i] = [];
            for (let j = 0; j < this._columns; j++) {
              let cell = document.createElement('td');
              cell.style.backgroundColor = this._colors.dead;
      
              line.appendChild(cell);
              this._cells[i][j] = cell; 
            }
            table.appendChild(line);
          }

          this._table.appendChild(table);
      
    }

};

