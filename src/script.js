import './style.css'
import * as THREE from 'three'
import * as debug from 'lil-gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// SET UP
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// SCENE, CAMERA 
const scene = new THREE.Scene()
const canvas = document.querySelector('canvas.webgl')
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 2000)
camera.position.z = 5
scene.add(camera)

// CONTROLS
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
const debugUI = new debug.GUI()

// GEOMETRIES
const material = new THREE.MeshStandardMaterial()

// SPHERE
const sphereGeometry = new THREE.SphereGeometry(0.6)
const sphere = new THREE.Mesh(sphereGeometry, material)
sphere.position.x = -2
scene.add(sphere)

// BOX
const boxGeometry = new THREE.BoxGeometry(1,1,1)
const box = new THREE.Mesh(boxGeometry, material)
debugUI.add(box.position, 'x').name('box x').min(-10).max(10)
scene.add(box)

// TORUS
const torusGeometry = new THREE.TorusGeometry(0.5, 0.1, 16, 100)
const torus = new THREE.Mesh(torusGeometry, material)
torus.position.x = 2
scene.add(torus)

// FLOOR
const floorGeometry = new THREE.BoxGeometry(8,6,0.1)
const floor = new THREE.Mesh(floorGeometry, material)
floor.position.y = -1
floor.rotation.x = Math.PI / 2
scene.add(floor)

// LIGHTS
const light = new THREE.PointLight(0xffffff, 1, 100)
light.position.set(5, 5, 5)
scene.add(light)

const pointLightHelper = new THREE.PointLightHelper(light, 1)
scene.add(pointLightHelper)
window.requestAnimationFrame(() => {
    SpotLightHelper.update()
})

// RESIZE listener
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    
    camera.aspect = sizes.width / sizes.height
    // must be call after any change of the parameters
    // otherwise things like resizing will distort the images
    camera.updateProjectionMatrix()
    
    renderer.setSize(sizes.width, sizes.height)
    //  to prevent blurring out cameras output
})

// RENDERING
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const rotate = (mesh, speed) => {
    mesh.rotation.x = speed
    mesh.rotation.y = speed
}

const clock  = new THREE.Clock()

const animate = () => {
    renderer.render(scene, camera)
    const rotationSpeed = clock.getElapsedTime() * 0.4
    rotate(box, rotationSpeed)
    rotate(sphere, rotationSpeed)
    rotate(torus, rotationSpeed)

    window.requestAnimationFrame(animate)
    controls.update()
}

animate()