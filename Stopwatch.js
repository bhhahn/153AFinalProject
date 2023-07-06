import React, { useContext, useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import ListComponent from './list';
import { ScoreContext } from './scorecontext';

let padToTwo = (number) => (number <= 9 ? `0${number}` : number);

const Stopwatch = () => {
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const [msec, setMsec] = useState(0);
  const [start, setStart] = useState(false);
  const [gtMin, setGtMin] = useState(0);
  const [gtSec, setGtSec] = useState(0);
  const [gtMsec, setGtMsec] = useState(0);
  const [onField, setOnField] = useState(false);
  
  const lapArr = useRef([]);
  const requestRef = useRef();
  const startTimeRef = useRef(0);
  const gtTimeRef = useRef(0);
  const gtRequestRef = useRef();
  const elapsedTimeRef = useRef(0);

  const { scoreState, increaseHomeScore, increaseAwayScore, resetScore  } = useContext(ScoreContext);

  const handleToggle = () => {
    setStart(!start);
    if (!start) {
      startTimeRef.current = Date.now() - elapsedTimeRef.current;
      requestRef.current = requestAnimationFrame(updateTimer);
      if (onField) {
        gtRequestRef.current = requestAnimationFrame(updateGTStopwatch);
      }
    } else {
      cancelAnimationFrame(requestRef.current);
      cancelAnimationFrame(gtRequestRef.current);
    }
  };

  const handleLap = () => {
    const { hScore, aScore } = scoreState;
    lapArr.current.push({
      min,
      sec,
      msec,
      initialHScore: hScore,
      initialAScore: aScore
    });
  };

  const handleReset = () => {
    setMin(0);
    setSec(0);
    setMsec(0);
    setStart(false);
    setGtMin(0);
    setGtSec(0);
    setGtMsec(0);
    setOnField(false);
    lapArr.current = [];
    elapsedTimeRef.current = 0;
    gtTimeRef.current = 0;
    cancelAnimationFrame(requestRef.current);
    cancelAnimationFrame(gtRequestRef.current);
  };

  const doReset = () => {
    handleReset();
    resetScore();
  }
  const homeScore = () => {
    increaseHomeScore();
    handleLap();
  }
  const awayScore = () => {
    increaseAwayScore();
    handleLap();
  }

  const subIn = () => {
    setOnField(true);
    if (gtTimeRef.current == 0) {
        gtTimeRef.current = Date.now();
      }
    gtRequestRef.current = requestAnimationFrame(updateGTStopwatch);
    handleLap();
  }

  const subOut = () => {
    setOnField(false);
    handleLap();
    cancelAnimationFrame(gtRequestRef.current);
    gtTimeRef.current = 0;
  }

  const updateGTStopwatch = () => {
    if (start && onField) {
      const currentTime = Date.now();
      const elapsedTime = currentTime - gtTimeRef.current;
  
      const gtminutes = Math.floor(elapsedTime / (1000 * 60));
      const gtseconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
      const gtmilliseconds = Math.floor((elapsedTime % 1000) / 10);
  
      setGtMin(gtminutes);
      setGtSec(gtseconds);
      setGtMsec(gtmilliseconds);

      gtRequestRef.current = requestAnimationFrame(updateGTStopwatch);

    }
  };

  const updateTimer = () => {
    const currentTime = Date.now();
    elapsedTimeRef.current = currentTime - startTimeRef.current;

    const minutes = Math.floor(elapsedTimeRef.current / (1000 * 60));
    const seconds = Math.floor((elapsedTimeRef.current % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((elapsedTimeRef.current % 1000) / 10);

    setMin(minutes);
    setSec(seconds);
    setMsec(milliseconds);

   updateGTStopwatch();

    requestRef.current = requestAnimationFrame(updateTimer);
  };

  return (
    <View>
    <View style={styles2.container}>
      <TouchableOpacity style={styles2.button} onPress={() => homeScore()}>
        <Text style={styles2.buttonText}>+1</Text>
      </TouchableOpacity>
      <Text style={styles2.scoreboard}>
        {scoreState.hScore} - {scoreState.aScore}
      </Text>
      <TouchableOpacity style={styles2.button} onPress={() => awayScore()}>
        <Text style={styles2.buttonText}>+1</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.container}>
      <View style={styles.parent}>
        <TouchableOpacity style={styles.button} onPress={handleToggle}>
          <Text style={styles.buttonText}>{!start ? 'Start' : 'Stop'}</Text>
        </TouchableOpacity>
        <Text style={styles.child}>{'  ' + padToTwo(min) + ' : '}</Text>
        <Text style={styles.child}>{padToTwo(sec) + ' . '}</Text>
        <Text style={styles.child}>{padToTwo(msec)}</Text>
        <TouchableOpacity style={styles.button} onPress={doReset}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.gtParent}>
        
      </View>  
      <View style={styles.gtParent}>
      <TouchableOpacity style={styles.button} onPress={() => subIn()}>
            <Text style={styles.buttonText}>
                Sub In
            </Text>
        </TouchableOpacity>
        <Text style={styles.gtChild}>
            {'  ' + padToTwo(gtMin) + ' : '}
            {padToTwo(gtSec) + ' . '}
            {padToTwo(gtMsec)}
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => subOut()}>
            <Text style={styles.buttonText}>
                Sub Out
            </Text>
        </TouchableOpacity>
      </View>
      <ListComponent
        lap={lapArr.current}
        initialHScore={scoreState.hScore}
        initialAScore={scoreState.aScore}
       />    
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#0D3B66',
    backgroundColor: '#0D3B66',
    paddingTop: '.5%',
    paddingBottom: '.5%',
  },
  child: {
    fontVariant: 'tabular-nums',
    fontSize: 36,
    color: '#F6F4F6'
  },
  buttonParent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '12%',
    marginBottom: '16%'
  },
  button: {
    backgroundColor: '#0D3B66',
    paddingTop: '5%',
    paddingBottom: '5%',
    paddingLeft: '5%',
    paddingRight: '5%',
    display: 'flex',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#0D3B66',
    height: 60
  },
  buttonText: {
    color: '#F6F4F6',
    fontSize: 20,
    alignSelf: 'center'
  },
  gtParent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#0D3B66',
    backgroundColor: '#0D3B66',
    paddingTop: '.5%',
    paddingBottom: '.5%',
  },
  gtChild: {
    fontVariant: 'tabular-nums',
    fontSize: 30,
    color: '#F6F4F6'
  }
});

const styles2 = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: '#248232',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: '8%'
    },
    scoreboard: {
      fontSize: 40,
      color: '#F6F4F6',
      marginBottom: '8%'
    },
    button: {
      backgroundColor: '#248232',
      alignItems: 'center',
      paddingTop: '5%',
      paddingBottom: '5%',
      paddingLeft: '5%',
      paddingRight: '5%',
      display: 'flex',
      borderRadius: 20,
      borderWidth: 1,
      borderColor: '#248232',
      height: 60
    },
    buttonText: {
      color: '#F6F4F6',
      fontSize: 20,
      alignSelf: 'center'
    }
  });

export default Stopwatch;
