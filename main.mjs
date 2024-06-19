import "/style.css";
import * as THREE from "three/build/three.module.js";

//OrbitControls es para usar el mouse en el 3D
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

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

//Ayudante de luz con un wireframe
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

/* Instanciamos el OrbitControl/ renderer.domElement es el argumento para la camara. Con esto escuchamos los eventos del dom con el mouse y actualizamos la posicion de la camara */
const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  //constante para generar posiciones random para cada star
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

//Ahora cuantas estrellas anadimos a la escena con un array
Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load("/img/space.jpg");
scene.background = spaceTexture;

//Avatar
const perfilTexture = new THREE.TextureLoader().load("/img/perfil.jpg");

const perfil = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: perfilTexture }));

scene.add(perfil);

//Moon

const moonTexture = new THREE.TextureLoader().load("/img/moon.jpg");
const normalTexture = new THREE.TextureLoader().load("/img/normal.jpg");

const moon = new THREE.Mesh(new THREE.SphereGeometry(3, 32, 32), new THREE.MeshStandardMaterial({ map: moonTexture, normalMap: normalTexture }));

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

function moveCamera() {
  //ahora calcular a donde hizo scroll el usuario
  // t = top
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  perfil.rotation.y += 0.01;
  perfil.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}

//esto hara que la camara se mueva cuando se hace scroll
document.body.onscroll = moveCamera;

//Con animate se le da vida a todo
function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

animate();
