import { useState } from "react";
import { useEffect } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button
      className="w-8 h-8  flex items-center justify-center border p-8 text-xl  
      "
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay, xQ, oQ, resetBoard }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    // console.log("squares:", squares);

    const nonNullLength = squares.filter((num) => num !== null).length;
    console.log("nonNullLength", nonNullLength);

    const nextSquares = squares.slice();

    if (xIsNext) {
      if (xQ.size() === 3) {
        nextSquares[xQ.items[0]] = null;
        xQ.dequeue();
      }
      xQ.enqueue(i);
      nextSquares[i] = `X`;
      console.log("xQ: ", xQ);
    } else if (xIsNext != true) {
      if (oQ.size() === 3) {
        nextSquares[oQ.items[0]] = null;
        oQ.dequeue();
      }
      oQ.enqueue(i);
      nextSquares[i] = `O`;
    }

    console.log("xQ: ", xQ);
    console.log("oQ: ", oQ);

    onPlay(nextSquares, !xIsNext);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `${winner} Wins! 🎉`;
  } else {
    status = `Next Player:` + (xIsNext ? "X" : "O");
  }
  return (
    // <div
    //   id="card"
    //   className="p-10 px-20 bg-black/30
    //    text-white rounded-xl shadow-lg  shadow-black
    //     flex flex-col items-center justify-center z-10"
    // >
    <div
      id="card"
      className="p-8 px-5 bg-black/30
       text-white rounded-xl shadow-lg  shadow-black
        flex flex-col items-center justify-center"
    >
      <h1 className=" animate-bounce text-cyan-600 text-4xl font-bold">
        Tic-Tac-Toe-2
      </h1>
      <div>
        <h2 className="text-3xl underline font-mono text-slate-500">Rules</h2>
        <ol className="text-lg text-slate-400">
          <li>1. Only three X's or O's are allowed at a time on the board. </li>
          <li>2. The oldest X or O will be removed after 3 chances.</li>
          <li>3. This game will not be a draw.</li>
        </ol>
      </div>
      <div
        id="status-message"
        className="mt-2 font-mono text-xl  text-bold underline underline-offset-2 pb-1"
      >
        {status}
      </div>
      <div
        id="board"
        className=" mt-4
      "
      >
        <div className="flex">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="flex  ">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="flex ">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>
      <button
        className="rounded-lg  mt-3 text-slate-200 font-semibold bg-blue-700 px-3 py-1 hover:bg-blue-800"
        onClick={() => {
          resetBoard();
        }}
      >
        Reset
      </button>
    </div>
  );
}

export default function Game() {
  class Queue {
    constructor() {
      this.items = [];
    }
    enqueue(element) {
      this.items.push(element);
    }
    dequeue() {
      // if (this.this.item.length() === 0) {
      //   return "Queue empty";
      // }
      return this.items.shift();
    }
    size() {
      return this.items.length;
    }
    indexOf(element) {
      return this.items.indexOf(element);
    }
  }
  const [xIsNext, setXIsNext] = useState(true);
  const [xQ, setxQ] = useState(new Queue());
  const [oQ, setoQ] = useState(new Queue());
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const currentSquares = history[history.length - 1];

  function handlePlay(nextSquares, nextPlayer) {
    console.log("nextSqaures\n", nextSquares);
    setHistory((prevHistory) => {
      const updatedHistory = [...prevHistory, nextSquares];
      // console.log("upHistory", updatedHistory);
      return updatedHistory;
    });
    console.log("history\n", history);
    nextPlayer ? setXIsNext(true) : setXIsNext(false);
  }

  function resetBoard() {
    setHistory([Array(9).fill(null)]);
    handlePlay(Array(9).fill(null), true);
    setxQ(new Queue());
    setoQ(new Queue());
  }

  return (
    <>
      <div
        className=" min-h-screen bg-black/90 bg-gradient-to-br
          to-blue-950 flex items-center justify-center"
      >
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
          resetBoard={resetBoard}
          xQ={xQ}
          oQ={oQ}
        />
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
