import "./style.css";
import * as THREE from "three";

//1) La ESCENA es el contenedor de todo
const scene = new THREE.Scene();

/* 2) Camara. 
3)Primer argumento: Field of view=75, Segundo argumento: Aspect ratio (users browser window), 
Tercer argumento: View frustrum =controlar que objetos son visibles relativos a la camara */

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//4) Renderer hace la magia. El renderer tiene que saber que elementos usar del DOM, el cual sera el canvas con el id de bg
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

//5) Setear todo segun la pantalla
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

//AHORA A CREAR EL OBJETO

// 1: Geometria = los puntos {x, y, z} que generan la forma
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);

//2: Material del q estara hecho. Con StandardMaterial la luz rebotara en la textura
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });

//3: Mesh = geometry + material. (torus = toroide)
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(lightHelper);

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  renderer.render(scene, camera);
}

animate();
