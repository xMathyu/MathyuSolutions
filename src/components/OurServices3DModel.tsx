"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

export default function OurServices3DModel() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Configuración de la escena
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(150, 150);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Configuración de la cámara
    camera.position.z = 5;
    camera.position.y = 2;

    // Añadir controles de órbita
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Configuración de la iluminación
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Cargar el modelo GLTF
    const loader = new GLTFLoader();
    let model: THREE.Group;

    loader.load(
      "/models/ourServices/scene.gltf",
      (gltf: GLTF) => {
        model = gltf.scene;
        scene.add(model);

        // Calcular el bounding box del modelo
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        // Calcular la distancia necesaria para que el modelo quepa en la vista
        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = camera.fov * (Math.PI / 180);
        let cameraZ = Math.abs(maxDim / Math.tan(fov / 2));

        // Ajustar la posición de la cámara
        camera.position.z = cameraZ * 0.7;
        camera.position.y = size.y * 0.5;
        camera.lookAt(center);

        // Posicionar el modelo
        model.position.y = -size.y * 0.05;
        model.position.x = -center.x;
        model.position.z = -center.z;

        // Actualizar los controles
        controls.target.copy(center);
        controls.update();
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% cargado");
      },
      (error: unknown) => {
        console.error("Error al cargar el modelo:", error);
        // Añadir un mensaje de error visual
        const errorDiv = document.createElement("div");
        errorDiv.style.color = "red";
        errorDiv.textContent = "Error al cargar el modelo 3D";
        mountRef.current?.appendChild(errorDiv);
      }
    );

    // Función de animación
    const animate = () => {
      requestAnimationFrame(animate);
      if (model) {
        model.rotation.y += 0.005; // Rotación suave
      }
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Limpieza
    return () => {
      mountRef.current?.removeChild(renderer.domElement);
      if (model) {
        model.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            object.geometry.dispose();
            if (Array.isArray(object.material)) {
              object.material.forEach((material) => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        });
      }
    };
  }, []);

  return <div ref={mountRef} className="inline-block" />;
}
