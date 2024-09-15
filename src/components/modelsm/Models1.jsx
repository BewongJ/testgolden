import React, { useMemo, useState, Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  useProgress,
  SpotLight,
} from "@react-three/drei";
import { TextureLoader } from "three";
import Loading from "../layouts/Loading";

// กำหนดรายการโมเดลที่จะแสดงผลและสีที่ตรงกัน
const models = [
  "./golden/babyblue.glb",
  "./golden/almond.glb",
  "./golden/babypink.glb",
];
const colors = ["#89cff0", "#EED9C4", "#F4C2C2"];

// Preload โมเดล
models.forEach((model) => {
  useGLTF.preload(model);
});

// Component สำหรับแสดงผลโมเดล
const Model = ({ modelPath }) => {
  const { scene } = useGLTF(modelPath);
  const modelRef = useRef();

  // ทำให้โมเดลหมุนอย่างต่อเนื่อง
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.003;
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={0.15}
      position={[0, 2, -5]}
    />
  );
};

// Component หลักสำหรับแสดงผลโมเดลและการควบคุม
const Models1 = () => {
  const [currentModel, setCurrentModel] = useState(models[0]);

  // โหลดพื้นผิวของผนัง
  const wallTexture = useMemo(
    () => new TextureLoader().load("textures/1.png"),
    []
  );

  // โหลดพื้นผิวของปุ่ม
  const buttonTexture = useMemo(
    () => new TextureLoader().load("textures/SHOP_NOW_1.png"),
    []
  );

  // ฟังก์ชันสำหรับเปลี่ยนโมเดล
  const changeModel = (model) => {
    setCurrentModel(model);
  };

  // ฟังก์ชันสำหรับการคลิกปุ่ม
  const handleButtonClick = () => {
    window.location.href = "https://s.shopee.co.th/6fO0mhr0ra";
  };

  const { active } = useProgress();

  return (
    <div className="h-screen bg-black flex flex-col justify-center items-center">
      <div className="relative w-full h-full">
        {active && <Loading />}
        <Canvas camera={{ position: [0, 1.9, 10], fov: 60 }}>
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            zoomSpeed={0.8}
            rotateSpeed={0.7}
            enableDamping={true}
            dampingFactor={0.25}
            minDistance={0.5}
            maxDistance={30}
            target={[0, 1.9, 0]}
          />

          <ambientLight intensity={4} />
          <directionalLight intensity={4} position={[-5, 0, 0]} />
          <directionalLight intensity={4} position={[5, 0, 0]} />
          <directionalLight intensity={4} position={[0, 5, 0]} />
          <directionalLight intensity={4} position={[0, 1, 10]} />
          <directionalLight intensity={4} position={[0, -5, -10]} />

          {/* พื้นสีดำที่พื้น */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, -5]}>
            <planeGeometry args={[15, 15]} />
            <meshStandardMaterial color="black" />
          </mesh>

          {/* พื้นผิวผนัง */}
          <mesh position={[0, 3.5, -12.5]}>
            <planeGeometry args={[15, 10]} />
            <meshStandardMaterial map={wallTexture} />
          </mesh>

          {/* กล่องสีดำ */}
          <mesh position={[0, 0.1, -5]}>
            <boxGeometry args={[3, 3.5, 3]} />
            <meshStandardMaterial color="black" />
          </mesh>

          {/* ปุ่มที่มีภาพ */}
          <mesh
            position={[0, 1, -3.4]}
            onClick={handleButtonClick} // จัดการการคลิกปุ่ม
            className="cursor-pointer"
            scale={[1, 1, 1]} // ขนาดเริ่มต้น
            onPointerOver={(e) => e.object.scale.set(1.1, 1.1, 1.1)} // ขยายเมื่อชี้เมาส์
            onPointerOut={(e) => e.object.scale.set(1, 1, 1)} // กลับขนาดปกติเมื่อไม่ชี้เมาส์
            onPointerDown={(e) => e.object.scale.set(0.9, 0.9, 0.9)} // ย่อขนาดเมื่อคลิก
            onPointerUp={(e) => e.object.scale.set(1.1, 1.1, 1.1)} // ขยายอีกครั้งหลังจากคลิก
          >
            <planeGeometry args={[2,0.5]} />
            <meshStandardMaterial map={buttonTexture} />
          </mesh>

          {/* SpotLight */}
          <SpotLight
            position={[0, 10, -5]}
            angle={30}
            penumbra={2}
            intensity={100}
            distance={450}
            castShadow
            target-position={[0, 2, -5]}
          />

          <Suspense fallback={null}>
            <Model modelPath={currentModel} />
          </Suspense>
        </Canvas>

        {/* ปุ่มเปลี่ยนโมเดลที่อยู่ด้านล่าง */}
        <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 flex space-x-4">
          {models.map((model, index) => (
            <button
              key={index}
              onClick={() => changeModel(model)}
              className="w-14 h-14 rounded-full text-xl transition-transform duration-300 transform hover:scale-110 active:scale-90 shadow-lg"
              style={{ backgroundColor: colors[index] }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Models1;
