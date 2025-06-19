The game is live at https://tic-tac-toe-2-0ftu.onrender.com/

Tasks for future:

### 1. Make the game multiplayer

#### 1.1 Game Flow:

There is a home page with options of online or offline.

- If offline is selected, serve them offline version
- If Online, Pop a menu with two buttons: 1. Join Room 2. Create Room
- To create a room: Player-1 will request for room creation, and will be served a roomID.
- Player2 will should use this roomID to join.
- After successful auth, Serve them the game

#### Plan to execute:

- Use WebSockets to establish a full-duplex connection.
- React-router-dom for multipage navigation.
- Add more animations using https://animate.style 