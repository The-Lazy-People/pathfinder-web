import React from "react";

import { randomIntFromInterval } from "./../utils/randomIntFromInterval";
import Header from "./../utils/header";

//Stylesheets
import "./../utils/bootstrap.min.css";
import "./pathfinderVisualiser.css";

const SIZE_OF_BOARD = 22;
const CELL_COLOR = "#778899";
const CELL_CORNER_BORDER_RADIUS = 3;

export default class PathFinderVisualiser extends React.Component {
    constructor(props) {
        super(props);
        this.state = { array: [] };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < SIZE_OF_BOARD * SIZE_OF_BOARD; i++) {
            let val = randomIntFromInterval(0, 500);
            array.push(val);
        }
        this.setState({ array });
        this.drawBoard(array);
    }

    drawBoard(arrayBoard = []) {
        document.getElementById("pathfinderBoard").innerHTML = "";
        // creating the board
        const container = document.getElementById("pathfinderBoard");
        // Adding Rows and Columns to the board
        container.style.setProperty("--p-grid-rows", SIZE_OF_BOARD);
        container.style.setProperty("--p-grid-cols", SIZE_OF_BOARD);
        // Adding cells to the board
        for (let j = 0; j < arrayBoard.length; j++) {
            let cell = document.createElement("div");
            let cellStyle = cell.style;

            container.appendChild(cell).className = "p-grid-item";
            // giving background color to cells
            cellStyle.backgroundColor = CELL_COLOR;

            // styling the corners
            if (j === 0) {
                cellStyle.borderTopLeftRadius = `${CELL_CORNER_BORDER_RADIUS}px`;
            } else if (j === SIZE_OF_BOARD - 1) {
                cellStyle.borderTopRightRadius = `${CELL_CORNER_BORDER_RADIUS}px`;
            } else if (j === SIZE_OF_BOARD * SIZE_OF_BOARD - 1) {
                cellStyle.borderBottomRightRadius = `${CELL_CORNER_BORDER_RADIUS}px`;
            } else if (j === SIZE_OF_BOARD * (SIZE_OF_BOARD - 1)) {
                cellStyle.borderBottomLeftRadius = `${CELL_CORNER_BORDER_RADIUS}px`;
            }
            setTimeout(() => {
                cell.classList.add("popupBlocks");
            }, j * 1.5);
        }
    }

    render() {
        return (
            <div>
                <div className="container-fluid">
                    <div className="row mt-3">
                        <div className="col-sm-6">
                            <div
                                className="pBox shadowT"
                                id="pathfinderBoard"
                            ></div>
                        </div>
                        <div className="col-sm-6">
                            <Header title="Pathfinder Visualizer" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
