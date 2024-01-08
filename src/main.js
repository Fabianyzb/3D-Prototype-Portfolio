import "./style.css";
import * as THREE from "three";

//1) La ESCENA es el contenedor de todo
const scene = new THREE.Scene();

/* 2) Camara. 
3)Primer argumento: Field of view=75, Segundo argumento: Aspect ratio (users browser window), 
Tercer argumento: View frustrum =controlar que objetos son visibles relativos a la camara */

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//4)Renderer hace la magia. El renderer tiene que saber que elementos usar del DOM, el cual sera el canvas con el id de bg
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});
