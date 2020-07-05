import React from "react";

import Node from "./Node/Node";

//Stylesheets
import "./pathfinderVisualiser.css";
import Legend from "./legend";

const x = 20;

const ROWS = 40 - x;
const COLS = 40 - x;

const START_NODE = 1;
const END_NODE = 2;
const WALL_NODE = 3;

export default class PathFinderVisualiser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
            modifyingNodeState: 0,
            START_NODE_ROW: 0,
            START_NODE_COL: 0,
            FINISH_NODE_ROW: ROWS - 1,
            FINISH_NODE_COL: COLS - 1,
            disableNodesButton: false,
        };
    }

    componentDidMount() {
        this.setUpGrid();
    }

    setUpGrid() {
        const grid = [];

        const gridBox = document.getElementById("grid");
        gridBox.style.setProperty("--p-grid-rows", ROWS);
        gridBox.style.setProperty("--p-grid-cols", COLS);

        for (let i = 0; i < ROWS; i++)
            for (let j = 0; j < COLS; j++) grid.push(this.createNode(i, j));

        this.setState({ grid });
    }

    toggleWall(grid, row, col) {
        const newGrid = grid.slice();
        const currentNode = newGrid[ROWS * row + col];
        if (!currentNode.isFinish && !currentNode.isStart) {
            currentNode.isWall = !currentNode.isWall;
            this.setState({ grid: newGrid });
        }
    }

    toggleStartOrFinish(grid = [], row, col, NODE_ROW, NODE_COL, nodeType) {
        const newGrid = grid.slice();

        const currentNode = newGrid[ROWS * NODE_ROW + NODE_COL];
        const newNode = newGrid[ROWS * row + col];

        if (nodeType === "START") {
            if (newNode.isWall || newNode.isFinish) {
                return false;
            } else {
                currentNode.isStart = false;
                newNode.isStart = true;
                this.setState({
                    grid: newGrid,
                });
                return true;
            }
        } else if (nodeType === "FINISH") {
            if (newNode.isWall || newNode.isStart) {
                return false;
            } else {
                currentNode.isFinish = false;
                newNode.isFinish = true;
                this.setState({
                    grid: newGrid,
                });
                return true;
            }
        } else {
            return false;
        }
    }

    handleNodeOperations(row, col, NODE_STATE) {
        const {
            START_NODE_ROW,
            START_NODE_COL,
            FINISH_NODE_ROW,
            FINISH_NODE_COL,
            grid,
        } = this.state;
        switch (NODE_STATE) {
            case 1:
                if (
                    this.toggleStartOrFinish(
                        grid,
                        row,
                        col,
                        START_NODE_ROW,
                        START_NODE_COL,
                        "START"
                    )
                ) {
                    this.setState({
                        START_NODE_ROW: row,
                        START_NODE_COL: col,
                    });
                }
                break;
            case 2:
                if (
                    this.toggleStartOrFinish(
                        grid,
                        row,
                        col,
                        FINISH_NODE_ROW,
                        FINISH_NODE_COL,
                        "FINISH"
                    )
                ) {
                    this.setState({
                        FINISH_NODE_ROW: row,
                        FINISH_NODE_COL: col,
                    });
                }
                break;
            case 3:
                this.toggleWall(grid, row, col);
                break;
            default:
                break;
        }
    }

    clearBoard() {
        this.setUpGrid();
        const grid = this.state.grid;
        for (let i = 0; i < grid.length; i++) {
            const node = grid[i];
            document
                .getElementById(`node-${node.row}-${node.col}`)
                .classList.remove("node-visited");

            document
                .getElementById(`node-${node.row}-${node.col}`)
                .classList.remove("node-shortest-path");
        }
        this.setState({ disableMazesButton: false, disableNodesButton: false });
    }

    createNode(row, col) {
        const {
            START_NODE_ROW,
            START_NODE_COL,
            FINISH_NODE_ROW,
            FINISH_NODE_COL,
        } = this.state;
        return {
            row,
            col,
            isStart: row === START_NODE_ROW && col === START_NODE_COL,
            isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
            distance: Infinity,
            isVisited: false,
            isWall: false,
            previousNode: null,
        };
    }

    modifyNodeState(STATE) {
        this.setState({ modifyingNodeState: STATE });
    }

    render() {
        const { grid, modifyingNodeState, disableNodesButton } = this.state;
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-7 mt-3">
                            <div id="grid" className="grid">
                                {grid.map((node, idx) => {
                                    const {
                                        row,
                                        col,
                                        isStart,
                                        isFinish,
                                        isWall,
                                    } = node;
                                    return (
                                        <Node
                                            key={idx}
                                            col={col}
                                            isFinish={isFinish}
                                            isStart={isStart}
                                            isWall={isWall}
                                            row={row}
                                            onNodeClick={(row, col) =>
                                                this.handleNodeOperations(
                                                    row,
                                                    col,
                                                    modifyingNodeState
                                                )
                                            }
                                        />
                                    );
                                })}
                            </div>
                        </div>
                        <div className="col-sm-5 mt-3">
                            <div className="btn-group btn-block">
                                <button
                                    type="button"
                                    disabled={disableNodesButton}
                                    className="btn bg-start"
                                    onClick={() =>
                                        this.modifyNodeState(START_NODE)
                                    }
                                >
                                    Place Start
                                </button>
                                <button
                                    type="button"
                                    disabled={disableNodesButton}
                                    className="btn bg-end"
                                    onClick={() =>
                                        this.modifyNodeState(END_NODE)
                                    }
                                >
                                    Place End
                                </button>
                                <button
                                    type="button"
                                    disabled={disableNodesButton}
                                    className="btn btn-secondary"
                                    onClick={() =>
                                        this.modifyNodeState(WALL_NODE)
                                    }
                                >
                                    Place Wall
                                </button>
                            </div>
                            <Legend />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
