import React, { useState } from 'react';
import WellnessQuiz from './WellnessQuiz';
import './WellnessQuiz.css'

const WellnessForm = () => {
    const [buttonVisible, setButtonVisible] = useState(true);
   
    const [showQuiz, setShowQuiz] = useState(false);
  const [quizData, setQuizData] = useState({
    stressLevel: '',
    activityLevel: '',
    sleepQuality: '',
    appetite: '',
    mood: '',
    exercise: '',
    socialLife: '',
    focus: '',
    energy: '',
    overallWellness: '',
    wellnessPlan: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if any question is skipped
    if (Object.values(quizData).some((value) => value === '')) {
        alert('Please answer all questions before submitting.');
        return;
      }
      setButtonVisible(false);
    const calculatedWellnessPlan = calculateWellnessPlan(
      quizData.stressLevel,
      quizData.activityLevel,
      quizData.sleepQuality,
      quizData.appetite,
      quizData.mood,
      quizData.exercise,
      quizData.socialLife,
      quizData.focus,
      quizData.energy,
      quizData.overallWellness
    );
    setQuizData({
      ...quizData,
      wellnessPlan: calculatedWellnessPlan,
    });
  };

  const calculateWellnessPlan = (stress, activity, sleep, appetite, mood, exercise, socialLife, focus, energy, overallWellness) => {
    // Updated logic based on new questions
    if (stress === 'high' && activity === 'low' && sleep === 'poor') {
      return 'Meditation and Relaxation Plan';
    } else if (appetite === 'low' && mood === 'low') {
      return 'Mindfulness and Meditation Plan';
    } else if (stress === 'high' && mood === 'low') {
      return 'Stress Management Plan';
    } else if (socialLife === 'low' && focus === 'low') {
      return 'Social Connection and Focus Plan';
    } else if (energy === 'low' && overallWellness === 'low') {
      return 'Energy Boost and Overall Wellness Plan';
    } else {
      return 'General Wellness Plan';
    }
  };

  const handleTakeQuizClick = () => {
    setShowQuiz(true);
  };

  const handleQuizInputChange = (field, value) => {
    setQuizData({
      ...quizData,
      [field]: value,
    });
  };

  return (
    <div>
        <br /><br /><br />
      <h1 style={{ textAlign: 'center' , fontFamily: 'sans-serif'}}>Wellness Assessment</h1>
      <br /><br /><br />
      {showQuiz ? ( buttonVisible&&
        <WellnessQuiz
          quizData={quizData}
          onInputChange={handleQuizInputChange}
          onSubmit={handleSubmit}
        />
      ) : (
        
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            
        <button onClick={handleTakeQuizClick}>Take Quiz</button>
        </div>
      )}
        <br /><br /><br />
      {quizData.wellnessPlan && (
        <div >
          <h3 style={{textAlign: 'center'}}>Recommended Wellness Plan:</h3>
          <p style={{textAlign: 'center', marginTop : '10px'}}>{quizData.wellnessPlan}</p>
        </div>
      )}
      <br /><br /><br />
    </div>
  );
};

export default WellnessForm;
