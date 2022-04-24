import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../partials/header'
import React, { useEffect, useRef, useState } from "react";

function Game() {
  const gameWidth = 2000;
  const gameHeight = 800;

  const boundariesX = new Set([0, gameWidth]);
  const boundariesY = new Set([0, gameHeight])

  return (
    <div className='home' style={{
      width: gameWidth, 
      height: gameHeight }}>
      <Character boundariesX= {boundariesX}  boundariesY={boundariesY} startingPosLeft={500} startingPosTop={500} width={50} height={50} speed={20} />
    </div>
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
    if (left > 0 && top > 0 && left < 2000 && top < 1000) {
      return true
    }
    return false
  }

  function keyPress(e: any) {
    if (e.key == 'ArrowDown') {
      setClassString('character-down')
      if (!canWalk(left, top + 10)) return
      setTop(top + speed);
    }
    else if (e.key == 'ArrowUp') {
      setClassString('character-up');
      if (!canWalk(left, top - 10)) return
      setTop(top - speed);
    }
    else if (e.key == 'ArrowLeft') {
      setClassString('character-left')
      if (!canWalk(left - 15, top)) return
      setLeft(left - speed);
    }
    else if (e.key == 'ArrowRight' || e.keyPress == 'ArrowRight') {
      setClassString('character-right walking')
      if (!canWalk(left + 10, top)) return
      setLeft(left + speed);
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
    ></div>
  )
}

class PhysicalProperties {
  posLeft = 0;
  posTop = 0;
  width = 0;
  height = 0;

  constructor(posLeft: number, posTop: number, width: number, height: number) {
    this.posLeft = posLeft;
    this.posTop = posTop;
    this.width = width;
    this.height = height;
  }
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

