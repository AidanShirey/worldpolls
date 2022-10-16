import './App.css';
import MainVote from './Components/MainVote';

function App() {
  return (
    <div className='App'>
      <header>
        <div className='PrimaryYellowText'>World</div><div className='PrimaryBlueText'>•</div><div className='PrimaryRedText'>Polls</div>
      </header>
      <MainVote></MainVote>
    </div>
  );
}

export default App;
