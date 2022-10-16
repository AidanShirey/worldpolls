import { useState } from "react";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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
const app = initializeApp(firebaseConfig);
const dbRef = ref(getDatabase());
const analytics = getAnalytics(app);

export default function MainVote() {
 const [pollnumber, setPollnumber] = useState('0');
 const [isChosen, setChosen] = useState('0');
 const [choice1, setChoice1] = useState('Choice #1');
 const [choice2, setChoice2] = useState('Choice #2');
 const [choice1count, setChoice1count] = useState('0');
 const [choice2count, setChoice2count] = useState('0');

 get(dbRef).then((snapshot) => {
  if (snapshot.exists()) {
    setPollnumber(snapshot.size);
  } else {
    console.log("Cannot get number of polls");
  }
}).catch((error) => {
  console.error(error);
});

 get(child(dbRef, `wp_${pollnumber}/c_1`)).then((snapshot) => {
  if (snapshot.exists()) {
    setChoice1(snapshot.val());
  } else {
    console.log("Choice #1: No data available");
  }
}).catch((error) => {
  console.error(error);
});

get(child(dbRef, `wp_${pollnumber}/c_2`)).then((snapshot) => {
  if (snapshot.exists()) {
    setChoice2(snapshot.val());
  } else {
    console.log("Choice #2: No data available");
  }
}).catch((error) => {
  console.error(error);
});

get(child(dbRef, `wp_${pollnumber}/vc_1`)).then((snapshot) => {
  if (snapshot.exists()) {
    setChoice1count(snapshot.val());
  } else {
    console.log("Choice #1: No count data available");
  }
}).catch((error) => {
  console.error(error);
});

get(child(dbRef, `wp_${pollnumber}/vc_2`)).then((snapshot) => {
  if (snapshot.exists()) {
    setChoice2count(snapshot.val());
  } else {
    console.log("Choice #2: No count data available");
  }
}).catch((error) => {
  console.error(error);
});

let total = choice1count + choice2count;
let choice1p = choice1count / total;
choice1p = choice1p.toFixed(2);
let choice1pstring = choice1p.toString().split('.')[1];
let choice2p = choice2count / total;
choice2p = choice2p.toFixed(2);
let choice2pstring = choice2p.toString().split('.')[1];

 const toggleChosen = (chosen) => {
    setChosen(chosen);
 };
    
 if (isChosen === '1') {
    return (
    <main>
        <div className='VotePanel resultsShow'>
          <div className='VoteChoice PrimaryYellowBackground Voted' onClick={() => toggleChosen('1')}>{choice1}</div>
          <div className='VoteOr PrimaryBlueBackground orFade'>or</div>
          <div className='VoteChoice PrimaryRedBackground NotVoted' onClick={() => toggleChosen('2')}>{choice2}</div>
        </div>
        <div className='ResultPanel resultsShow'>
          <div className='ResultBar barFadeIn'>
            <div className='PrimaryYellowBackground' style={{width: `${choice1pstring}%`, height: "100%"}}></div>
            <div className='PrimaryRedBackground' style={{width: `${choice2pstring}%`, height: "100%"}}></div>
          </div>
          <div style={{display: 'flex'}}>{choice1pstring}% chose&nbsp;<div className='PrimaryYellowText'>{choice1}</div>, {choice2pstring}% chose&nbsp;<div className='PrimaryRedText'>{choice2}</div></div>
        </div>
    </main>
  )
}
 else if (isChosen === '2') {
    return (
    <main>
        <div className='VotePanel resultsShow'>
          <div className='VoteChoice PrimaryYellowBackground NotVoted' onClick={() => toggleChosen('1')}>{choice1}</div>
          <div className='VoteOr PrimaryBlueBackground orFade'>or</div>
          <div className='VoteChoice PrimaryRedBackground Voted' onClick={() => toggleChosen('2')}>{choice2}</div>
        </div>
        <div className='ResultPanel resultsShow'>
          <div className='ResultBar barFadeIn'>
            <div className='PrimaryYellowBackground' style={{width: `${choice1pstring}%`, height: "100%"}}></div>
            <div className='PrimaryRedBackground' style={{width: `${choice2pstring}%`, height: "100%"}}></div>
          </div>
          <div style={{display: 'flex'}}>{choice1pstring}% chose&nbsp;<div className='PrimaryYellowText'>{choice1}</div>, {choice2pstring}% chose&nbsp;<div className='PrimaryRedText'>{choice2}</div></div>
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
            <div className='ResultBar'>
            <div className='PrimaryYellowBackground' style={{width: `${choice1pstring}%`, height: "100%"}}></div>
            <div className='PrimaryRedBackground' style={{width: `${choice2pstring}%`, height: "100%"}}></div>
          </div>
          <div style={{display: 'flex'}}>{choice1pstring}% chose&nbsp;<div className='PrimaryYellowText'>{choice1}</div>, {choice2pstring}% chose&nbsp;<div className='PrimaryRedText'>{choice2}</div></div>
            </div>
        </main>
      )
  }
  
}
