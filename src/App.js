import React, { useState } from 'react';

import {
  Container,
  Typography,
  Box,
  Link,
  Grid,
  Stack,
  Card,
  CardContent,
  CardActionArea,
  Button,
  Select,
  MenuItem
} from '@mui/material'

import Mathis from './questions/Mathis.json'
import Dominik from './questions/Dominik.json'

// console.log(questions.keys())

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      Copyright © Mathis Arend 2021
    </Typography>
  );
}

const colors = ['darkred', 'darkgreen', 'darkblue', '#242424']

const files = [Mathis, Dominik]

const App = () => {

  const [active, setActive] = useState("")
  const [team, setTeam] = useState("A")
  const [teamAPoints, setTeamAPoints] = useState(0)
  const [teamBPoints, setTeamBPoints] = useState(0)
  const [answered, setAnswered] = useState([])
  const [showCorrect, setShowCorrect] = useState(false)
  const [winner, setWinner] = useState("")
  const [content, setContent] = useState(Mathis)

  const activate = (category, question) => {
    setShowCorrect(false)
    if(active == "") {
      setActive(`${category}${question}`)
    }
  }

  const switchTeam = (points, correct, category, question) => {
    if(team == "A") {
      setShowCorrect(true)
      setTimeout(() => {
        if(correct) setTeamAPoints(teamAPoints + points)
        let answers = answered
        answers.push(`${category}${question}`)
        setAnswered(answers)
        setTeam("B")
        setActive("")
        setShowCorrect(false)
        if(answers.length == 16) {
          if(teamAPoints > teamBPoints){
            alert('Team A hat gewonnen!')
            setWinner("A")
          }
          else if(teamBPoints > teamAPoints){
            alert('Team B hat gewonnen!')
            setWinner("B")
          }
          else
            alert('Unentschieden!')
        }
      }, 2000)

    }
    else {
      setShowCorrect(true)
      setTimeout(() => {
        if(correct) setTeamBPoints(teamBPoints + points)
        let answers = answered
        answers.push(`${category}${question}`)
        setAnswered(answers)
        setTeam("A")
        setActive("")
        setShowCorrect(false)
        if(answers.length == 16) {
          if(teamAPoints > teamBPoints){
            alert('Team A hat gewonnen!')
            setWinner("A")
          }
          else if(teamBPoints > teamAPoints){
            alert('Team B hat gewonnen!')
            setWinner("B")
          }
          else
            alert('Unentschieden!')
        }
      }, 2000)
    }
  }

  const changeContent = content => {
    setContent(content)
    setActive("")
    setTeam("A")
    setTeamAPoints(0)
    setTeamBPoints(0)
    setAnswered([])
    setShowCorrect(false)
    setWinner("")
  }

  const decoration = (category, question) => {
    if(answered.includes(`${category}${question}`))
      return 'line-through'
    else return ''
  }

  return (
    <Container maxWidth='xxl'>
    <Typography variant="h3" component="h1" sx={{float: 'left'}} gutterBottom>
      PubQuiz!
    </Typography>
    <Select
      label="Content"
      value={content}
      onChange={event => changeContent(event.target.value)}
      sx={{float: 'right', marginTop: '10px'}}
    >
      <MenuItem value={Mathis}>Mathis</MenuItem>
      <MenuItem value={Dominik}>Dominik</MenuItem>
    </Select>
      <Grid container spacing={2}>

        {Object.keys(content).map((category, i) => (
          <Grid item xs={3} key={category}>
            <Stack spacing={3}>
              <Typography variant="h4">
              {category}
              </Typography>
              {Object.keys(content[category]).map(question => (
                <Card sx = {{backgroundColor: colors[i]}} key={question}>
                  {
                    active == `${category}${question}`
                    ?
                    <CardContent>
                      <Typography sx={{ fontSize: 22 }} color="text.secondary" gutterBottom>
                        {question}
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Stack spacing={3}>
                          <Button sx={{fontSize: '20px'}} color="black" variant="outlined" onClick={
                            () => switchTeam(
                              content[category][question].points,
                              content[category][question].answers[0] == content[category][question].correct,
                              category,
                              question
                            )}
                            color = {
                              content[category][question].correct == content[category][question].answers[0]
                              ? (showCorrect ? 'success' : 'primary')
                              : (showCorrect ? 'error' : 'primary')
                            }
                          >
                            A: {content[category][question].answers[0]}
                            </Button>
                            <Button sx={{fontSize: '20px'}} color="black" variant="outlined"  onClick={
                              () => switchTeam(
                                content[category][question].points,
                                content[category][question].answers[1] == content[category][question].correct,
                                category,
                                question
                              )}
                              color = {
                                content[category][question].correct == content[category][question].answers[1]
                                ? (showCorrect ? 'success' : 'primary')
                                : (showCorrect ? 'error' : 'primary')
                              }
                            >
                            B: {content[category][question].answers[1]}
                            </Button>
                          </Stack>
                        </Grid>
                        <Grid item xs={6}>
                          <Stack spacing={3}>
                            <Button sx={{fontSize: '20px'}} color="black" variant="outlined"  onClick={
                              () => switchTeam(
                                content[category][question].points,
                                content[category][question].answers[2] == content[category][question].correct,
                                category,
                                question
                              )}
                              color = {
                                content[category][question].correct == content[category][question].answers[2]
                                ? (showCorrect ? 'success' : 'primary')
                                : (showCorrect ? 'error' : 'primary')
                              }
                            >
                            C: {content[category][question].answers[2]}
                            </Button>
                            <Button sx={{fontSize: '20px'}} color="black" variant="outlined"  onClick={
                              () => switchTeam(
                                content[category][question].points,
                                content[category][question].answers[3] == content[category][question].correct,
                                category,
                                question
                              )}
                              color = {
                                content[category][question].correct == content[category][question].answers[3]
                                ? (showCorrect ? 'success' : 'primary')
                                : (showCorrect ? 'error' : 'primary')
                              }
                            >
                            D: {content[category][question].answers[3]}
                            </Button>
                          </Stack>
                        </Grid>
                      </Grid>
                    </CardContent>
                    :
                    <CardActionArea disabled={active != "" ||answered.includes(`${category}${question}`)} onClick={() => activate(category, question)}>
                      <CardContent>
                        <Typography sx={{ fontSize: 22, textDecoration:  decoration(category, question)}} color="text.secondary" gutterBottom>
                          {`${content[category][question].points} Punkte`}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  }
                </Card>
              ))}
            </Stack>
          </Grid>
        ))}

        <Grid item xs={12}>
        <Typography variant="h3" component="h1" sx={{fontWeight: winner == "A" ? 'bold' : 'normal'}} gutterBottom >
          Team A: {teamAPoints} Punkte {team == "A" && !winner ? '←' : ''}
        </Typography>
        <Typography variant="h3" component="h1" sx={{fontWeight: winner == "B" ? 'bold' : 'normal'}} gutterBottom>
          Team B: {teamBPoints} Punkte {team == "B" && !winner ? '←' : ''}
        </Typography>
        </Grid>
      </Grid>
      <Box sx={{ my: 4 }}>
        <Copyright />
      </Box>
    </Container>
  )
}

export default App
