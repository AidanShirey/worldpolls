import { useState } from "react";

export default function MainVote() {
 const [isChosen, setChosen] = useState('0');

 const toggleChosen = (chosen) => {
    setChosen(chosen);
 };
    
 if (isChosen === '1') {
    return (
    <main>
        <div className='VotePanel'><div className='VoteChoice PrimaryYellowBackground Voted' onClick={() => toggleChosen('1')}>Choice #1</div><div className='VoteOr PrimaryBlueBackground orFade'>or</div><div className='VoteChoice PrimaryRedBackground NotVoted' onClick={() => toggleChosen('2')}>Choice #2</div></div>
    </main>
  )
}
 else if (isChosen === '2') {
    return (
    <main>
        <div className='VotePanel'><div className='VoteChoice PrimaryYellowBackground NotVoted' onClick={() => toggleChosen('1')}>Choice #1</div><div className='VoteOr PrimaryBlueBackground orFade'>or</div><div className='VoteChoice PrimaryRedBackground Voted' onClick={() => toggleChosen('2')}>Choice #2</div></div>
    </main>
  )
}
  else {
    return (
        <main>
            <div className='VotePanel'><div className='VoteChoice PrimaryYellowBackground' onClick={() => toggleChosen('1')}>Choice #1</div><div className='VoteOr PrimaryBlueBackground'>or</div><div className='VoteChoice PrimaryRedBackground' onClick={() => toggleChosen('2')}>Choice #2</div></div>
        </main>
      )
  }
  
}
