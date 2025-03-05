import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderIntroduction from "../components/HeaderIntroduction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvira } from "@fortawesome/free-solid-svg-icons";


const API_URL = "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo";

const Result = () => {
  const [imageData, setImageData] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      alert("Data submitted successfully!");
    }, 500);
  }, []);

  // ✅ Handle Image Upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (!file) {
      console.error("❌ No file selected.");
      setError("No file selected. Please try again.");
      return;
    }

    console.log("📸 Selected file:", file);

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.split(",")[1];
      if (base64String) {
        setImageData(base64String);
        setPreviewImage(reader.result);
        setError("");
        console.log("✅ Base64 Image Data:", base64String.substring(0, 50));
      } else {
        console.error("❌ Failed to convert image to Base64.");
        setError("Failed to process image. Please try again.");
      }
    };
    reader.onerror = () => {
      console.error("❌ FileReader error while reading file.");
      setError("Error reading file. Please try another image.");
    };

    reader.readAsDataURL(file);
  };

  // ✅ Handle Image Submission to API
  const handleProcess = async () => {
    if (!imageData) {
      setError("Please upload an image first.");
      console.error("❌ No image data found.");
      return;
    }

    setLoading(true);
    setError("");

    const requestData = { image: imageData };

    console.log("📤 Sending request to API:", API_URL);
    console.log("📝 Request Payload:", JSON.stringify(requestData, null, 2));

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();
      console.log("✅ API Response:", result);

      if (!response.ok || !result.data) {
        throw new Error(result.message || "Invalid response from API");
      }

      localStorage.setItem("aiAnalysis", JSON.stringify(result.data));
      navigate("/select"); // Redirect to select page
    } catch (err) {
      console.error("❌ API Error:", err);
      setError("Failed to process image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-white px-6 md:px-16 py-20 overflow-hidden">
      <HeaderIntroduction />

      {/* Background Dotted Border Animation */}
      <motion.div
        className="absolute w-[400px] h-[400px] border border-dotted border-gray-400 rotate-45"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] border border-dotted border-gray-400 rotate-45"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, rotate: -360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute w-[600px] h-[600px] border border-dotted border-gray-400 rotate-45"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      {/* AI Scan & Gallery Upload Section */}
      <div className="flex gap-20 mt-20">
        {/* Left - Camera Scan (Fixed Icon) */}
        <div className="relative flex flex-col items-center justify-center">
          <motion.div
            className="w-[300px] h-[300px] border border-gray-800 rotate-45 flex items-center justify-center"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          >
            <motion.div
              className="w-[250px] h-[250px] border border-gray-600 rotate-45 flex items-center justify-center"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2 }}
            >
              <motion.div
                className="w-[200px] h-[200px] border border-gray-400 rotate-45 flex items-center justify-center"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5 }}
              >
                {/* ✅ Camera Icon Fixed */}
                
               


              </motion.div>
            </motion.div>
          </motion.div>
          <p className="mt-4 text-center text-sm font-semibold">
            ALLOW A.I. <br /> TO SCAN YOUR FACE
          </p>
        </div>

        {/* Right - Gallery Upload (Unchanged) */}
        <div className="relative flex flex-col items-center justify-center">
          <motion.div
            className="w-[300px] h-[300px] border border-gray-800 rotate-45 flex items-center justify-center"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1  }}
          >
            <label className="cursor-pointer flex flex-col items-center">
              <img src="/icons/gallery.svg" alt="Gallery Icon" className="w-10 h-10" />
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              <p className="mt-4 text-center text-sm font-semibold">
                ALLOW A.I. <br /> ACCESS GALLERY
              </p>
            </label>
          </motion.div>
        </div>
      </div>

      {/* Image Preview */}
      {previewImage && (
        <div className="mt-6">
          <img src={previewImage} alt="Uploaded Preview" className="w-40 h-40 rounded-lg shadow-lg" />
        </div>
      )}

      {/* Process Button */}
      <button onClick={handleProcess} disabled={loading} className="absolute bottom-10 right-10 text-black flex items-center space-x-2">
        <div className="border border-black p-2 flex items-center">
          {loading ? <span className="mr-2">PROCESSING...</span> : <span className="mr-2">PROCESS</span>} ▶
        </div>
      </button>

      {/* Error Message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default Result;

























// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import HeaderIntroduction from "../components/HeaderIntroduction";

// const API_URL = "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo";

// const Result = () => {
//   const [imageData, setImageData] = useState(null);
//   const [previewImage, setPreviewImage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     setTimeout(() => {
//       alert("Data submitted successfully!");
//     }, 500);
//   }, []);

//   // ✅ Handle Image Upload
//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];

//     if (!file) {
//       console.error("❌ No file selected.");
//       setError("No file selected. Please try again.");
//       return;
//     }

//     console.log("📸 Selected file:", file);

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       const base64String = reader.result.split(",")[1]; // Extract Base64 data only
//       if (base64String) {
//         setImageData(base64String);
//         setPreviewImage(reader.result); // Show image preview
//         setError(""); // Clear error if image uploaded
//         console.log("✅ Base64 Image Data:", base64String.substring(0, 50)); // Debugging log
//       } else {
//         console.error("❌ Failed to convert image to Base64.");
//         setError("Failed to process image. Please try again.");
//       }
//     };
//     reader.onerror = () => {
//       console.error("❌ FileReader error while reading file.");
//       setError("Error reading file. Please try another image.");
//     };

//     reader.readAsDataURL(file);
//   };

//   // ✅ Handle Image Submission to API
//   const handleProcess = async () => {
//     if (!imageData) {
//       setError("Please upload an image first.");
//       console.error("❌ No image data found.");
//       return;
//     }
  
//     setLoading(true);
//     setError("");
  
//     const requestData = { image: imageData };
  
//     console.log("📤 Sending request to API:", API_URL);
//     console.log("📝 Request Payload:", JSON.stringify(requestData, null, 2));
  
//     try {
//       const response = await fetch(API_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(requestData),
//       });
  
//       const result = await response.json();
//       console.log("✅ API Response:", result);
  
//       if (!response.ok || !result.data) {
//         throw new Error(result.message || "Invalid response from API");
//       }
  
//       localStorage.setItem("aiAnalysis", JSON.stringify(result.data));
//       navigate("/select"); // Redirect to select page
//     } catch (err) {
//       console.error("❌ API Error:", err);
//       setError("Failed to process image. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="relative flex flex-col items-center justify-center min-h-screen bg-white px-6 md:px-16 py-20 overflow-hidden">
//       <HeaderIntroduction />

//       {/* Background Dotted Border Animation */}
//       <motion.div
//         className="absolute w-[400px] h-[400px] border border-dotted border-gray-400 rotate-45"
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1, rotate: 360 }}
//         transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
//       />
//       <motion.div
//         className="absolute w-[500px] h-[500px] border border-dotted border-gray-400 rotate-45"
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1, rotate: -360 }}
//         transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
//       />
//       <motion.div
//         className="absolute w-[600px] h-[600px] border border-dotted border-gray-400 rotate-45"
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1, rotate: 360 }}
//         transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
//       />

//       {/* AI Scan & Gallery Upload Section */}
//       <div className="flex gap-20 mt-20">
//         {/* Left - Camera Scan */}
//         <div className="relative flex flex-col items-center justify-center">
//           <motion.div
//             className="w-[300px] h-[300px] border border-gray-800 rotate-45 flex items-center justify-center"
//             initial={{ scale: 0.9 }}
//             animate={{ scale: 1, rotate:360 }}
//             transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//           >
//             <motion.div
//               className="w-[250px] h-[250px] border border-gray-600 rotate-45 flex items-center justify-center"
//               initial={{ scale: 0.9 }}
//               animate={{ scale: 1 }}
//               transition={{ duration: 1.2 }}
//             >
//               <motion.div
//                 className="w-[200px] h-[200px] border border-gray-400 rotate-45 flex items-center justify-center"
//                 initial={{ scale: 0.9 }}
//                 animate={{ scale: 1 }}
//                 transition={{ duration: 1.5 }}
//               >
//                 <img src="/icons/camera.svg" alt="Camera Icon" className="w-10 h-10" />
//               </motion.div>
//             </motion.div>
//           </motion.div>
//           <p className="mt-4 text-center text-sm font-semibold">
//             ALLOW A.I. <br /> TO SCAN YOUR FACE
//           </p>
//         </div>

//         {/* Right - Gallery Upload */}
//         <div className="relative flex flex-col items-center justify-center">
//           <motion.div
//             className="w-[300px] h-[300px] border border-gray-800 rotate-45 flex items-center justify-center"
//             initial={{ scale: 0.9 }}
//             animate={{ scale: 1 }}
//             transition={{ duration: 1 }}
//           >
//             <label className="cursor-pointer flex flex-col items-center">
//               <img src="/icons/gallery.svg" alt="Gallery Icon" className="w-10 h-10" />
//               <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
//               <p className="mt-4 text-center text-sm font-semibold">
//                 ALLOW A.I. <br /> ACCESS GALLERY
//               </p>
//             </label>
//           </motion.div>
//         </div>
//       </div>

//       {/* Image Preview */}
//       {previewImage && (
//         <div className="mt-6">
//           <img src={previewImage} alt="Uploaded Preview" className="w-40 h-40 rounded-lg shadow-lg" />
//         </div>
//       )}

//       {/* Process Button */}
//       <button onClick={handleProcess} disabled={loading} className="absolute bottom-10 right-10 text-black flex items-center space-x-2">
//         <div className="border border-black p-2 flex items-center">
//           {loading ? <span className="mr-2">PROCESSING...</span> : <span className="mr-2">PROCESS</span>} ▶
//         </div>
//       </button>

//       {/* Error Message */}
//       {error && <p className="text-red-500 mt-4">{error}</p>}
//     </div>
//   );
// };

// export default Result;


































// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import HeaderIntroduction from "../components/HeaderIntroduction";

// const API_URL = "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo";

// const Result = () => {
//   const [imageData, setImageData] = useState(null);
//   const [previewImage, setPreviewImage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     setTimeout(() => {
//       alert("Data submitted successfully!");
//     }, 500);
//   }, []);

//   // ✅ Handle Image Upload
//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];

//     if (!file) {
//       console.error("❌ No file selected.");
//       setError("No file selected. Please try again.");
//       return;
//     }

//     console.log("📸 Selected file:", file);

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       const base64String = reader.result.split(",")[1]; // Extract only Base64 data
//       if (base64String) {
//         setImageData(base64String);
//         setPreviewImage(reader.result); // Show image preview
//         setError(""); // Clear error if image uploaded
//         console.log("✅ Base64 Image Data:", base64String.substring(0, 50)); // Debugging log
//       } else {
//         console.error("❌ Failed to convert image to Base64.");
//         setError("Failed to process image. Please try again.");
//       }
//     };
//     reader.onerror = () => {
//       console.error("❌ FileReader error while reading file.");
//       setError("Error reading file. Please try another image.");
//     };

//     reader.readAsDataURL(file);
//   };

//   // ✅ Handle Image Submission to API
//   const handleProcess = async () => {
//     if (!imageData) {
//       setError("Please upload an image first.");
//       console.error("❌ No image data found.");
//       return;
//     }
  
//     setLoading(true);
//     setError("");
  
//     const requestData = { Image: `data:image/jpeg;base64,${imageData}` }; // Ensure proper format
  
//     console.log("📤 Sending request to API:", API_URL);
//     console.log("📝 Request Payload:", requestData);
  
//     try {
//       const response = await fetch(API_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(requestData),
//       });
  
//       const result = await response.json();
//       console.log("✅ API Response:", result);
  
//       if (!response.ok || !result.data) {
//         throw new Error(result.message || "Invalid response from API");
//       }
  
//       localStorage.setItem("aiAnalysis", JSON.stringify(result.data));
//       navigate("/select"); // Redirect to select page
//     } catch (err) {
//       console.error("❌ API Error:", err);
//       setError("Failed to process image. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   return (
//     <div className="relative flex flex-col items-center justify-center min-h-screen bg-white px-6 md:px-16 py-20 overflow-hidden">
//       <HeaderIntroduction />

//       {/* Background Dotted Border Animation */}
//       <motion.div
//         className="absolute w-[400px] h-[400px] border border-dotted border-gray-400 rotate-45"
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1, rotate: 360 }}
//         transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
//       />
//       <motion.div
//         className="absolute w-[500px] h-[500px] border border-dotted border-gray-400 rotate-45"
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1, rotate: -360 }}
//         transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
//       />
//       <motion.div
//         className="absolute w-[600px] h-[600px] border border-dotted border-gray-400 rotate-45"
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1, rotate: 360 }}
//         transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
//       />

//       {/* AI Scan & Gallery Upload Section */}
//       <div className="flex gap-20 mt-20">
//         {/* Left - Camera Scan */}
//         <div className="relative flex flex-col items-center justify-center">
//           <motion.div
//             className="w-[300px] h-[300px] border border-gray-800 rotate-45 flex items-center justify-center"
//             initial={{ scale: 0.9 }}
//             animate={{ scale: 1 }}
//             transition={{ duration: 1 }}
//           >
//             <motion.div
//               className="w-[250px] h-[250px] border border-gray-600 rotate-45 flex items-center justify-center"
//               initial={{ scale: 0.9 }}
//               animate={{ scale: 1 }}
//               transition={{ duration: 1.2 }}
//             >
//               <motion.div
//                 className="w-[200px] h-[200px] border border-gray-400 rotate-45 flex items-center justify-center"
//                 initial={{ scale: 0.9 }}
//                 animate={{ scale: 1 }}
//                 transition={{ duration: 1.5 }}
//               >
//                 <img src="/icons/camera.svg" alt="Camera Icon" className="w-10 h-10" />
//               </motion.div>
//             </motion.div>
//           </motion.div>
//           <p className="mt-4 text-center text-sm font-semibold">
//             ALLOW A.I. <br /> TO SCAN YOUR FACE
//           </p>
//         </div>

//         {/* Right - Gallery Upload */}
//         <div className="relative flex flex-col items-center justify-center">
//           <motion.div
//             className="w-[300px] h-[300px] border border-gray-800 rotate-45 flex items-center justify-center"
//             initial={{ scale: 0.9 }}
//             animate={{ scale: 1 }}
//             transition={{ duration: 1 }}
//           >
//             <label className="cursor-pointer flex flex-col items-center">
//               <img src="/icons/gallery.svg" alt="Gallery Icon" className="w-10 h-10" />
//               <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
//               <p className="mt-4 text-center text-sm font-semibold">
//                 ALLOW A.I. <br /> ACCESS GALLERY
//               </p>
//             </label>
//           </motion.div>
//         </div>
//       </div>

//       {/* Image Preview */}
//       {previewImage && (
//         <div className="mt-6">
//           <img src={previewImage} alt="Uploaded Preview" className="w-40 h-40 rounded-lg shadow-lg" />
//         </div>
//       )}

//       {/* Process Button */}
//       <button onClick={handleProcess} disabled={loading} className="absolute bottom-10 right-10 text-black flex items-center space-x-2">
//         <div className="border border-black p-2 flex items-center">
//           {loading ? <span className="mr-2">PROCESSING...</span> : <span className="mr-2">PROCESS</span>} ▶
//         </div>
//       </button>

//       {/* Back Button */}
//       <button
//         onClick={() => navigate("/introduction")}
//         className="absolute bottom-10 left-10 text-black flex items-center space-x-2"
//       >
//         <div className="border border-black p-2 flex items-center">
//           ◀ <span className="ml-2">BACK</span>
//         </div>
//       </button>

//       {/* Error Message */}
//       {error && <p className="text-red-500 mt-4">{error}</p>}
//     </div>
//   );
// };

// export default Result;



























// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import HeaderIntroduction from "../components/HeaderIntroduction";

// const Result = () => {
//   const [imageData, setImageData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     setTimeout(() => {
//       alert("Data submitted successfully!");
//     }, 500);
//   }, []);

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onloadend = () => {
//         setImageData(reader.result.split(",")[1]); // Extract Base64 data
//       };
//     }
//   };

//   const handleProcess = async () => {
//     if (!imageData) {
//       setError("Please upload an image first.");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       const response = await fetch(
//         "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ Image: imageData }),
//         }
//       );

//       const result = await response.json();
//       console.log("API Response:", result);

//       if (!response.ok || !result.data) {
//         throw new Error(result.message || "Invalid response from API");
//       }

//       localStorage.setItem("aiAnalysis", JSON.stringify(result.data));

//       navigate("/select");
//     } catch (err) {
//       console.error("Error:", err);
//       setError("Failed to process image. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="relative flex flex-col items-center justify-center min-h-screen bg-white px-6 md:px-16 py-20 overflow-hidden">
//       {/* Header */}
//       <HeaderIntroduction />

//       {/* Background Dotted Border Animation */}
//       <motion.div
//         className="absolute w-[400px] h-[400px] border border-dotted border-gray-400 rotate-45"
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1, rotate: 360 }}
//         transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
//       />
//       <motion.div
//         className="absolute w-[500px] h-[500px] border border-dotted border-gray-400 rotate-45"
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1, rotate: -360 }}
//         transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
//       />
//       <motion.div
//         className="absolute w-[600px] h-[600px] border border-dotted border-gray-400 rotate-45"
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1, rotate: 360 }}
//         transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
//       />

//       {/* AI Scan & Gallery Upload Section */}
//       <div className="flex gap-20 mt-20">
//         {/* Left - Camera Scan */}
//         <div className="relative flex flex-col items-center justify-center">
//           <motion.div
//             className="w-[300px] h-[300px] border border-gray-800 rotate-45 flex items-center justify-center"
//             initial={{ scale: 0.9 }}
//             animate={{ scale: 1 }}
//             transition={{ duration: 1 }}
//           >
//             <motion.div
//               className="w-[250px] h-[250px] border border-gray-600 rotate-45 flex items-center justify-center"
//               initial={{ scale: 0.9 }}
//               animate={{ scale: 1 }}
//               transition={{ duration: 1.2 }}
//             >
//               <motion.div
//                 className="w-[200px] h-[200px] border border-gray-400 rotate-45 flex items-center justify-center"
//                 initial={{ scale: 0.9 }}
//                 animate={{ scale: 1 }}
//                 transition={{ duration: 1.5 }}
//               >
//                 <img src="/icons/camera.svg" alt="Camera Icon" className="w-10 h-10" />
//               </motion.div>
//             </motion.div>
//           </motion.div>
//           <p className="mt-4 text-center text-sm font-semibold">
//             ALLOW A.I. <br /> TO SCAN YOUR FACE
//           </p>
//         </div>

//         {/* Right - Gallery Upload */}
//         <div className="relative flex flex-col items-center justify-center">
//           <motion.div
//             className="w-[300px] h-[300px] border border-gray-800 rotate-45 flex items-center justify-center"
//             initial={{ scale: 0.9 }}
//             animate={{ scale: 1 }}
//             transition={{ duration: 1 }}
//           >
//             <motion.div
//               className="w-[250px] h-[250px] border border-gray-600 rotate-45 flex items-center justify-center"
//               initial={{ scale: 0.9 }}
//               animate={{ scale: 1 }}
//               transition={{ duration: 1.2 }}
//             >
//               <motion.div
//                 className="w-[200px] h-[200px] border border-gray-400 rotate-45 flex items-center justify-center"
//                 initial={{ scale: 0.9 }}
//                 animate={{ scale: 1 }}
//                 transition={{ duration: 1.5 }}
//               >
//                 <label className="cursor-pointer">
//                   <img src="/icons/gallery.svg" alt="Gallery Icon" className="w-10 h-10" />
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageUpload}
//                     className="hidden"
//                   />
//                 </label>
//               </motion.div>
//             </motion.div>
//           </motion.div>
//           <p className="mt-4 text-center text-sm font-semibold">
//             ALLOW A.I. <br /> ACCESS GALLERY
//           </p>
//         </div>
//       </div>

//       {/* Process Button */}
//       <button
//         onClick={handleProcess}
//         disabled={loading}
//         className="absolute bottom-10 right-10 text-black flex items-center space-x-2"
//       >
//         <div className="border border-black p-2 flex items-center">
//           {loading ? <span className="mr-2">PROCESSING...</span> : <span className="mr-2">PROCESS</span>} ▶
//         </div>
//       </button>

//       {/* Back Button (Restored) */}
//       <button
//         onClick={() => navigate("/introduction")}
//         className="absolute bottom-10 left-10 text-black flex items-center space-x-2"
//       >
//         <div className="border border-black p-2 flex items-center">
//           ◀ <span className="ml-2">BACK</span>
//         </div>
//       </button>

//       {/* Error Message */}
//       {error && <p className="text-red-500 mt-4">{error}</p>}
//     </div>
//   );
// };

// export default Result;



























// import { motion } from "framer-motion";
// import { Link, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import HeaderIntroduction from "../components/HeaderIntroduction";

// const API_URL = "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo";

// const Result = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     setTimeout(() => {
//       alert("Data submitted successfully!");
//     }, 500); // Small delay for better UX
//   }, []);

//   const handleImageUpload = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     setLoading(true);
//     setError("");

//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onloadend = async () => {
//       const base64String = reader.result.split(",")[1]; // Extract Base64

//       try {
//         const response = await fetch(API_URL, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ Image: base64String }),
//         });

//         if (!response.ok) throw new Error("API request failed");

//         const result = await response.json();
//         console.log("API Response:", result);

//         // Save AI data for the Demographics Page
//         localStorage.setItem("aiAnalysis", JSON.stringify(result.data));

//         // Redirect to Select Page
//         navigate("/select");
//       } catch (err) {
//         console.error("Error:", err);
//         setError("Failed to analyze image. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };
//   };

//   return (
//     <div className="relative flex flex-col items-center justify-center min-h-screen bg-white px-6 md:px-16 py-20 overflow-hidden">
//       {/* Header */}
//       <HeaderIntroduction />

//       {/* Background Dotted Border Animation */}
//       <motion.div
//         className="absolute w-[400px] h-[400px] border border-dotted border-gray-400 rotate-45"
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1, rotate: 360 }}
//         transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
//       />
//       <motion.div
//         className="absolute w-[500px] h-[500px] border border-dotted border-gray-400 rotate-45"
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1, rotate: -360 }}
//         transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
//       />
//       <motion.div
//         className="absolute w-[600px] h-[600px] border border-dotted border-gray-400 rotate-45"
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1, rotate: 360 }}
//         transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
//       />

//       {/* AI Scan & Gallery Upload Section */}
//       <div className="flex gap-20 mt-20">
//         {/* Left - Camera Scan */}
//         <div className="relative flex flex-col items-center justify-center">
//           <motion.div
//             className="w-[300px] h-[300px] border border-gray-800 rotate-45 flex items-center justify-center"
//             initial={{ scale: 0.9 }}
//             animate={{ scale: 1 }}
//             transition={{ duration: 1 }}
//           >
//             <motion.div
//               className="w-[250px] h-[250px] border border-gray-600 rotate-45 flex items-center justify-center"
//               initial={{ scale: 0.9 }}
//               animate={{ scale: 1 }}
//               transition={{ duration: 1.2 }}
//             >
//               <motion.div
//                 className="w-[200px] h-[200px] border border-gray-400 rotate-45 flex items-center justify-center"
//                 initial={{ scale: 0.9 }}
//                 animate={{ scale: 1 }}
//                 transition={{ duration: 1.5 }}
//               >
//                 <img src="/icons/camera.svg" alt="Camera Icon" className="w-10 h-10" />
//               </motion.div>
//             </motion.div>
//           </motion.div>
//           <p className="mt-4 text-center text-sm font-semibold">
//             ALLOW A.I. <br /> TO SCAN YOUR FACE
//           </p>
//         </div>

//         {/* Right - Gallery Upload */}
//         <div className="relative flex flex-col items-center justify-center">
//           <label className="cursor-pointer">
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageUpload}
//               hidden
//             />
//             <motion.div
//               className="w-[300px] h-[300px] border border-gray-800 rotate-45 flex items-center justify-center"
//               initial={{ scale: 0.9 }}
//               animate={{ scale: 1 }}
//               transition={{ duration: 1 }}
//             >
//               <motion.div
//                 className="w-[250px] h-[250px] border border-gray-600 rotate-45 flex items-center justify-center"
//                 initial={{ scale: 0.9 }}
//                 animate={{ scale: 1 }}
//                 transition={{ duration: 1.2 }}
//               >
//                 <motion.div
//                   className="w-[200px] h-[200px] border border-gray-400 rotate-45 flex items-center justify-center"
//                   initial={{ scale: 0.9 }}
//                   animate={{ scale: 1 }}
//                   transition={{ duration: 1.5 }}
//                 >
//                   <img src="/icons/gallery.svg" alt="Gallery Icon" className="w-10 h-10" />
//                 </motion.div>
//               </motion.div>
//             </motion.div>
//           </label>
//           <p className="mt-4 text-center text-sm font-semibold">
//             ALLOW A.I. <br /> ACCESS GALLERY
//           </p>
//         </div>
//       </div>

//       {/* Back Button */}
//       <Link
//         to="/introduction"
//         className="absolute bottom-10 left-10 text-black flex items-center space-x-2"
//       >
//         <div className="border border-black p-2 flex items-center">
//           ◀ <span className="ml-2">BACK</span>
//         </div>
//       </Link>

//       {/* Error Message */}
//       {error && <p className="text-red-500 mt-4">{error}</p>}

//       {/* Loading Message */}
//       {loading && <p className="text-gray-500 mt-4">Processing Image...</p>}
//     </div>
//   );
// };

// export default Result;


























// import { motion } from "framer-motion";
// import { Link, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import HeaderIntroduction from "../components/HeaderIntroduction";

// const Result = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     setTimeout(() => {
//       alert("Data submitted successfully!");
//     }, 500);
//   }, []);

//   // Handle file selection for gallery upload
//   const handleFileSelect = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       console.log("Selected File:", file);
//       setSelectedFile(URL.createObjectURL(file)); // Preview selected image
//     }
//   };

//   // Handle Process Button Click - Redirects to Select Page
//   const handleProcessClick = () => {
//     alert("Image is being processed!");
//     navigate("/select"); // Redirect to Select Page
//   };

//   return (
//     <div className="relative flex flex-col items-center justify-center min-h-screen bg-white px-6 md:px-16 py-20 overflow-hidden">
//       {/* Header */}
//       <HeaderIntroduction />

//       {/* Background Dotted Border Animation */}
//       <motion.div
//         className="absolute w-[400px] h-[400px] border border-dotted border-gray-400 rotate-45"
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1, rotate: 360 }}
//         transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
//       />
//       <motion.div
//         className="absolute w-[500px] h-[500px] border border-dotted border-gray-400 rotate-45"
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1, rotate: -360 }}
//         transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
//       />
//       <motion.div
//         className="absolute w-[600px] h-[600px] border border-dotted border-gray-400 rotate-45"
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1, rotate: 360 }}
//         transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
//       />

//       {/* AI Scan & Gallery Upload Section */}
//       <div className="flex gap-20 mt-20">
//         {/* Left - Camera Scan */}
//         <div className="relative flex flex-col items-center justify-center">
//           <motion.div
//             className="w-[300px] h-[300px] border border-gray-800 rotate-45 flex items-center justify-center"
//             initial={{ scale: 0.9 }}
//             animate={{ scale: 1 }}
//             transition={{ duration: 1 }}
//           >
//             <motion.div
//               className="w-[250px] h-[250px] border border-gray-600 rotate-45 flex items-center justify-center"
//               initial={{ scale: 0.9 }}
//               animate={{ scale: 1 }}
//               transition={{ duration: 1.2 }}
//             >
//               <motion.div
//                 className="w-[200px] h-[200px] border border-gray-400 rotate-45 flex items-center justify-center"
//                 initial={{ scale: 0.9 }}
//                 animate={{ scale: 1 }}
//                 transition={{ duration: 1.5 }}
//               >
//                 <img src="/icons/camera.svg" alt="Camera Icon" className="w-10 h-10" />
//               </motion.div>
//             </motion.div>
//           </motion.div>
//           <p className="mt-4 text-center text-sm font-semibold">
//             ALLOW A.I. <br /> TO SCAN YOUR FACE
//           </p>
//         </div>

//         {/* Right - Gallery Upload */}
//         <div className="relative flex flex-col items-center justify-center cursor-pointer">
//           {/* Hidden File Input (Triggers when clicking the gallery button) */}
//           <input
//             type="file"
//             accept="image/*"
//             className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//             onChange={handleFileSelect}
//           />

//           {/* Animated Rotating Borders */}
//           <motion.div
//             className="w-[300px] h-[300px] border border-gray-800 rotate-45 flex items-center justify-center"
//             initial={{ scale: 0.9 }}
//             animate={{ scale: 1 }}
//             transition={{ duration: 1 }}
//           >
//             <motion.div
//               className="w-[250px] h-[250px] border border-gray-600 rotate-45 flex items-center justify-center"
//               initial={{ scale: 0.9 }}
//               animate={{ scale: 1 }}
//               transition={{ duration: 1.2 }}
//             >
//               <motion.div
//                 className="w-[200px] h-[200px] border border-gray-400 rotate-45 flex items-center justify-center"
//                 initial={{ scale: 0.9 }}
//                 animate={{ scale: 1 }}
//                 transition={{ duration: 1.5 }}
//               >
//                 <img src="/icons/gallery.svg" alt="Gallery Icon" className="w-10 h-10" />
//               </motion.div>
//             </motion.div>
//           </motion.div>

//           {/* Text Below Icon */}
//           <p className="mt-4 text-center text-sm font-semibold">
//             ALLOW A.I. <br /> ACCESS GALLERY
//           </p>
//         </div>
//       </div>

//       {/* Display Selected Image Preview */}
//       {selectedFile && (
//         <div className="mt-6 flex flex-col items-center">
//           <p className="text-gray-600 text-sm text-center">Selected Image:</p>
//           <img src={selectedFile} alt="Selected Preview" className="mt-2 max-w-xs rounded-lg shadow-lg" />

//           {/* Process Button (Appears After Upload) */}
//           <button
//             onClick={handleProcessClick}
//             className="mt-4 border border-black p-2 flex items-center text-black"
//           >
//             <span className="mr-2">PROCESS</span> ▶
//           </button>
//         </div>
//       )}

//       {/* Back Button */}
//       <Link
//         to="/introduction"
//         className="absolute bottom-10 left-10 text-black flex items-center space-x-2"
//       >
//         <div className="border border-black p-2 flex items-center">
//           ◀ <span className="ml-2">BACK</span>
//         </div>
//       </Link>
//     </div>
//   );
// };

// export default Result;








































// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import HeaderIntroduction from "../components/HeaderIntroduction";

// const Result = () => {
//   const [selectedFile, setSelectedFile] = useState(null);

//   useEffect(() => {
//     setTimeout(() => {
//       alert("Data submitted successfully!");
//     }, 500);
//   }, []);

//   // Handle file selection for gallery upload
//   const handleFileSelect = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       console.log("Selected File:", file);
//       setSelectedFile(URL.createObjectURL(file)); // Preview selected image
//     }
//   };

//   // Handle Process Button Click
//   const handleProcessClick = () => {
//     alert("Image is being processed!");
//     // You can add API call here to process the image
//   };

//   return (
//     <div className="relative flex flex-col items-center justify-center min-h-screen bg-white px-6 md:px-16 py-20 overflow-hidden">
//       {/* Header */}
//       <HeaderIntroduction />

//       {/* Background Dotted Border Animation */}
//       <motion.div
//         className="absolute w-[400px] h-[400px] border border-dotted border-gray-400 rotate-45"
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1, rotate: 360 }}
//         transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
//       />
//       <motion.div
//         className="absolute w-[500px] h-[500px] border border-dotted border-gray-400 rotate-45"
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1, rotate: -360 }}
//         transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
//       />
//       <motion.div
//         className="absolute w-[600px] h-[600px] border border-dotted border-gray-400 rotate-45"
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1, rotate: 360 }}
//         transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
//       />

//       {/* AI Scan & Gallery Upload Section */}
//       <div className="flex gap-20 mt-20">
//         {/* Left - Camera Scan */}
//         <div className="relative flex flex-col items-center justify-center">
//           <motion.div
//             className="w-[300px] h-[300px] border border-gray-800 rotate-45 flex items-center justify-center"
//             initial={{ scale: 0.9 }}
//             animate={{ scale: 1 }}
//             transition={{ duration: 1 }}
//           >
//             <motion.div
//               className="w-[250px] h-[250px] border border-gray-600 rotate-45 flex items-center justify-center"
//               initial={{ scale: 0.9 }}
//               animate={{ scale: 1 }}
//               transition={{ duration: 1.2 }}
//             >
//               <motion.div
//                 className="w-[200px] h-[200px] border border-gray-400 rotate-45 flex items-center justify-center"
//                 initial={{ scale: 0.9 }}
//                 animate={{ scale: 1 }}
//                 transition={{ duration: 1.5 }}
//               >
//                 <img src="/icons/camera.svg" alt="Camera Icon" className="w-10 h-10" />
//               </motion.div>
//             </motion.div>
//           </motion.div>
//           <p className="mt-4 text-center text-sm font-semibold">
//             ALLOW A.I. <br /> TO SCAN YOUR FACE
//           </p>
//         </div>

//         {/* Right - Gallery Upload */}
//         <div className="relative flex flex-col items-center justify-center cursor-pointer">
//           {/* Hidden File Input (Triggers when clicking the gallery button) */}
//           <input
//             type="file"
//             accept="image/*"
//             className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//             onChange={handleFileSelect}
//           />

//           {/* Animated Rotating Borders */}
//           <motion.div
//             className="w-[300px] h-[300px] border border-gray-800 rotate-45 flex items-center justify-center"
//             initial={{ scale: 0.9 }}
//             animate={{ scale: 1 }}
//             transition={{ duration: 1 }}
//           >
//             <motion.div
//               className="w-[250px] h-[250px] border border-gray-600 rotate-45 flex items-center justify-center"
//               initial={{ scale: 0.9 }}
//               animate={{ scale: 1 }}
//               transition={{ duration: 1.2 }}
//             >
//               <motion.div
//                 className="w-[200px] h-[200px] border border-gray-400 rotate-45 flex items-center justify-center"
//                 initial={{ scale: 0.9 }}
//                 animate={{ scale: 1 }}
//                 transition={{ duration: 1.5 }}
//               >
//                 <img src="/icons/gallery.svg" alt="Gallery Icon" className="w-10 h-10" />
//               </motion.div>
//             </motion.div>
//           </motion.div>

//           {/* Text Below Icon */}
//           <p className="mt-4 text-center text-sm font-semibold">
//             ALLOW A.I. <br /> ACCESS GALLERY
//           </p>
//         </div>
//       </div>

//       {/* Display Selected Image Preview */}
//       {selectedFile && (
//         <div className="mt-6 flex flex-col items-center">
//           <p className="text-gray-600 text-sm text-center">Selected Image:</p>
//           <img src={selectedFile} alt="Selected Preview" className="mt-2 max-w-xs rounded-lg shadow-lg" />

//           {/* Process Button (Appears After Upload) */}
//           <button
//             onClick={handleProcessClick}
//             className="mt-4 border border-black p-2 flex items-center text-black"
//           >
//             <span className="mr-2">PROCESS</span> ▶
//           </button>
//         </div>
//       )}

//       {/* Back Button */}
//       <Link
//         to="/introduction"
//         className="absolute bottom-10 left-10 text-black flex items-center space-x-2"
//       >
//         <div className="border border-black p-2 flex items-center">
//           ◀ <span className="ml-2">BACK</span>
//         </div>
//       </Link>
//     </div>
//   );
// };

// export default Result;





































// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import HeaderIntroduction from "../components/HeaderIntroduction";

// const Result = () => {
//   const [selectedFile, setSelectedFile] = useState(null);

//   useEffect(() => {
//     setTimeout(() => {
//       alert("Data submitted successfully!");
//     }, 500);
//   }, []);

//   // Handle file selection for gallery upload
//   const handleFileSelect = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       console.log("Selected File:", file);
//       setSelectedFile(URL.createObjectURL(file)); // Preview selected image
//     }
//   };

//   return (
//     <div className="relative flex flex-col items-center justify-center min-h-screen bg-white px-6 md:px-16 py-20 overflow-hidden">
//       {/* Header */}
//       <HeaderIntroduction />

//       {/* Background Dotted Border Animation */}
//       <motion.div
//         className="absolute w-[400px] h-[400px] border border-dotted border-gray-400 rotate-45"
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1, rotate: 360 }}
//         transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
//       />
//       <motion.div
//         className="absolute w-[500px] h-[500px] border border-dotted border-gray-400 rotate-45"
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1, rotate: -360 }}
//         transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
//       />
//       <motion.div
//         className="absolute w-[600px] h-[600px] border border-dotted border-gray-400 rotate-45"
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1, rotate: 360 }}
//         transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
//       />

//       {/* AI Scan & Gallery Upload Section */}
//       <div className="flex gap-20 mt-20">
//         {/* Left - Camera Scan */}
//         <div className="relative flex flex-col items-center justify-center">
//           <motion.div
//             className="w-[300px] h-[300px] border border-gray-800 rotate-45 flex items-center justify-center"
//             initial={{ scale: 0.9 }}
//             animate={{ scale: 1 }}
//             transition={{ duration: 1 }}
//           >
//             <motion.div
//               className="w-[250px] h-[250px] border border-gray-600 rotate-45 flex items-center justify-center"
//               initial={{ scale: 0.9 }}
//               animate={{ scale: 1 }}
//               transition={{ duration: 1.2 }}
//             >
//               <motion.div
//                 className="w-[200px] h-[200px] border border-gray-400 rotate-45 flex items-center justify-center"
//                 initial={{ scale: 0.9 }}
//                 animate={{ scale: 1 }}
//                 transition={{ duration: 1.5 }}
//               >
//                 <img src="/icons/camera.svg" alt="Camera Icon" className="w-10 h-10" />
//               </motion.div>
//             </motion.div>
//           </motion.div>
//           <p className="mt-4 text-center text-sm font-semibold">
//             ALLOW A.I. <br /> TO SCAN YOUR FACE
//           </p>
//         </div>

//         {/* Right - Gallery Upload */}
//         <div className="relative flex flex-col items-center justify-center cursor-pointer">
//           {/* Hidden File Input (Triggers when clicking the gallery button) */}
//           <input
//             type="file"
//             accept="image/*"
//             className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//             onChange={handleFileSelect}
//           />

//           {/* Animated Rotating Borders */}
//           <motion.div
//             className="w-[300px] h-[300px] border border-gray-800 rotate-45 flex items-center justify-center"
//             initial={{ scale: 0.9 }}
//             animate={{ scale: 1 }}
//             transition={{ duration: 1 }}
//           >
//             <motion.div
//               className="w-[250px] h-[250px] border border-gray-600 rotate-45 flex items-center justify-center"
//               initial={{ scale: 0.9 }}
//               animate={{ scale: 1 }}
//               transition={{ duration: 1.2 }}
//             >
//               <motion.div
//                 className="w-[200px] h-[200px] border border-gray-400 rotate-45 flex items-center justify-center"
//                 initial={{ scale: 0.9 }}
//                 animate={{ scale: 1 }}
//                 transition={{ duration: 1.5 }}
//               >
//                 <img src="/icons/gallery.svg" alt="Gallery Icon" className="w-10 h-10" />
//               </motion.div>
//             </motion.div>
//           </motion.div>

//           {/* Text Below Icon */}
//           <p className="mt-4 text-center text-sm font-semibold">
//             ALLOW A.I. <br /> ACCESS GALLERY
//           </p>
//         </div>
//       </div>

//       {/* Display Selected Image Preview */}
//       {selectedFile && (
//         <div className="mt-6">
//           <p className="text-gray-600 text-sm text-center">Selected Image:</p>
//           <img src={selectedFile} alt="Selected Preview" className="mt-2 max-w-xs rounded-lg shadow-lg" />
//         </div>
//       )}

//       {/* Back Button */}
//       <Link
//         to="/introduction"
//         className="absolute bottom-10 left-10 text-black flex items-center space-x-2"
//       >
//         <div className="border border-black p-2 flex items-center">
//           ◀ <span className="ml-2">BACK</span>
//         </div>
//       </Link>
//     </div>
//   );
// };

// export default Result;










































// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import { useEffect } from "react";
// import HeaderIntroduction from "../components/HeaderIntroduction";

// const Result = () => {
//   useEffect(() => {
//     setTimeout(() => {
//       alert("Data submitted successfully!");
//     }, 500); // Small delay for better UX
//   }, []);
//   const handleFileSelect = (event) => {
//     const file = event.target.files[0]; // Get the selected file
//     if (file) {
//       console.log("Selected File:", file);
//       // You can now upload the file or display a preview
//     }
//   };
  

//   return (
//     <div className="relative flex flex-col items-center justify-center min-h-screen bg-white px-6 md:px-16 py-20 overflow-hidden">
//       {/* Header */}
//       <HeaderIntroduction />

//       {/* Background Dotted Border Animation */}
//       <motion.div
//         className="absolute w-[400px] h-[400px] border border-dotted border-gray-400 rotate-45"
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1, rotate: 360 }}
//         transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
//       />
//       <motion.div
//         className="absolute w-[500px] h-[500px] border border-dotted border-gray-400 rotate-45"
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1, rotate: -360 }}
//         transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
//       />
//       <motion.div
//         className="absolute w-[600px] h-[600px] border border-dotted border-gray-400 rotate-45"
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1, rotate: 360 }}
//         transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
//       />

//       {/* AI Scan & Gallery Upload Section */}
//       <div className="flex gap-20 mt-20">
//         {/* Left - Camera Scan */}
//         <div className="relative flex flex-col items-center justify-center">
//           <motion.div
//             className="w-[300px] h-[300px] border border-gray-800 rotate-45 flex items-center justify-center"
//             initial={{ scale: 0.9 }}
//             animate={{ scale: 1 }}
//             transition={{ duration: 1 }}
//           >
//             <motion.div
//               className="w-[250px] h-[250px] border border-gray-600 rotate-45 flex items-center justify-center"
//               initial={{ scale: 0.9 }}
//               animate={{ scale: 1 }}
//               transition={{ duration: 1.2 }}
//             >
//               <motion.div
//                 className="w-[200px] h-[200px] border border-gray-400 rotate-45 flex items-center justify-center"
//                 initial={{ scale: 0.9 }}
//                 animate={{ scale: 1 }}
//                 transition={{ duration: 1.5 }}
//               >
//                 <img src="/icons/camera.svg" alt="Camera Icon" className="w-10 h-10" />
//               </motion.div>
//             </motion.div>
//           </motion.div>
//           <p className="mt-4 text-center text-sm font-semibold">
//             ALLOW A.I. <br /> TO SCAN YOUR FACE
//           </p>
//         </div>

//         {/* Right - Gallery Upload */}
//         <div className="relative flex flex-col items-center justify-center">
//           <motion.div
//             className="w-[300px] h-[300px] border border-gray-800 rotate-45 flex items-center justify-center"
//             initial={{ scale: 0.9 }}
//             animate={{ scale: 1 }}
//             transition={{ duration: 1 }}
//           >
//             <motion.div
//               className="w-[250px] h-[250px] border border-gray-600 rotate-45 flex items-center justify-center"
//               initial={{ scale: 0.9 }}
//               animate={{ scale: 1 }}
//               transition={{ duration: 1.2 }}
//             >
//               <motion.div
//                 className="w-[200px] h-[200px] border border-gray-400 rotate-45 flex items-center justify-center"
//                 initial={{ scale: 0.9 }}
//                 animate={{ scale: 1 }}
//                 transition={{ duration: 1.5 }}
//               >
//                 <img src="/icons/gallery.svg" alt="Gallery Icon" className="w-10 h-10" />
//               </motion.div>
//             </motion.div>
//           </motion.div>
//           <p className="mt-4 text-center text-sm font-semibold">
//             ALLOW A.I. <br /> ACCESS GALLERY
//           </p>
//         </div>
//       </div>




// {/* Right - Gallery Upload */}








//       {/* Back Button */}
//       <Link
//         to="/introduction"
//         className="absolute bottom-10 left-10 text-black flex items-center space-x-2"
//       >
//         <div className="border border-black p-2 flex items-center">
//           ◀ <span className="ml-2">BACK</span>
//         </div>
//       </Link>
//     </div>
//   );
// };

// export default Result;












