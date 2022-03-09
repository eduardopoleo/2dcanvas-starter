import './style.css'

const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener('resize', function() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  })

  const mouse = {
    x: undefined,
    y: undefined
  }

  window.addEventListener('click', (event) => {
    mouse.x = event.x
    mouse.y = event.y
    // drawCircle()
  })

  window.addEventListener('mousemove', (event) => {
    mouse.x = event.x
    mouse.y = event.y
  })

  class Particle {
    constructor() {
      this.size = Math.random() * 40 + 1
      this.x = this.size + Math.random() * (canvas.width - 2 * this.size)
      this.y = this.size + Math.random() * (canvas.height - 2 * this.size)
      this.speedX = Math.random() * 3 - 1.5
      this.speedY = Math.random() * 3 - 1.5
    }

    update() {
      if (this.x + this.size > canvas.width || this.x - this.size < 0) {
        this.speedX = -this.speedX
      }

      if (this.y + this.size > canvas.height || this.y - this.size < 0) {
        this.speedY = -this.speedY
      }

      this.x += this.speedX
      this.y += this.speedY
    }

    draw() {
      ctx.beginPath()
      ctx.fillStyle = 'red'
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  const particlesArray = []
  function init() {
    for (let i = 0; i < 100; i++ ) {
      particlesArray.push(new Particle())
    }
  }
  init()

  const handleParticles = () => {
    for (let i = 0; i < particlesArray.length; i++) {
      const particle = particlesArray[i]
      particle.update()
      particle.draw()
    }
  }

  const animate = () => {
    ctx.clearRect(0,0, canvas.width, canvas.height)
    handleParticles()
    requestAnimationFrame(animate)
  }

  animate()