
// import { useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Scan = () => {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [countdown, setCountdown] = useState(null);
//   const [capturedImage, setCapturedImage] = useState(null);
//   const navigate = useNavigate();

//   // Start the camera
//   const startCamera = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//       }
//     } catch (err) {
//       console.error("Camera access denied", err);
//     }
//   };

//   // Countdown before capturing the photo
//   const startCountdown = () => {
//     setCountdown(3);
//     let count = 3;
//     const interval = setInterval(() => {
//       count -= 1;
//       setCountdown(count);
//       if (count === 0) {
//         clearInterval(interval);
//         capturePhoto();
//       }
//     }, 1000);
//   };

//   // Capture the photo from the video stream
//   const capturePhoto = () => {
//     const video = videoRef.current;
//     const canvas = canvasRef.current;
//     if (video && canvas) {
//       const context = canvas.getContext("2d");
//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;
//       context.drawImage(video, 0, 0, canvas.width, canvas.height);
//       const imageData = canvas.toDataURL("image/png"); // Convert to base64
//       setCapturedImage(imageData);
//       localStorage.setItem("capturedImage", imageData); // Save image in local storage
//       navigate("/result"); // Navigate back to Result page with image
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-white">
//       <h1 className="text-2xl font-bold">Allow Camera Access</h1>
//       <p className="mb-4">Please allow the camera to scan your face.</p>

//       {!capturedImage ? (
//         <>
//           <video ref={videoRef} autoPlay className="w-80 h-60 border border-gray-400"></video>
//           <button
//             onClick={startCountdown}
//             className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
//           >
//             Capture Photo
//           </button>
//         </>
//       ) : (
//         <img src={capturedImage} alt="Captured" className="w-80 h-60 mt-4 border border-gray-400" />
//       )}

//       {countdown !== null && <p className="text-lg font-semibold mt-2">📸 {countdown}</p>}

//       <canvas ref={canvasRef} className="hidden"></canvas>
//     </div>
//   );
// };

// export default Scan;







import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const ScanPage = () => {
  const [cameraAccess, setCameraAccess] = useState(null);
  const [countdown, setCountdown] = useState(3);
  const [capturedImage, setCapturedImage] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  // ✅ Request Camera Access
  const handleAllow = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraAccess(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      startCountdown();
    } catch (error) {
      console.error("Camera access denied:", error);
      setCameraAccess(false);
    }
  };

  // ❌ Handle Deny Camera Access
  const handleDeny = () => {
    setCameraAccess(false);
  };

  // ⏳ Start Countdown & Capture Image
  const startCountdown = () => {
    let count = 3;
    setCountdown(count);
    const timer = setInterval(() => {
      count -= 1;
      setCountdown(count);
      if (count === 0) {
        clearInterval(timer);
        captureImage();
      }
    }, 1000);
  };

  // 📸 Capture Image from Video Stream
  const captureImage = () => {
    if (!canvasRef.current || !videoRef.current) return;

    const context = canvasRef.current.getContext("2d");
    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);

    const imageData = canvasRef.current.toDataURL("image/png"); // Convert to base64
    setCapturedImage(imageData);

    // 🚀 Navigate to Result Page with Image
    navigate("/result", { state: { image: imageData } });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center">
      <h2 className="text-xl font-semibold">Allow Camera Access</h2>
      <p className="text-gray-600 mt-2">Please allow the camera to scan your face.</p>

      {!cameraAccess && (
        <div className="flex gap-4 mt-6">
          <button
            onClick={handleAllow}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Allow
          </button>
          <button
            onClick={handleDeny}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
          >
            Deny
          </button>
        </div>
      )}

      {cameraAccess && (
        <div className="mt-6">
          {countdown > 0 ? (
            <h3 className="text-2xl font-bold text-red-500">{countdown}</h3> // ⏳ Show countdown
          ) : (
            <h3 className="text-lg text-green-500">Photo Captured!</h3>
          )}

          <video ref={videoRef} autoPlay className="w-64 h-64 rounded-lg shadow-lg mt-4"></video>
          <canvas ref={canvasRef} className="hidden"></canvas>
        </div>
      )}

      {capturedImage && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Captured Image</h3>
          <img src={capturedImage} alt="Captured" className="w-40 h-40 rounded-lg shadow-lg mt-2" />
        </div>
      )}

      {cameraAccess === false && (
        <p className="text-red-500 mt-4">You denied camera access. Please allow to proceed.</p>
      )}
    </div>
  );
};

export default ScanPage;

// import { useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";

// const ScanPage = () => {
//   const [cameraAccess, setCameraAccess] = useState(null);
//   const [countdown, setCountdown] = useState(3);
//   const [capturedImage, setCapturedImage] = useState(null);
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const navigate = useNavigate();

//   // ✅ Request Camera Access
//   const handleAllow = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       setCameraAccess(true);
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//       }
//       startCountdown();
//     } catch (error) {
//       console.error("Camera access denied:", error);
//       setCameraAccess(false);
//     }
//   };

//   // ❌ Handle Deny Camera Access
//   const handleDeny = () => {
//     setCameraAccess(false);
//   };

//   // ⏳ Start Countdown & Capture Image
//   const startCountdown = () => {
//     let count = 3;
//     setCountdown(count);
//     const timer = setInterval(() => {
//       count -= 1;
//       setCountdown(count);
//       if (count === 0) {
//         clearInterval(timer);
//         captureImage();
//       }
//     }, 1000);
//   };

//   // 📸 Capture Image from Video Stream
//   const captureImage = () => {
//     if (!canvasRef.current || !videoRef.current) return;

//     const context = canvasRef.current.getContext("2d");
//     canvasRef.current.width = videoRef.current.videoWidth;
//     canvasRef.current.height = videoRef.current.videoHeight;
//     context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    
//     const imageData = canvasRef.current.toDataURL("image/png");
//     setCapturedImage(imageData);
    
//     // 🚀 Navigate to the next step (replace with actual route)
//     navigate("/process-photo", { state: { image: imageData } });
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center">
//       <h2 className="text-xl font-semibold">Allow Camera Access</h2>
//       <p className="text-gray-600 mt-2">Please allow the camera to scan your face.</p>

//       {!cameraAccess && (
//         <div className="flex gap-4 mt-6">
//           <button
//             onClick={handleAllow}
//             className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
//           >
//             Allow
//           </button>
//           <button
//             onClick={handleDeny}
//             className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
//           >
//             Deny
//           </button>
//         </div>
//       )}

//       {cameraAccess && (
//         <div className="mt-6">
//           {countdown > 0 ? (
//             <h3 className="text-2xl font-bold text-red-500">{countdown}</h3> // ⏳ Show countdown
//           ) : (
//             <h3 className="text-lg text-green-500">Photo Captured!</h3>
//           )}

//           <video ref={videoRef} autoPlay className="w-64 h-64 rounded-lg shadow-lg mt-4"></video>
//           <canvas ref={canvasRef} className="hidden"></canvas>
//         </div>
//       )}

//       {capturedImage && (
//         <div className="mt-6">
//           <h3 className="text-lg font-semibold">Captured Image</h3>
//           <img src={capturedImage} alt="Captured" className="w-40 h-40 rounded-lg shadow-lg mt-2" />
//         </div>
//       )}

//       {cameraAccess === false && (
//         <p className="text-red-500 mt-4">You denied camera access. Please allow to proceed.</p>
//       )}
//     </div>
//   );
// };

// export default ScanPage;










// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const ScanPage = () => {
//   const [cameraAccess, setCameraAccess] = useState(null);
//   const navigate = useNavigate();

//   // ✅ Handle Allow Camera Access
//   const handleAllow = async () => {
//     try {
//       await navigator.mediaDevices.getUserMedia({ video: true }); // Request camera access
//       setCameraAccess(true);
//       navigate("/scan-start"); // 🚀 Redirects to next step (replace with the correct route)
//     } catch (error) {
//       console.error("Camera access denied:", error);
//       setCameraAccess(false);
//     }
//   };

//   // ❌ Handle Deny Camera Access
//   const handleDeny = () => {
//     setCameraAccess(false);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center">
//       <h2 className="text-xl font-semibold">Allow Camera Access</h2>
//       <p className="text-gray-600 mt-2">Please allow the camera to scan your face.</p>

//       <div className="flex gap-4 mt-6">
//         <button
//           onClick={handleAllow}
//           className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
//         >
//           Allow
//         </button>
//         <button
//           onClick={handleDeny}
//           className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
//         >
//           Deny
//         </button>
//       </div>

//       {cameraAccess === false && (
//         <p className="text-red-500 mt-4">You denied camera access. Please allow to proceed.</p>
//       )}
//     </div>
//   );
// };

// export default ScanPage;
