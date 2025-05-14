import { useState ,useEffect } from 'react'

import axios from 'axios';

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [gameId,setGameId]=useState(null);
  const [board,setBoard]=useState(Array(9).fill(" "));
  const [turn,setTurn] =useState("X");
  const [winner,setWinner]=useState(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/new/`).then(res=>{
      setGameId(res.data.game_id);
      setBoard(res.data.board.split(""));
      setTurn(res.data.current_turn);
    });
  }, [] );

  const handleClick=(index)=>{
    if (board[index]!==" "||winner) return;

    axios.post(`http://127.0.0.1:8000/move/`,{
      game_id:gameId,
      position:index
    })  .then (res=> {
      setBoard(res.data.board.split(""));
      setTurn(res.data.current_turn);
      setWinner(res.data.winner);
    });
  };
  return (
    <>
      <div style={{textAlign:'center',marginTop:30}}>
        <h1>React + Django XO Game</h1>
        <h2>Turn: {turn}</h2>

        {winner && <h2>🎉 Winner: {winner}</h2>}

        <div style={{
          display:'grid',
          // backgroundColor:'pink',
          gridTemplateColumns:'repeat(3,100px)',
          justifyContent:'center',
          gap:'10px'
        }}>
          {board.map((val,i)=> (
            <div key={i}
            onClick={() => handleClick(i)}
            style={{
              width:100,height:100,
              backgroundColor:'grey',
              display:'flex',
              justifyContent:'center',
          
              justifyItems:'center',
              fontSize:'2rem',

              cursor:'pointer'
              
            }}>

          {val === "X" ? "X" : val === "O" ? "O" : ""}

            </div>
          ))}

        </div>
      </div>
    </>
  );
}

export default App;
