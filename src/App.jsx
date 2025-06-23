import { useState } from "react";
// import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router";
import { Home } from "lucide-react";

const AppLayout = ({ children }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="min-h-screen bg-black/90 
        bg-gradient-to-b to-blue-950
        flex-col items-center justify-center
        
          "
      >
        <div className="flex items-center justify-center py-5">
          <div className="">
            <button
              onClick={() => {
                navigate("/");
              }}
              className="px-3 cursor-pointer"
            >
              <Home color="cyan" size={18} className="" />
            </button>
          </div>
          <h1
            className=" animate-bounce text-cyan-600
           text-4xl text-center font-bold"
          >
            Tic-Tac-Toe-2
          </h1>
        </div>
        <div className="">{children}</div>
      </div>
    </>
  );
};
function HomePage() {
  return (
    <div className="flex-col items-center justify-center text-center">
      <h1 className="text-white mb-2 text-xl">
        A new Version of the game that never draws.
      </h1>
      {/* <Game /> */}
      {/* <hr className="text-sl" /> */}
      {/* <h2 className="text-white font-semibold text-2xl">Select mode</h2> */}
      {/* <div className="flex items-center justify-evenly">
        <Link
          to="/offline"
          className="bg-blue-400 hover:bg-blue-500 cursor-pointer   px-4 py-2 rounded-md "
          // onClick={() => console.log("Offline Clicked")}
        >
          Offline
        </Link>
        <Link
          to="/online"
          className="bg-blue-400 hover:bg-blue-500 cursor-pointer   px-4 py-2 rounded-md "
          // onClick={() => console.log("Online Clicked")}
        >
          Online
        </Link>
      </div> */}
      <Game />
    </div>
  );
}

function Result() {
  return (
    <div>
      <div></div>
    </div>
  );
}
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

function Board({
  xIsNext,
  squares,
  onPlay,
  xQ,
  oQ,
  resetBoard,
  isOnline,
  isHome = true,
}) {
  console.log(`isOnline: ${isOnline}`);
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
  {
    isHome ? (status = "Start Game") : (status = status);
  }

  return (
    <div
      id="card"
      className="p-4 px-5 bg-black/30
       text-white rounded-xl shadow-lg  shadow-black
        flex flex-col items-center justify-center"
    >
      {/* <h1 className=" animate-bounce text-cyan-600 text-4xl font-bold">
        Tic-Tac-Toe-2
      </h1> */}
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
        className="mt-2 font-mono animate-pulse text-xl text-bold underline underline-offset-2 pb-1"
      >
        {status}
      </div>
      {isHome ? (
        <div className="flex w-full items-center justify-evenly">
          <div>
            <Link
              to="/offline"
              className="bg-blue-400 hover:bg-blue-500
             cursor-pointer   px-4 py-2 rounded-md "
              // onClick={() => (isHome = false)}
            >
              Offline
            </Link>
          </div>
          <div>
            <Link
              to="/online"
              className="bg-blue-400 hover:bg-blue-500 cursor-pointer   px-4 py-2 rounded-md "
              // onClick={() => console.log("Online Clicked")}
            >
              Online
            </Link>
          </div>
        </div>
      ) : (
        <div></div>
      )}

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
      {isHome ? (
        <div></div>
      ) : (
        <button
          className="rounded-lg  mt-3 text-slate-200
          font-semibold bg-blue-700 px-3 py-1
        hover:bg-blue-800
          transition duration-300 ease-in-out
          transform hover:scale-105
          "
          onClick={() => {
            resetBoard();
          }}
        >
          Reset
        </button>
      )}
    </div>
  );
}

function Game({ isOnline, isHome }) {
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
      {/* <div
        className=" min-h-screen bg-black/90 bg-gradient-to-br
          to-blue-950 flex items-center justify-center"
      > */}
      <Board
        xIsNext={xIsNext}
        squares={currentSquares}
        onPlay={handlePlay}
        resetBoard={resetBoard}
        xQ={xQ}
        oQ={oQ}
        isOnline={isOnline}
        isHome={isHome}
      />
      {/* </div> */}
    </>
  );
}
function Offline() {
  return (
    <>
      <Game isOnline={false} isHome={false} />;
    </>
  );
}
function ShowOnlineMenu() {
  const [room, setRoom] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-evenly">
        <button className="bg-blue-300 hover:bg-blue-500 rounded-md px-4 py-2">
          Create Room
        </button>
        <button
          className="bg-blue-300 hover:bg-blue-500 rounded-md px-4 py-2"
          onClick={() => {
            setRoom(true);
          }}
        >
          Join room
        </button>
      </div>
      {!room ? (
        <div></div>
      ) : (
        <div>
          <div
            className="flex w-full items-center justify-center
           mt-5"
          >
            <div>
              <input
                type="text"
                className="border rounded-md
                 border-white text-white font-semibold
                 p-2 mr-4
                 "
                placeholder="Enter Room code"
              />
            </div>
            <button
              // type="button"
              className="text-white rounded-md
               bg-green-500 hover:bg-green-600
                px-4 py-2"
            >
              Enter
            </button>
          </div>
          {/* Include the status message of the join room or create room request. */}
          <div></div>
        </div>
      )}
    </div>
  );
}
function Online() {
  return (
    <>
      {/* <ShowOnlineMenu /> */}
      {/* <Game isOnline={true} />; */}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route
            path="/"
            element={
              <AppLayout>
                <HomePage />
              </AppLayout>
            }
          />
          <Route
            path="/offline"
            element={
              <AppLayout>
                <Offline />
              </AppLayout>
            }
          />
          <Route
            path="/online"
            element={
              <AppLayout>
                <ShowOnlineMenu />
              </AppLayout>
            }
          />
          {/* <Route path = "/Result" element = {<AppLayout><Online/></AppLayout>} /> */}
        </Routes>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </BrowserRouter>
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
