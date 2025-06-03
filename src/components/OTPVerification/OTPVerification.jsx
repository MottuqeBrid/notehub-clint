import { useState, useRef, useEffect } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { Lock } from "lucide-react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router";
import { useCallback } from "react";

export default function OTPVerification() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);
  const [timer, setTimer] = useState(300); // 5 minutes
  const [status, setStatus] = useState("idle"); // 'idle' | 'success' | 'error'
  const navigate = useNavigate();
  const { user } = useAuth();
  useEffect(() => {
    if (user && user?.isVerified) {
      navigate("/dashboard"); // Adjust the path as needed
    }
  }, [user, navigate]);

  // Start OTP request on mount
  const otpRequest = useCallback(() => {
    setTimer(300);

    if (user && !user?.isVerified) {
      axios.patch(`${import.meta.env.VITE_API_URL}/user/otp`, null, {
        withCredentials: true,
      });
    } else {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  useEffect(() => {
    otpRequest();
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [otpRequest]);

  const otpSend = async () => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/user/verify`,
        { otp: otp.join("") },
        { withCredentials: true }
      );
      // Simulate success/fail by checking response (adjust as needed)
      if (response.data.success) {
        console.log(response);
        setStatus("success");
        navigate(0); // Navigate immediately after success
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.log(err);
      setStatus("error");
    }

    // Reset animation after delay
    setTimeout(() => setStatus("idle"), 2000);
  };

  const handleChange = (element, index) => {
    const value = element.value.replace(/[^0-9]/g, "");
    if (!value) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      if (otp[index] === "" && index > 0) {
        inputRefs.current[index - 1]?.focus();
        newOtp[index - 1] = "";
      } else {
        newOtp[index] = "";
      }
      setOtp(newOtp);
    }
  };

  const formatTime = () => {
    const min = Math.floor(timer / 60)
      .toString()
      .padStart(2, "0");
    const sec = (timer % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-indigo-200 via-white to-teal-100 px-4">
      <Motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className={`bg-white rounded-2xl shadow-xl p-8 w-full max-w-md transition-all duration-300 ${
          status === "success"
            ? "ring-4 ring-green-400"
            : status === "error"
            ? "ring-4 ring-red-400 animate-shake"
            : ""
        }`}
      >
        <div className="flex flex-col items-center space-y-3">
          <Motion.div
            animate={{ rotate: [0, 20, -20, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Lock className="w-10 h-10 text-indigo-600" />
          </Motion.div>
          <h2 className="text-xl font-bold text-gray-800">OTP Verification</h2>
          <p className="text-sm text-gray-500 text-center">
            Enter the 6-digit code sent to your phone
          </p>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {otp.map((value, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={value}
              ref={(el) => (inputRefs.current[index] = el)}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleBackspace(e, index)}
              className="input input-bordered w-12 h-12 text-center text-xl font-semibold text-gray-700 rounded-lg focus:outline-none focus:ring-2 ring-indigo-500 transition-all"
            />
          ))}
        </div>

        <button
          onClick={otpSend}
          className="btn btn-primary mt-8 w-full"
          disabled={otp.some((digit) => digit === "")}
        >
          Verify OTP
        </button>

        <div className="text-center text-sm text-gray-500 mt-4">
          {timer > 0 ? (
            <p>
              Resend OTP in{" "}
              <span className="font-semibold text-indigo-600">
                {formatTime()}
              </span>
            </p>
          ) : (
            <button
              onClick={otpRequest}
              className="link link-primary cursor-pointer"
            >
              Resend OTP
            </button>
          )}
        </div>
      </Motion.div>

      {/* Shake Animation Style */}
      <style>{`
        @keyframes shake {
          0% { transform: translateX(0); }
          20% { transform: translateX(-5px); }
          40% { transform: translateX(5px); }
          60% { transform: translateX(-5px); }
          80% { transform: translateX(5px); }
          100% { transform: translateX(0); }
        }
        .animate-shake {
          animation: shake 0.4s ease;
        }
      `}</style>
    </div>
  );
}
