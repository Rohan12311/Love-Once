import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ParametricGeometry } from 'three/examples/jsm/geometries/ParametricGeometry';
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler';

const MyHeart = () => {
  const mountRef = useRef(null);

  // Function to get a unique random number
  function getUniqueRandomNumber(min = 1, max = 32, usedNumbers = []) {
    let randomNum;

    do {
      randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (usedNumbers.includes(randomNum)); // Re-generate if number is already used

    usedNumbers.push(randomNum); // Store the used number
    return { randomNum, usedNumbers }; // Return the number and the updated used numbers array
  }

  useEffect(() => {
    let scene, camera, renderer, controls;
    let usedNumbers = []; // Track used numbers

    // Sizes
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    function heart(u, v, target) {
      u = u * Math.PI * 2;
      v = v * Math.PI;

      const x = (4 * Math.sin(u) - Math.sin(3 * u)) * Math.sin(v);
      const y = 2 * Math.cos(v);
      const z =
        1.2 *
        (4 * Math.cos(u) - Math.cos(2 * u) - Math.cos(3 * u) / 2) *
        Math.sin(v);

      target.set(x, y, z);
    }

    const init = () => {
      // Scene
      scene = new THREE.Scene();
      scene.background = new THREE.Color('#ab3f60');
      // Camera
      camera = new THREE.PerspectiveCamera(
        35,
        sizes.width / sizes.height,
        0.1,
        100
      );
      camera.position.set(0, 0, 5);

      // Renderer
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      mountRef.current.appendChild(renderer.domElement);

      // Lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(5, 5, 5);
      scene.add(directionalLight);

      // OrbitControls
      controls = new OrbitControls(camera, renderer.domElement);
      controls.autoRotate = true;
      controls.enableDamping = true;
      controls.target.set(0, 0, 0);
    };

    const createHeart = () => {
      const geometry = new ParametricGeometry(heart, 50, 20);
      geometry.rotateX(-Math.PI / 2);
      geometry.scale(0.2, 0.2, 0.2);
      geometry.center();

      const material = new THREE.MeshLambertMaterial({
        flatShading: true,
        wireframe: true,
        color: '#bd1136',
        side: THREE.DoubleSide,
      });

      const heartMesh = new THREE.Mesh(geometry, material);
      scene.add(heartMesh);

      // Surface Sampling
      createSurfaceSamples(heartMesh);
    };

    const createSurfaceSamples = (mesh) => {
      const numSamples = 20; // Adjust as needed

      // Texture loader to load images
      const textureLoader = new THREE.TextureLoader();

      const textures = [];
      for (let i = 0; i < numSamples; i++) {
        const { randomNum, usedNumbers: updatedUsedNumbers } = getUniqueRandomNumber(1, 32, usedNumbers);
        const texturePath = `/Images/photo${randomNum}.jpg`; // Dynamically use unique photo paths
        const texture = textureLoader.load(texturePath);
        textures.push(texture);
        usedNumbers = updatedUsedNumbers; // Update the used numbers array
      }

      const samplerGeometry = new THREE.PlaneGeometry(0.17, 0.17); // Plane for images
      const sampler = new MeshSurfaceSampler(mesh).build();

      const dummy = new THREE.Object3D();
      const position = new THREE.Vector3();
      const normal = new THREE.Vector3();

      for (let i = 0; i < numSamples; i++) {
        const material = new THREE.MeshBasicMaterial({
          map: textures[i], // Use the texture from the list
          side: THREE.DoubleSide,
          transparent: true, // Allow transparency
          opacity: 1,        // Ensure the alpha channel is respected
        });

        const planeMesh = new THREE.Mesh(samplerGeometry, material);

        sampler.sample(position, normal);
        normal.add(position);
        planeMesh.position.copy(position);
        planeMesh.lookAt(normal);
        planeMesh.updateMatrix();

        scene.add(planeMesh);
      }
    };

    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    const onWindowResize = () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
    };

    init();
    createHeart();
    animate();

    window.addEventListener('resize', onWindowResize);

    return () => {
      // Cleanup
      window.removeEventListener('resize', onWindowResize);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />;
};

export default MyHeart;
