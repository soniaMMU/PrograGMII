// Escena, cámara y renderizador
const escena = new THREE.Scene();
const camara = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderizador = new THREE.WebGLRenderer();
renderizador.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderizador.domElement);

// Crear un cilindro
const geometría = new THREE.CylinderGeometry(1, 1, 4, 32); // Radio superior, radio inferior, altura, segmentos

// Cargar la textura
const loader = new THREE.TextureLoader();
loader.load('/textura.jpg', function (textura) {//agarra una imagen en jpg para tomarlo como textura
    const material = new THREE.MeshStandardMaterial({ map: textura });

    // Crear el cilindro y añadirlo a la escena
    const cilindro = new THREE.Mesh(geometría, material);
    escena.add(cilindro);

    // Animación del cilindro
    function animacion() {
        requestAnimationFrame(animacion);
        cilindro.rotation.x += 0.01;
        cilindro.rotation.y += 0.01;
        renderizador.render(escena, camara);
    }

    animacion();
});

// Posicionar la cámara
camara.position.z = 5;

// Ajustar el tamaño de la ventana al cambiar su tamaño
window.addEventListener('resize', () => {
    camara.aspect = window.innerWidth / window.innerHeight;
    camara.updateProjectionMatrix();
    renderizador.setSize(window.innerWidth, window.innerHeight);
});

// Añadir una luz para que la textura se vea correctamente
const luz = new THREE.DirectionalLight(0xffffff, 1);
luz.position.set(5, 5, 5).normalize();
escena.add(luz);