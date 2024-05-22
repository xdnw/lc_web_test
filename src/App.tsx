import { Button } from 'reacthalfmoon';
import HelloWorld from './HelloWorld';
import Nested from './Nested';
import "./App.css"
import { useEffect } from 'react';



function setupAnimation(): void {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement,
  ctx = canvas.getContext('2d') as CanvasRenderingContext2D,
  hue = 217,
  stars: Star[] = [],
  maxStars = 1400;

  let w: number = canvas.width = document.documentElement.clientWidth;
  let h: number = canvas.height = document.documentElement.clientHeight;

  const canvas2 = document.createElement('canvas'),
      ctx2 = canvas2.getContext('2d') as CanvasRenderingContext2D;
      canvas2.width = 100;
      canvas2.height = 100;
  const half = canvas2.width/2,
      gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
      gradient2.addColorStop(0.025, '#fff');
      gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
      gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');
      gradient2.addColorStop(1, 'transparent');

      ctx2.fillStyle = gradient2;
      ctx2.beginPath();
      ctx2.arc(half, half, half, 0, Math.PI * 2);
      ctx2.fill();

  function random(min: number, max?: number): number {
    if (arguments.length < 2) {
      max = min;
      min = 0;
    }
    
    if (min > max!) {
      const hold = max as number;
      max = min;
      min = hold;
    }

    return Math.floor(Math.random() * (max! - min + 1)) + min;
  }

  function maxOrbit(x: number, y: number): number {
    const max = Math.max(x,y),
        diameter = Math.round(Math.sqrt(max*max + max*max));
    return diameter/2;
  }

  class Star {
    orbitRadius: number;
    radius: number;
    orbitX: number;
    orbitY: number;
    timePassed: number;
    speed: number;
    alpha: number;

    constructor() {
      this.orbitRadius = random(maxOrbit(w,h));
      this.radius = random(60, this.orbitRadius) / 12;
      this.orbitX = w / 2;
      this.orbitY = h / 2;
      this.timePassed = random(0, maxStars);
      this.speed = random(this.orbitRadius) / 500000;
      this.alpha = random(2, 10) / 10;

      stars.push(this);
    }

    draw(): void {
      const x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
          y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
          twinkle = random(10);

      if (twinkle === 1 && this.alpha > 0) {
        this.alpha -= 0.05;
      } else if (twinkle === 2 && this.alpha < 1) {
        this.alpha += 0.05;
      }

      ctx.globalAlpha = this.alpha;
      ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
      this.timePassed += this.speed;
    }
  }

  for (let i = 0; i < maxStars; i++) {
    new Star();
  }

  let frameCount = 0;

  function animation(): void {
    frameCount++;

    if (frameCount % 4 === 0) {
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 0.8;
      ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 1)';
      ctx.fillRect(0, 0, w, h)

      ctx.globalCompositeOperation = 'lighter';
      for (let i = 1, l = stars.length; i < l; i++) {
        stars[i].draw();
      };
    }

    window.requestAnimationFrame(animation);
  }

  window.addEventListener('resize', function() {
    w = canvas.width = document.documentElement.clientWidth;
    h = canvas.height = document.documentElement.clientHeight;
  });

  animation();
}


function App() {
  useEffect(() => {
    let ignore = false;
    
    if (!ignore)  setupAnimation()
    return () => { ignore = true; }
    },[]);
  return <>
  <canvas id="canvas"></canvas>
  <div className="hero">
  <div className="overlay"></div>
  </div>
  <div className="typedContainer">
      <p className="typed">LOCUTUS</p>
  </div>
  <div className="myButton">
    <a href="#" className="btn btn-lg btn-outline-secondary border-5 opacity-75 rounded-0 display ps-3 pt-2">&gt;START</a>
  </div>
  </>
}
// {/* <div className="container">
//       <ProjectsPage></ProjectsPage>
//    </div> */}

export default App;

// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
