import { useState } from "react";

function Square({ value, onSquareClick, tIdx }) {
  // const [value, setValue] = useState(null);
  // function handleClick(i) {
  //   setValue("X");
  // }
  return (
    <button
      className="w-8 h-8 border p-8 text-xl  
      text-justify"
      onClick={onSquareClick}
    >
      {value}
      <sub>{tIdx}</sub>
    </button>
  );
}

function Board({ xIsNext, squares, onPlay, xQ, oQ, tIdx }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    console.log("squares:", squares);

    const nonNullLength = squares.filter((num) => num !== null).length;
    console.log(nonNullLength);
    // if (nonNullLength === 6) {
    //   // if (xQ.size() === 3) {
    //   //   xQ.dequeue();
    //   // } else if (oQ.size() === 3) {
    //   //   oQ.dequeue();
    //   // }
    //   // console.log(squares);
    //   const counts = squares.reduce(
    //     (acc, currVal) => {
    //       if (currVal === "X") {
    //         acc.X++;
    //       } else if (currVal === "O") {
    //         acc.O++;
    //       }
    //       return acc;
    //     },
    //     { X: 0, O: 0 }
    //   );

    //   console.log(`counts:${counts}`);
    // }

    const nextSquares = squares.slice();

    if (xIsNext) {
      if (xQ.size() === 3) {
        // console.log("xQ-IDX:", xQ.items[0]);

        nextSquares[xQ.items[0]] = null;
        xQ.dequeue();
      }
      xQ.enqueue(i);
      // nextSquares[i] = `X ${xQ.indexOf(i)}`;
      nextSquares[i] = `X`;
      // setTIdx(xQ.indexOf(i));
      // onPlay(nextSquares, xQ.indexOf(i));
    } else {
      if (oQ.size() === 3) {
        nextSquares[oQ.items[0]] = null;
        oQ.dequeue();
      }
      oQ.enqueue(i);
      nextSquares[i] = `O`;
      // setTIdx(oQ.indexOf(i));
      // onPlay(nextSquares, oQ.indexOf(i));
    }
    // console.log(`tIdx: ${tIdx}`);

    console.log("x len: ", xQ);
    console.log("yQ: ", oQ);

    // console.log(`nextSquares: ${nextSquares}, ${typeof nextSquares}`);
    // console.log(`squares: ${squares} ${typeof squares}`);
    // setSquares(nextSquares);
    // setXIsNext(!xIsNext);
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  }

  // modify later. TODO
  else if (
    squares.length === 6 &&
    squares.filter((num) => num !== null).length == 6
  ) {
    status = "Match Drawn";
  } else {
    status = `Next Player:` + (xIsNext ? "X" : "O");
  }

  function resetBoard() {
    // xIsNext =
    onPlay(Array(9).fill(null), true);
  }
  return (
    <div
      id="card"
      className="p-10 px-20 bg-blue-100 rounded-xl flex flex-col items-center justify-center"
    >
      <h1 className=" text-4xl font-bold">Tic-Tac-Toe</h1>
      <div>
        <h2 className="text-3xl font-mono">Rules</h2>
        <ol className="text-lg">
          <li>1. Only three X's or O's are allowed at a time on the board. </li>
          <li>2. The oldest X or O will be removed after 3 chances.</li>
          <li>3. This game will not be a draw.</li>
        </ol>
      </div>
      {/* <div className="border-t-2 border-black my-2 "></div> */}
      <div
        id="status-message"
        className="mt-2 font-mono text-xl  text-bold underline underline-offset-2 pb-1"
      >
        {status}
      </div>
      <div
        id="board"
        className=" 
      "
      >
        <div className="flex">
          <Square
            value={squares[0]}
            onSquareClick={() => handleClick(0)}
            tIdx={tIdx}
          />
          <Square
            value={squares[1]}
            onSquareClick={() => handleClick(1)}
            tIdx={tIdx}
          />
          <Square
            value={squares[2]}
            onSquareClick={() => handleClick(2)}
            tIdx={tIdx}
          />
        </div>
        <div className="flex  ">
          <Square
            value={squares[3]}
            onSquareClick={() => handleClick(3)}
            tIdx={tIdx}
          />
          <Square
            value={squares[4]}
            onSquareClick={() => handleClick(4)}
            tIdx={tIdx}
          />
          <Square
            value={squares[5]}
            onSquareClick={() => handleClick(5)}
            tIdx={tIdx}
          />
        </div>
        <div className="flex ">
          <Square
            value={squares[6]}
            onSquareClick={() => handleClick(6)}
            tIdx={tIdx}
          />
          <Square
            value={squares[7]}
            onSquareClick={() => handleClick(7)}
            tIdx={tIdx}
          />
          <Square
            value={squares[8]}
            onSquareClick={() => handleClick(8)}
            tIdx={tIdx}
          />
        </div>
      </div>
      <button
        className="mt-2 rounded-xl bg-blue-400 px-3 py-1 hover:bg-blue-600"
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
  const [tIdx, setTIdx] = useState(0);
  const [xQ, setxQ] = useState(new Queue());
  const [oQ, setoQ] = useState(new Queue());
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const currentSquares = history[history.length - 1];

  // const xQ = new Queue();
  // const oQ = new Queue();

  function handlePlay(nextSquares, isReset = false, tIdx) {
    setHistory([...history, nextSquares]);
    console.log(...history, nextSquares);
    isReset ? setXIsNext("X") : setXIsNext(!xIsNext);
    setTIdx(tIdx);
  }
  return (
    <>
      <div
        className=" min-h-screen bg-black \
      flex items-center justify-center
    
    
      
      "
      >
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
          xQ={xQ}
          oQ={oQ}
          tIdx={tIdx}
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
