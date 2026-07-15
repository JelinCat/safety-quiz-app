import { useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import PhoneFrame from '@/components/PhoneFrame';
import Home from '@/pages/Home';
import Quiz from '@/pages/Quiz';
import AnswerPage from '@/pages/AnswerPage';
import CommonSense from '@/pages/CommonSense';
import FirstAid from '@/pages/FirstAid';
import FirstAidDetail from '@/pages/FirstAidDetail';
import CommonSenseDetail from '@/pages/CommonSenseDetail';

export default function AnimatedRoutes() {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [isAnimating, setIsAnimating] = useState(false);
  const prevPath = useRef(location.pathname);

  useEffect(() => {
    if (location.pathname !== prevPath.current) {
      setIsAnimating(true);
    }
  }, [location]);

  const handleAnimationEnd = () => {
    setDisplayLocation(location);
    setIsAnimating(false);
    prevPath.current = location.pathname;
  };

  const isForward = location.pathname.startsWith('/quiz') || 
                   location.pathname.startsWith('/answer') || 
                   location.pathname.startsWith('/common/') || 
                   location.pathname.startsWith('/first-aid/');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
      <PhoneFrame>
        <div className="relative w-full h-full overflow-hidden">
          {isAnimating ? (
            <>
              <div
                className={`absolute inset-0 z-10 overflow-hidden ${isForward ? 'animate-slide-out-left' : 'animate-slide-out-right'}`}
                onAnimationEnd={handleAnimationEnd}
              >
                <div className="w-full h-full">
                  <Routes location={displayLocation}>
                    <Route path="/" element={<Home />} />
                    <Route path="/common" element={<CommonSense />} />
                    <Route path="/first-aid/:id" element={<FirstAidDetail />} />
                    <Route path="/first-aid" element={<FirstAid />} />
                    <Route path="/quiz/:categoryId" element={<Quiz />} />
                    <Route path="/answer/:categoryId/:questionId" element={<AnswerPage />} />
                    <Route path="/common/:id" element={<CommonSenseDetail />} />
                  </Routes>
                </div>
              </div>
              <div
                className={`absolute inset-0 z-20 overflow-hidden ${isForward ? 'animate-slide-in-right' : 'animate-slide-in-left'}`}
              >
                <div className="w-full h-full">
                  <Routes location={location}>
                    <Route path="/" element={<Home />} />
                    <Route path="/common" element={<CommonSense />} />
                    <Route path="/first-aid/:id" element={<FirstAidDetail />} />
                    <Route path="/first-aid" element={<FirstAid />} />
                    <Route path="/quiz/:categoryId" element={<Quiz />} />
                    <Route path="/answer/:categoryId/:questionId" element={<AnswerPage />} />
                    <Route path="/common/:id" element={<CommonSenseDetail />} />
                  </Routes>
                </div>
              </div>
            </>
          ) : (
            <div className="absolute inset-0">
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/common" element={<CommonSense />} />
                <Route path="/first-aid/:id" element={<FirstAidDetail />} />
                <Route path="/first-aid" element={<FirstAid />} />
                <Route path="/quiz/:categoryId" element={<Quiz />} />
                <Route path="/answer/:categoryId/:questionId" element={<AnswerPage />} />
                <Route path="/common/:id" element={<CommonSenseDetail />} />
              </Routes>
            </div>
          )}

          <style>{`
            @keyframes slideInRight {
              from { transform: translateX(100%); opacity: 0; }
              to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutLeft {
              from { transform: translateX(0); opacity: 1; }
              to { transform: translateX(-100%); opacity: 0; }
            }
            @keyframes slideInLeft {
              from { transform: translateX(-100%); opacity: 0; }
              to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
              from { transform: translateX(0); opacity: 1; }
              to { transform: translateX(100%); opacity: 0; }
            }
            .animate-slide-in-right {
              animation: slideInRight 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
              will-change: transform, opacity;
              backface-visibility: hidden;
              transform-style: preserve-3d;
            }
            .animate-slide-out-left {
              animation: slideOutLeft 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
              will-change: transform, opacity;
              backface-visibility: hidden;
              transform-style: preserve-3d;
            }
            .animate-slide-in-left {
              animation: slideInLeft 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
              will-change: transform, opacity;
              backface-visibility: hidden;
              transform-style: preserve-3d;
            }
            .animate-slide-out-right {
              animation: slideOutRight 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
              will-change: transform, opacity;
              backface-visibility: hidden;
              transform-style: preserve-3d;
            }
          `}</style>
        </div>
      </PhoneFrame>
    </div>
  );
}