import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const FloatingCoin = ({ className = '', size = 200, color = '#00d4ff' }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = size;
    const height = size;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x00d4ff, 2.5);
    dirLight1.position.set(5, 3, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x8b5cf6, 2.5);
    dirLight2.position.set(-5, -3, 5);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xffffff, 1.5, 100);
    pointLight.position.set(0, 0, 3);
    scene.add(pointLight);

    // Group to hold coin elements
    const coinGroup = new THREE.Group();
    scene.add(coinGroup);

    // Coin geometry (cylinder for thin coin)
    const coinGeo = new THREE.CylinderGeometry(1.6, 1.6, 0.15, 32, 1);
    
    // Coin material
    const coinColor = new THREE.Color(color);
    const coinMat = new THREE.MeshStandardMaterial({
      color: coinColor,
      metalness: 0.9,
      roughness: 0.15,
      emissive: coinColor,
      emissiveIntensity: 0.1,
    });

    const coin = new THREE.Mesh(coinGeo, coinMat);
    // Rotate so faces are visible
    coin.rotation.x = Math.PI / 2;
    coinGroup.add(coin);

    // Inner detail (Torus ring on both sides for coin rim)
    const torusGeo = new THREE.TorusGeometry(1.4, 0.08, 16, 64);
    const torusMat = new THREE.MeshStandardMaterial({
      color: coinColor,
      metalness: 0.95,
      roughness: 0.1,
    });
    
    const rim1 = new THREE.Mesh(torusGeo, torusMat);
    rim1.position.z = 0.08;
    coinGroup.add(rim1);

    const rim2 = new THREE.Mesh(torusGeo, torusMat);
    rim2.position.z = -0.08;
    coinGroup.add(rim2);

    // Floating animation variables
    let animationFrameId;
    let time = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      time += 0.012;

      // Rotate coin
      coinGroup.rotation.y = time * 1.5;
      
      // Floating movement (sin wave)
      coinGroup.position.y = Math.sin(time * 2) * 0.15;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement && containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      coinGeo.dispose();
      coinMat.dispose();
      torusGeo.dispose();
      torusMat.dispose();
      renderer.dispose();
    };
  }, [size, color]);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    />
  );
};

export default FloatingCoin;
