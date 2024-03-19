import { useEffect, useState } from "react";

const App = () => {
  const [time, setTime] = useState(null)
  const [timer, setTimer] = useState(null)
  const [isRunning, setIsRunning] = useState(false)
  const [title, setTitle] = useState('')
  const [index, setIndex] = useState(0)
  const [sets, setSets] = useState(null)

  const workouts = [
    {
      id: 1,
      name: 'Workout 1',
      exercises: [
        {
          name: 'Exercise 1',
          order: 1,
          useMachine: false,
          repetitions: 12,
          sets: 3,
          restTime: 10
        },
        {
          name: 'Exercise 2',
          order: 2,
          useMachine: false,
          repetitions: 12,
          sets: 5,
          restTime: 5
        }
      ]
    }
  ];

  const start = (restExercise, exercises) => {
    let callback
    clearInterval(timer)

    setTitle(exercises[index].name)
    if (sets === null) {
      setSets(exercises[index].sets)
    }

    if (restExercise === 'exercise') {
      setIsRunning(true)
      setTime(0)

      callback = () => {
        setTime(prev => prev + 1)
      }
    } else {
      setIsRunning(false)
      setTime(exercises[index].restTime)

      callback = () => {
        setTime(prev => prev - 1)
      }
    }

    const interval = setInterval(callback, 1000)
    setTimer(interval)
  }

  useEffect(() => {
    if (time ) {
      setSets(prev => prev - 1)

      if (sets === 0) {
        setIndex(prev => prev + 1)
        setSets(null)
      }
    }
  }, [time])

  const pause = (restExercise) => {
    clearInterval(timer)
    setIsRunning(restExercise === 'exercise')
  }

  const stop = (restExercise) => {
    clearInterval(timer)
    setIsRunning(restExercise === 'exercise')
  }

  return (
    <>
      <div>{title}</div>
      {sets && <div>Séries restantes: {sets}</div>}
      <div>{time}</div>
      <button onClick={() => start(!isRunning ? 'exercise' : 'rest', workouts[0].exercises)}>{!isRunning ? 'Iniciar' : 'Descansar'}</button>
      <button onClick={() => stop(!isRunning ? 'exercise' : 'rest')}>Parar</button >
      <button onClick={() => pause(!isRunning ? 'exercise' : 'rest')}>Pausar</button>
    </>
  )
}

export default App
