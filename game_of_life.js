"use strict"

/**
 * A standard Conway's Game of Life Implementation
 */
class Life {

    constructor(columns= 100, rows = 100) {
        this._table = null;
        this._columns = columns;
        this._rows = rows;
        this._state = null
        this._new_state = null
        this._cells = null
        this._running = false;
        this._waittime = 10;
    }

    init() {
        this._state = null;
        this._new_state = null;
        this._table = document.getElementById('world')
        this.seed_random()
        this.create_grid()
    }

    /**
    * Randomly places live cells through the map
    */
    seed_random() {
        this._state = []
        this._new_state = []
        for (var i = 0; i < this._rows; i++) {
            this._state[i] = [];
            this._new_state[i] = [];
            for (var j = 0; j < this._columns; j++) {
              this._state[i][j] = Math.floor(Math.random()*1.08);
            }
          }
    }

    /**
    * Constructs the map using basic HTML elements (table, tr, td)
    */
    create_grid() {
        let table = document.createElement('table');
        this._cells = [];

        for (var i = 0; i < this._rows; i++) {
            let line = document.createElement('tr');
            this._cells[i] = [];
            for (let j = 0; j < this._columns; j++) {
              let cell = new Cell();
              if (this._state[i][j] == 1) { 
              cell.set_background_color(Colors.alive)
              } else {
                cell.set_background_color(Colors.dead)
              }
      
              line.appendChild(cell.element);
              this._cells[i][j] = cell; 
            }
            table.appendChild(line);
          }

          this._table.appendChild(table);
    }

    /**
    * Iterates the game state by 1 step.
    */
    iterate() {
        this._new_state = [...this._state];

        for (var i = 0; i < this._rows; i++) {
            for (var j = 0; j < this._columns; j++) {
                this.check_state(i, j);
            }
        }

        this._state = this._new_state;

        if (this._running) {
            setTimeout(function() { life.iterate(); }, this._waittime);
        }

    }

    /**
    * Applies the Game of Life rule's to a cell
    * @param {number} i cell row
    * @param {number} j cell column
    */
    check_state(i, j) {

        var neighbours = this.get_neighbours(i, j);

        if (neighbours == 0 || neighbours == 1 || neighbours > 3) {
            this._new_state[i][j] = 0;
            this._cells[i][j].make_dead();
        }
        else { 
            if (neighbours == 3) {
            this._new_state[i][j] = 1;
            this._cells[i][j].make_alive();
            }
        }
    }

    /**
    * Determines the number of live neighbours a cell has
    * @param {number} i cell row
    * @param {number} j cell column
    */
    get_neighbours(i, j) {
        var neighbours = 0;

        if (this._state[i - 1] != undefined) {
          neighbours +=
          (this._state[i - 1][j - 1] == undefined ? 0 : this._state[i - 1][j - 1] ? 1 : 0) +
          (this._state[i - 1][j] == undefined ? 0 : this._state[i - 1][j] ? 1 : 0) +
          (this._state[i - 1][j + 1] == undefined ? 0 : this._state[i - 1][j + 1] ? 1 : 0);
        }
    
        neighbours +=
        (this._state[i][j - 1] == undefined ? 0 : this._state[i][j - 1] ? 1 : 0) +
        (this._state[i][j + 1] == undefined ? 0 : this._state[i][j + 1] ? 1 : 0);
    
        if (this._state[i + 1] != undefined) {
          neighbours +=
          (this._state[i + 1][j - 1] == undefined ? 0 : this._state[i + 1][j - 1] ? 1 : 0) +
          (this._state[i + 1][j] == undefined ? 0 : this._state[i + 1][j] ? 1 : 0) +
          (this._state[i + 1][j + 1] == undefined ? 0 : this._state[i + 1][j + 1] ? 1 : 0);
        }
    
        return neighbours;
    }

    /**
    * Event handler: Single step button.
    */
    button_iterate() {
        this.iterate()
    }

    /**
    * Event handler: Continuous run button.
    */
    button_run(button) {
        this._running = !this._running;
        if (this._running) {
            while(true)
            {
                this.iterate();
                setTimeout()
            }
        }

    }
    
};

/**
 * A Cell - the unit of life in this game.
 */
class Cell {
    constructor() {
        this._element = document.createElement('td')
        this._state = 0;
    }

    set_background_color(color) {
        this._element.style.backgroundColor = color;
    }

    make_alive() {
        this.set_background_color(Colors.alive);
        this._state = 1;
    }

    make_dead() {
        this.set_background_color(Colors.dead);
        this._state = 0;
    }

    toggle_state() {
        if (this._state == 0) {
            this._state = 1;
            this.set_background_color(Colors.alive)
        } else {
            this._state = 0;
            this.set_background_color(Colors.dead)
        }
    }

    get element() {
        return this._element
    }

    get state() {
        return this._state
    }

    set state(state) {
        this._state = state
    }
};

/**
 * Color codes
 * @enum {string}
 */
//TODO make this an enum
var Colors = {
    dead : '#FFFFFF',
    visited : '#B5ECA2',
    alive : '#7272FF'
};

var life = new Life();

/**
 * Starts Life when the page loads
 */
window.onload = function() {
    life.init();
  }