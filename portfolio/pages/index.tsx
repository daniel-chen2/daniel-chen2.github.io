import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../partials/header'
import React, { useEffect, useRef, useState } from "react";

function Game() {
  const playerSpeed = 10

  return (
    <div className='home bg-orange-900 w-full'>
      <Character startingPosLeft={500} startingPosTop={500} width={100} height={100} speed={20}/>
    </div>
  )
}

// Portal
// Character
// Entity
function Character(props: any) {
  const[left, setLeft] = useState(props.startingPosLeft)
  const[top, setTop] = useState(props.startingPosTop)
  const[width, setWidth] = useState(props.width)
  const[height, setHeight] = useState(props.height)

  const speed = props.speed
  const[classString, setClassString] = useState(
    "character-down"
  )
  
  const[styleObj, setStyleObj] = useState({
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

  function keyPress(e: any) {
    if (e.key == 'ArrowDown') {
      setTop(top+speed);
      setClassString('character-down')
    }
    else if (e.key == 'ArrowUp') {
      setTop(top-speed);
      setClassString('character-up');
    }
    else if (e.key == 'ArrowLeft') {
      setLeft(left-speed);
      setClassString('character-left')
    }
    else if (e.key == 'ArrowRight' || e.keyPress == 'ArrowRight') {
      setLeft(left+speed);
      setClassString('character-right walking')
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
      className= {`character ${classString} relative w-20 h-20 inline-block`} 
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

