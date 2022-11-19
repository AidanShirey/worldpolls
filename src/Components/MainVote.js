import { useState } from "react";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, child, get } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBDNBD-xLXAxIRveLgOB68A_B4dMIeqHA",
  authDomain: "worldpolls-746d3.firebaseapp.com",
  databaseURL: "https://worldpolls-746d3-default-rtdb.firebaseio.com",
  projectId: "worldpolls-746d3",
  storageBucket: "worldpolls-746d3.appspot.com",
  messagingSenderId: "151683934911",
  appId: "1:151683934911:web:1624bbc3b09d2926f9740a",
  measurementId: "G-6FZ9D9Q0X9"
};

// Initialize Firebase
// eslint-disable-next-line
const app = initializeApp(firebaseConfig);
const dbRef = ref(getDatabase());
// const analytics = getAnalytics(app);

export default function MainVote() {
 const [pollnumber, setPollnumber] = useState('0');
 const [isChosen, setChosen] = useState('0');
 const [nextPollIsChosen, setNext] = useState('unset');
 const [total, setTotal] = useState('0');
 const [choice1pstring, setChoice1pstring] = useState('0');
 const [choice2pstring, setChoice2pstring] = useState('0');
 const [choice1, setChoice1] = useState('Choice #1');
 const [choice2, setChoice2] = useState('Choice #2');
 const [nextchoice1, setNextChoice1] = useState('Next Choice #1');
 const [nextchoice2, setNextChoice2] = useState('Next Choice #2');
 const [choice1count, setChoice1count] = useState('0');
 const [choice2count, setChoice2count] = useState('0');
 const [nextchoice1count, setNextChoice1Count] = useState('0');
 const [nextchoice2count, setNextChoice2Count] = useState('0');

 // Get most recent pollnumber
 get(child(dbRef, 'wp/')).then((snapshot) => {
  if (snapshot.exists()) {
    setPollnumber(snapshot.size);
  } else {
    console.log("Cannot get number of polls");
  }
}).catch((error) => {
  console.error(error);
});

// Get most recent pollnumber first choice
 get(child(dbRef, `wp/wp_${pollnumber}/c_1`)).then((snapshot) => {
  if (snapshot.exists()) {
    setChoice1(snapshot.val());
  } else {
    console.log("Choice #1: No data available");
  }
}).catch((error) => {
  console.error(error);
});

// Get most recent pollnumber second choice
get(child(dbRef, `wp/wp_${pollnumber}/c_2`)).then((snapshot) => {
  if (snapshot.exists()) {
    setChoice2(snapshot.val());
  } else {
    console.log("Choice #2: No data available");
  }
}).catch((error) => {
  console.error(error);
});

// Get most recent poll's first choice vote count
get(child(dbRef, `wp/wp_${pollnumber}/vc_1`)).then((snapshot) => {
  if (snapshot.exists()) {
    setChoice1count(snapshot.val());
  } else {
    console.log("Choice #1: No count data available");
  }
}).catch((error) => {
  console.error(error);
});

// Get most recent poll's second choice vote count
get(child(dbRef, `wp/wp_${pollnumber}/vc_2`)).then((snapshot) => {
  if (snapshot.exists()) {
    setChoice2count(snapshot.val());
  } else {
    console.log("Choice #2: No count data available");
  }
}).catch((error) => {
  console.error(error);
});

// Get next days' poll first choice
get(child(dbRef, `np/wp_${pollnumber}/c_1`)).then((snapshot) => {
  if (snapshot.exists()) {
    setNextChoice1(snapshot.val());
  } else {
    console.log("Choice #1: No data available");
  }
}).catch((error) => {
  console.error(error);
});

// Get next days' poll second choice
get(child(dbRef, `np/wp_${pollnumber}/c_2`)).then((snapshot) => {
  if (snapshot.exists()) {
    setNextChoice2(snapshot.val());
  } else {
    console.log("Choice #2: No data available");
  }
}).catch((error) => {
  console.error(error);
});

// Get next days' poll's first choice vote count
get(child(dbRef, `np/wp_${pollnumber}/vc_1`)).then((snapshot) => {
  if (snapshot.exists()) {
    setNextChoice1Count(snapshot.val());
  } else {
    console.log("Choice #1: No count data available");
  }
}).catch((error) => {
  console.error(error);
});

// Get next days' poll's second choice vote count
get(child(dbRef, `np/wp_${pollnumber}/vc_2`)).then((snapshot) => {
  if (snapshot.exists()) {
    setNextChoice2Count(snapshot.val());
  } else {
    console.log("Choice #2: No count data available");
  }
}).catch((error) => {
  console.error(error);
});

 const toggleChosen = (chosen) => {
  setChosen(chosen);  
  if (chosen !== '0')
      updateFirst();
 };

 const updateFirst = () => {
  let total = choice1count + choice2count;
  setTotal(choice1count + choice2count);
  let choice1p = choice1count / total;
  choice1p = choice1p.toFixed(2);
  setChoice1pstring(choice1p.toString().split('.')[1]);
  let choice2p = choice2count / total;
  choice2p = choice2p.toFixed(2);
  setChoice2pstring(choice2p.toString().split('.')[1]);
 };

 const toggleNextChosen = (chosen) => {
  setNext(chosen);  
  if (chosen !== '0')
      updateChosen();
 }

 const updateChosen = () => {
  let total = nextchoice1count + nextchoice2count;
    setTotal(nextchoice1count + nextchoice2count);
    let choice1p = nextchoice1count / total;
    choice1p = choice1p.toFixed(2);
    setChoice1pstring(choice1p.toString().split('.')[1]);
    let choice2p = nextchoice2count / total;
    choice2p = choice2p.toFixed(2);
    setChoice2pstring(choice2p.toString().split('.')[1]);
 }
    
 if (isChosen === '1' && nextPollIsChosen ==='unset') {
    return (
    <main>
        <div className='VotePanel resultsShow'>
          <div className='VoteChoice PrimaryYellowBackground Voted' onClick={() => toggleChosen('1')}>{choice1}</div>
          <div className='VoteOr PrimaryBlueBackground orFade'>or</div>
          <div className='VoteChoice PrimaryRedBackground NotVoted' onClick={() => toggleChosen('2')}>{choice2}</div>
        </div>
        <div className='ResultPanel resultsShow'>
          <div className='PollResults'>
            <div className='PollResultsHeader'>
              <div className='PrimaryYellowText'>Poll</div>•<div className='PrimaryRedText'>Results</div>
            </div>
            <div className='PollResultsCount'>
              {total} total votes
            </div>
          </div>
          <div className='ResultBar barFadeIn'>
          <div className='PrimaryYellowBackground' style={{display: 'flex', width: `${choice1pstring}%`, height: "3rem", justifyContent: 'center', alignItems: 'center'}}></div>
                <div style={{display: 'flex', fontWeight: '700'}}>{choice1pstring}% chose&nbsp;<div className='PrimaryYellowText'>{choice1}</div></div>
                <div className='PrimaryRedBackground' style={{display: 'flex', width: `${choice2pstring}%`, height: "3rem", justifyContent: 'center', alignItems: 'center', marginTop: '2rem'}}></div>
                <div style={{display: 'flex', fontWeight: '700'}}>{choice2pstring}% chose&nbsp;<div className='PrimaryRedText'>{choice2}</div></div>
          </div>
          <div className="PrimaryBlueBackground nextPollButton" onClick={() => toggleNextChosen('0')}>
            Vote on tomorrow's poll!
          </div>
        </div>
    </main>
  )
}
else if (isChosen === '1' && nextPollIsChosen ==='0') {
  return (
    <main>
        <div className='VotePanel'>
          <div className='VoteChoice PrimaryYellowBackground' onClick={() => toggleNextChosen('1')}>{nextchoice1}</div>
          <div className='VoteOr PrimaryBlueBackground'>or</div>
          <div className='VoteChoice PrimaryRedBackground' onClick={() => toggleNextChosen('2')}>{nextchoice2}</div>
        </div>
        <div className='ResultPanel'>
          <div className='PollResults'>
            <div className='PollResultsHeader'>
              <div className='PrimaryYellowText'>Poll</div>•<div className='PrimaryRedText'>Results</div>
            </div>
            <div className='PollResultsCount'>
              {total} total votes
            </div>
          </div>
          <div className='ResultBar'>
            <div className='PrimaryYellowBackground' style={{display: 'flex', width: `${choice1pstring}%`, height: "3rem", justifyContent: 'center', alignItems: 'center'}}></div>
            <div style={{display: 'flex', fontWeight: '700'}}>{choice1pstring}% chose&nbsp;<div className='PrimaryYellowText'>{choice1}</div></div>
            <div className='PrimaryRedBackground' style={{display: 'flex', width: `${choice2pstring}%`, height: "3rem", justifyContent: 'center', alignItems: 'center', marginTop: '2rem'}}></div>
            <div style={{display: 'flex', fontWeight: '700'}}>{choice2pstring}% chose&nbsp;<div className='PrimaryRedText'>{choice2}</div></div>
          </div>
        </div>
    </main>
  )
}
else if (isChosen === '1' && nextPollIsChosen ==='1') {
  return (
    <main>
        <div className='VotePanel resultsShow'>
          <div className='VoteChoice PrimaryYellowBackground Voted'>{nextchoice1}</div>
          <div className='VoteOr PrimaryBlueBackground orFade'>or</div>
          <div className='VoteChoice PrimaryRedBackground NotVoted'>{nextchoice2}</div>
        </div>
        <div className='ResultPanel resultsShow'>
          <div className='PollResults'>
            <div className='PollResultsHeader'>
              <div className='PrimaryYellowText'>Poll</div>•<div className='PrimaryRedText'>Results</div>
            </div>
            <div className='PollResultsCount'>
              {total} total votes
            </div>
          </div>
          <div className='ResultBar barFadeIn'>
          <div className='PrimaryYellowBackground' style={{display: 'flex', width: `${choice1pstring}%`, height: "3rem", justifyContent: 'center', alignItems: 'center'}}></div>
                <div style={{display: 'flex', fontWeight: '700'}}>{choice1pstring}% chose&nbsp;<div className='PrimaryYellowText'>{nextchoice1}</div></div>
                <div className='PrimaryRedBackground' style={{display: 'flex', width: `${choice2pstring}%`, height: "3rem", justifyContent: 'center', alignItems: 'center', marginTop: '2rem'}}></div>
                <div style={{display: 'flex', fontWeight: '700'}}>{choice2pstring}% chose&nbsp;<div className='PrimaryRedText'>{nextchoice2}</div></div>
          </div>
        </div>
    </main>
  )
}
else if (isChosen === '1' && nextPollIsChosen ==='2') {
  return (
    <main>
        <div className='VotePanel resultsShow'>
          <div className='VoteChoice PrimaryYellowBackground NotVoted'>{nextchoice1}</div>
          <div className='VoteOr PrimaryBlueBackground orFade'>or</div>
          <div className='VoteChoice PrimaryRedBackground Voted'>{nextchoice2}</div>
        </div>
        <div className='ResultPanel resultsShow'>
          <div className='PollResults'>
            <div className='PollResultsHeader'>
              <div className='PrimaryYellowText'>Poll</div>•<div className='PrimaryRedText'>Results</div>
            </div>
            <div className='PollResultsCount'>
              {total} total votes
            </div>
          </div>
          <div className='ResultBar barFadeIn'>
          <div className='PrimaryYellowBackground' style={{display: 'flex', width: `${choice1pstring}%`, height: "3rem", justifyContent: 'center', alignItems: 'center'}}></div>
                <div style={{display: 'flex', fontWeight: '700'}}>{choice1pstring}% chose&nbsp;<div className='PrimaryYellowText'>{nextchoice1}</div></div>
                <div className='PrimaryRedBackground' style={{display: 'flex', width: `${choice2pstring}%`, height: "3rem", justifyContent: 'center', alignItems: 'center', marginTop: '2rem'}}></div>
                <div style={{display: 'flex', fontWeight: '700'}}>{choice2pstring}% chose&nbsp;<div className='PrimaryRedText'>{nextchoice2}</div></div>
          </div>
        </div>
    </main>
  )
}
else if (isChosen === '2' && nextPollIsChosen ==='unset') {
  return (
  <main>
      <div className='VotePanel resultsShow'>
        <div className='VoteChoice PrimaryYellowBackground NotVoted' onClick={() => toggleChosen('1')}>{choice1}</div>
        <div className='VoteOr PrimaryBlueBackground orFade'>or</div>
        <div className='VoteChoice PrimaryRedBackground Voted' onClick={() => toggleChosen('2')}>{choice2}</div>
      </div>
      <div className='ResultPanel resultsShow'>
        <div className='PollResults'>
          <div className='PollResultsHeader'>
            <div className='PrimaryYellowText'>Poll</div>•<div className='PrimaryRedText'>Results</div>
          </div>
          <div className='PollResultsCount'>
            {total} total votes
          </div>
        </div>
        <div className='ResultBar barFadeIn'>
        <div className='PrimaryYellowBackground' style={{display: 'flex', width: `${choice1pstring}%`, height: "3rem", justifyContent: 'center', alignItems: 'center'}}></div>
              <div style={{display: 'flex', fontWeight: '700'}}>{choice1pstring}% chose&nbsp;<div className='PrimaryYellowText'>{choice1}</div></div>
              <div className='PrimaryRedBackground' style={{display: 'flex', width: `${choice2pstring}%`, height: "3rem", justifyContent: 'center', alignItems: 'center', marginTop: '2rem'}}></div>
              <div style={{display: 'flex', fontWeight: '700'}}>{choice2pstring}% chose&nbsp;<div className='PrimaryRedText'>{choice2}</div></div>
        </div>
        <div className="PrimaryBlueBackground nextPollButton" onClick={() => toggleNextChosen('0')}>
          Vote on tomorrow's poll!
        </div>
      </div>
  </main>
)
}
else if (isChosen === '2' && nextPollIsChosen ==='0') {
  return (
    <main>
        <div className='VotePanel'>
          <div className='VoteChoice PrimaryYellowBackground' onClick={() => toggleNextChosen('1')}>{nextchoice1}</div>
          <div className='VoteOr PrimaryBlueBackground'>or</div>
          <div className='VoteChoice PrimaryRedBackground' onClick={() => toggleNextChosen('2')}>{nextchoice2}</div>
        </div>
        <div className='ResultPanel'>
          <div className='PollResults'>
            <div className='PollResultsHeader'>
              <div className='PrimaryYellowText'>Poll</div>•<div className='PrimaryRedText'>Results</div>
            </div>
            <div className='PollResultsCount'>
              {total} total votes
            </div>
          </div>
          <div className='ResultBar'>
            <div className='PrimaryYellowBackground' style={{display: 'flex', width: `${choice1pstring}%`, height: "3rem", justifyContent: 'center', alignItems: 'center'}}></div>
            <div style={{display: 'flex', fontWeight: '700'}}>{choice1pstring}% chose&nbsp;<div className='PrimaryYellowText'>{choice1}</div></div>
            <div className='PrimaryRedBackground' style={{display: 'flex', width: `${choice2pstring}%`, height: "3rem", justifyContent: 'center', alignItems: 'center', marginTop: '2rem'}}></div>
            <div style={{display: 'flex', fontWeight: '700'}}>{choice2pstring}% chose&nbsp;<div className='PrimaryRedText'>{choice2}</div></div>
          </div>
        </div>
    </main>
  )
}
else if (isChosen === '2' && nextPollIsChosen ==='1') {
  return (
    <main>
        <div className='VotePanel resultsShow'>
          <div className='VoteChoice PrimaryYellowBackground Voted'>{nextchoice1}</div>
          <div className='VoteOr PrimaryBlueBackground orFade'>or</div>
          <div className='VoteChoice PrimaryRedBackground NotVoted'>{nextchoice2}</div>
        </div>
        <div className='ResultPanel resultsShow'>
          <div className='PollResults'>
            <div className='PollResultsHeader'>
              <div className='PrimaryYellowText'>Poll</div>•<div className='PrimaryRedText'>Results</div>
            </div>
            <div className='PollResultsCount'>
              {total} total votes
            </div>
          </div>
          <div className='ResultBar barFadeIn'>
          <div className='PrimaryYellowBackground' style={{display: 'flex', width: `${choice1pstring}%`, height: "3rem", justifyContent: 'center', alignItems: 'center'}}></div>
                <div style={{display: 'flex', fontWeight: '700'}}>{choice1pstring}% chose&nbsp;<div className='PrimaryYellowText'>{nextchoice1}</div></div>
                <div className='PrimaryRedBackground' style={{display: 'flex', width: `${choice2pstring}%`, height: "3rem", justifyContent: 'center', alignItems: 'center', marginTop: '2rem'}}></div>
                <div style={{display: 'flex', fontWeight: '700'}}>{choice2pstring}% chose&nbsp;<div className='PrimaryRedText'>{nextchoice2}</div></div>
          </div>
        </div>
    </main>
  )
}
else if (isChosen === '2' && nextPollIsChosen ==='2') {
  return (
    <main>
        <div className='VotePanel resultsShow'>
          <div className='VoteChoice PrimaryYellowBackground NotVoted'>{nextchoice1}</div>
          <div className='VoteOr PrimaryBlueBackground orFade'>or</div>
          <div className='VoteChoice PrimaryRedBackground Voted'>{nextchoice2}</div>
        </div>
        <div className='ResultPanel resultsShow'>
          <div className='PollResults'>
            <div className='PollResultsHeader'>
              <div className='PrimaryYellowText'>Poll</div>•<div className='PrimaryRedText'>Results</div>
            </div>
            <div className='PollResultsCount'>
              {total} total votes
            </div>
          </div>
          <div className='ResultBar barFadeIn'>
          <div className='PrimaryYellowBackground' style={{display: 'flex', width: `${choice1pstring}%`, height: "3rem", justifyContent: 'center', alignItems: 'center'}}></div>
                <div style={{display: 'flex', fontWeight: '700'}}>{choice1pstring}% chose&nbsp;<div className='PrimaryYellowText'>{nextchoice1}</div></div>
                <div className='PrimaryRedBackground' style={{display: 'flex', width: `${choice2pstring}%`, height: "3rem", justifyContent: 'center', alignItems: 'center', marginTop: '2rem'}}></div>
                <div style={{display: 'flex', fontWeight: '700'}}>{choice2pstring}% chose&nbsp;<div className='PrimaryRedText'>{nextchoice2}</div></div>
          </div>
        </div>
    </main>
  )
}
  else {
    return (
        <main>
            <div className='VotePanel'>
              <div className='VoteChoice PrimaryYellowBackground' onClick={() => toggleChosen('1')}>{choice1}</div>
              <div className='VoteOr PrimaryBlueBackground'>or</div>
              <div className='VoteChoice PrimaryRedBackground' onClick={() => toggleChosen('2')}>{choice2}</div>
            </div>
            <div className='ResultPanel'>
              <div className='PollResults'>
                <div className='PollResultsHeader'>
                  <div className='PrimaryYellowText'>Poll</div>•<div className='PrimaryRedText'>Results</div>
                </div>
                <div className='PollResultsCount'>
                  {total} total votes
                </div>
              </div>
              <div className='ResultBar'>
                <div className='PrimaryYellowBackground' style={{display: 'flex', width: `${choice1pstring}%`, height: "3rem", justifyContent: 'center', alignItems: 'center'}}></div>
                <div style={{display: 'flex', fontWeight: '700'}}>{choice1pstring}% chose&nbsp;<div className='PrimaryYellowText'>{choice1}</div></div>
                <div className='PrimaryRedBackground' style={{display: 'flex', width: `${choice2pstring}%`, height: "3rem", justifyContent: 'center', alignItems: 'center', marginTop: '2rem'}}></div>
                <div style={{display: 'flex', fontWeight: '700'}}>{choice2pstring}% chose&nbsp;<div className='PrimaryRedText'>{choice2}</div></div>
              </div>
            </div>
        </main>
      )
  }
  
}
