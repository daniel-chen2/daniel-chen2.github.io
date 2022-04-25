import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../partials/header'
import React, { useEffect, useRef, useState } from "react";

function Game() {
  const gameWidth = 1000;
  const gameHeight = 600;

  const gameBoundaries = [
    {
      xRange: [Number.NEGATIVE_INFINITY, 0],
      yRange: [Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY],
    },
    {
      xRange: [0, Number.POSITIVE_INFINITY],
      yRange: [Number.NEGATIVE_INFINITY, 0],
    },
    {
      xRange: [gameWidth, Number.POSITIVE_INFINITY],
      yRange: [0, Number.POSITIVE_INFINITY],
    },
    {
      xRange: [0, Number.POSITIVE_INFINITY],
      yRange: [gameHeight, Number.POSITIVE_INFINITY],
    }
  ]

  let gameObjects: JSX.Element[] = []

  function insertGameObjectAndBoundary(left: number, top: number, width: number, height: number) {
    gameObjects.push(
      <div className="gameEntity" style={{left: left, top: top, width: width, height: height}}>Hello</div>
    )
    gameBoundaries.push(
      {
        xRange: [left, left+width],
        yRange: [top, top+height],
      }
    )
  }

  function renderEnvironmentObjectsAndBoundaries() {
    return <>
      {gameObjects} 
    </>
  }

  insertGameObjectAndBoundary(0, 200, 50, 50)
  insertGameObjectAndBoundary(0, 0, gameWidth, 200)

  return (
    <>
      <div className='home' style={{
        width: gameWidth,
        height: gameHeight
      }}>
        <div className='wall gameEntity'></div>
        <Character gameBoundaries={gameBoundaries} startingPosLeft={500} startingPosTop={500} width={50} height={55} speed={20} />
        {renderEnvironmentObjectsAndBoundaries() }
      </div>
    </>
  )
}

// Portal
// Character
// Entity
function Character(props: any) {
  const [left, setLeft] = useState(props.startingPosLeft)
  const [top, setTop] = useState(props.startingPosTop)
  const [classString, setClassString] = useState(
    "character-down"
  )

  const speed = props.speed
  const width = props.width
  const height = props.height

  const [styleObj, setStyleObj] = useState({
    left: left,
    top: top,
    width: width,
    height: height
  })

  function updateStyle() {
    setStyleObj(
      {
        left: left,
        top: top,
        width: width,
        height: height
      }
    )
  }

  function canWalk(left: number, top: number) {
    const hitBoundary = props.gameBoundaries.some(
      function (gameBoundary: any) {
        return (
          left + (0.5 * width) >= gameBoundary.xRange[0] && left + (0.25 * width) <= gameBoundary.xRange[1] &&
          top + (0.5 * height) >= gameBoundary.yRange[0] && top + (0.5 * height) <= gameBoundary.yRange[1]
        );
        
      }
    )

    // (left + (0.25 * width) > 0 && top + (0.25 * height) > 0 && left < props.boundaryX && top < props.boundaryY)
    return !hitBoundary
  }

  function walk(left = 1, top = 1, classString: string) {
    setClassString(classString)
    if (!canWalk(left, top)) return
    setTop(top);
    setLeft(left)
  }

  function keyPress(e: any) {
    if (e.key == 'ArrowDown') {
      walk(left, top + speed, 'character-down')
    }
    else if (e.key == 'ArrowUp') {
      walk(left, top - speed, 'character-up')
    }
    else if (e.key == 'ArrowLeft') {
      walk(left - speed, top, 'character-left')
    }
    else if (e.key == 'ArrowRight' || e.keyPress == 'ArrowRight') {
      walk(left + speed, top, 'character-right')
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", keyPress)
    updateStyle()

    return () => {
      document.removeEventListener("keydown", keyPress)
    }
  }, [left, top, classString]);

  return (
      <div
        className={`character ${classString} relative w-20 h-20 inline-block`}
        style={
          styleObj
        }
      >
      </div>
  )
}

function GameEntity() {
  const left = 0;
  const top = 0;
  const width = 0;
  const height = 0;

  const [styleObj, setStyleObj] = useState({
    left: left,
    top: top,
    width: width,
    height: height
  })

  return (
    <div style={styleObj} className=''>
    </div>
  )
}


const Home: NextPage = () => {
  return (
    <div className='flex'>
      <Header></Header>
      <Game></Game>
    </div>
  )
}

export default Home
function url(arg0: string): any {
  throw new Error('Function not implemented.');
}

