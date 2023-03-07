import React, { Suspense, useEffect, useRef} from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { CubeCamera, Environment, OrbitControls, Gltf, ScrollControls, useScroll, Stats, PerspectiveCamera } from '@react-three/drei';
import {EffectComposer, DepthOfField, Bloom, ChromaticAberration} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

//import gsap modules
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/all';

//theatre js
import {SheetProvider, useCurrentSheet} from '@theatre/r3f'
import {getProject, val} from '@theatre/core'
import studio from '@theatre/studio'
import extension from '@theatre/r3f/dist/extension'

import flytest from "./state.json"

//import json
import dataAnim from "./state.json"

import { Ground } from './Ground';
import { Car } from './Car';
import Rings from './Rings';
import { Boxes } from './Boxes';
import "./style.css"
import {Ui} from './Ui';


gsap.registerPlugin(ScrollTrigger);
// studio.initialize();
// studio.extend(extension);

function CarShow() {
  const sheet = useCurrentSheet();
  const camaraRef = useRef();
  const tl = useRef();
  
  //our callback will run on every animation frame
  //scroll con theatrejs
  
  // useFrame(() => {
    //   // the length of our sequence
    //   const sequenceLength = val(sheet.sequence.pointer.length);
    //   // update the "position" of the playhead in the sequence, as a fraction of its whole length
    //   sheet.sequence.position = scroll.offset * sequenceLength;
    // }) 
    
    
    
    //probando gsap
    // coordenadas iniciales: position [0, 170.70, 0.64] rotation [-89.55, 0, 0.78]
    // coordenadas finales: [0.0161, 15.24, 0.64] rotation [-89.55, 0, 0]
    
    //scroll con gsap
    
    const scroll = useScroll();
    useFrame(()=>{
      tl.current.seek(scroll.offset * tl.current.duration())

  });

  useEffect(() => {
    
    // if(!!camaraRef.current){
    //   console.log(camaraRef.current)
    // }

    //timeline
    tl.current = gsap.timeline();

    //animacion1
    tl.current.to(camaraRef.current.position, {
      x: 0,
      y: 170.70,
      z: 0.64,
      duration:2,
      ease: "power2.out"
    },0)

    tl.current.to(camaraRef.current.rotation, {
      x: -89.55,
      y: 0,
      z: 0,
      duration:2,
      ease: "power2.out"
    }, 0)

    //animacion2
    tl.current.to(camaraRef.current.position, {
      x: 0,
      y: 15.24,
      z: 0.64,
      duration:3,
      ease: "power2.out"
    },2)

    //animacion3
    tl.current.to(camaraRef.current.position, {
      x: -0.063,
      y:  2.19,
      z: 6.1,
      duration:3,
      ease: "power2.out"
    }, 5)

    tl.current.to(camaraRef.current.rotation, {
      x: -88.2,
      y: 0,
      z: 0.39,
      duration:3,
      ease: "power2.out"
    }, 5)

    //animacion 4
    tl.current.to(camaraRef.current.position, {
      x: 1.68,
      y:  1.54,
      z:  -4.51,
      duration:3,
      ease: "power2.out"
    }, 8)

    tl.current.to(camaraRef.current.rotation, {
      x: -87.73,
      y: 2.81,
      z: -0.18,
      duration:3,
      ease: "power2.out"
    }, 8)

    //animacion 5
    tl.current.to(camaraRef.current.position, {
      x: 14.79,
      y: 1.26,
      z: -0.49,
      duration:3,
      ease: "power2.out"
    }, 12)

    tl.current.to(camaraRef.current.rotation, {
      x: -87.96,
      y: 1.58,
      z: 0,
      duration:3,
      ease: "power2.out"
    }, 12)

    
    //animacion 6
    tl.current.to(camaraRef.current.position, {
      x: 1.68,
      y:  1.54,
      z:  -4.51,
      duration:3,
      ease: "power2.out"
    }, 15)

    tl.current.to(camaraRef.current.rotation, {
      x: -87.73,
      y: 2.81,
      z: -0.18,
      duration:3,
      ease: "power2.out"
    }, 15)

    //animacion 6
    tl.current.to(camaraRef.current.position, {
      x: 1.68,
      y:  1.54,
      z:  10,
      duration:2,
      ease: "power2.out"
    }, 18)

     

    

  }, [camaraRef])




  // useFrame(({ clock }) => {
  //   camara.current.rotation.z = clock.getElapsedTime()
  // })

  return (
    <>
      <group theatreKey="GroupCamera" ref={camaraRef} position={[0.0161, 120, 0.64]} rotation={[-89.55, 0, -10]} >
        <PerspectiveCamera theatreKey="Camera" makeDefault fov={50} />
      </group>

     
      <color args={[0,0,0]} attach="background" />
      
      <CubeCamera resolution={256} frames={Infinity}>
        {(texture) => (
          <>
            <Environment map={texture} />
            <Car />
          </>
        )}
      </CubeCamera>

      <spotLight
        color={[1, 0.25, 0.7]}
        intensity={1.5}
        angle={0.6}
        penumbra={0.5}
        position={[5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={2}
        angle={0.6}
        penumbra={0.5}
        position={[-5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
      <Ground />
      <Boxes />
      <Rings />
      

      {/* postprocessing */}
      <EffectComposer>
        <Bloom
          blendFunction={BlendFunction.ADD}
          intensity={1.3} // The bloom intensity.
          width={300} // render width
          height={300} // render height
          kernelSize={5} // blur kernel size
          luminanceThreshold={0.12} // luminance threshold. Raise this value to mask out darker elements in the scene.
          luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL} // blend mode
          offset={[0.0005, 0.0012]} // color offset
        />
      </EffectComposer>
      
    
    </>
  )
}

function App() {
  // our Theatre.js project sheet, we'll use this later
const demoSheet = getProject('Demo Project' , {state: flytest}).sheet('Demo Sheet');



  return (
    <Suspense fallback={null}>
      <Canvas shadows>
      <ScrollControls pages={10} damping={1}>
        <SheetProvider sheet={demoSheet}>
              <CarShow />
              {/* <Ui /> */}
              {/* <OrbitControls />
              <Stats /> */}
        </SheetProvider>

      </ScrollControls>
      </Canvas>
    </Suspense>
  );
}

export default App;
