import { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { dailyLearningItems, type DailyLearning } from '@/data/mockData';

export default function DailyLearning() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const startXRef = useRef(0);
  const dragStartXRef = useRef(0);
  const hasDraggedRef = useRef(false);
  const currentTranslateRef = useRef(0);
  const velocityRef = useRef(0);
  const lastMoveTimeRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const autoPlayTimerRef = useRef<number | null>(null);

  const totalSlides = dailyLearningItems.length;
  const slideWidth = 308;
  const padding = 16;
  const maxTranslateX = 0;
  const minTranslateX = -(totalSlides - 1) * (slideWidth + padding);
  const cardHeight = 154;
  const autoPlayInterval = 6000;

  const startAutoPlay = useCallback(() => {
    stopAutoPlay();
    autoPlayTimerRef.current = window.setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev + 1;
        return next >= totalSlides ? 0 : next;
      });
    }, autoPlayInterval);
  }, [totalSlides, autoPlayInterval]);

  const stopAutoPlay = useCallback(() => {
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
      autoPlayTimerRef.current = null;
    }
  }, []);

  const snapToIndex = useCallback((index: number) => {
    const targetTranslate = -index * (slideWidth + padding);
    setCurrentIndex(index);
    setIsTransitioning(true);
    currentTranslateRef.current = targetTranslate;
    
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${targetTranslate}px)`;
      trackRef.current.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  }, [slideWidth, padding]);

  const handleStart = useCallback((clientX: number) => {
    stopAutoPlay();
    setIsDragging(true);
    setIsTransitioning(false);
    startXRef.current = clientX;
    dragStartXRef.current = clientX;
    hasDraggedRef.current = false;
    lastMoveTimeRef.current = Date.now();
    velocityRef.current = 0;

    if (trackRef.current) {
      trackRef.current.style.transition = 'none';
    }
  }, [stopAutoPlay]);

  const handleMove = useCallback((clientX: number) => {
    if (!isDragging) return;

    if (Math.abs(clientX - dragStartXRef.current) > 5) {
      hasDraggedRef.current = true;
    }

    const now = Date.now();
    const deltaX = clientX - startXRef.current;
    const deltaTime = now - lastMoveTimeRef.current;
    
    if (deltaTime > 0) {
      velocityRef.current = deltaX / deltaTime;
    }
    lastMoveTimeRef.current = now;
    
    let newTranslate = currentTranslateRef.current + deltaX;
    
    if (newTranslate > maxTranslateX) {
      newTranslate = maxTranslateX + (newTranslate - maxTranslateX) * 0.3;
    }
    if (newTranslate < minTranslateX) {
      newTranslate = minTranslateX + (newTranslate - minTranslateX) * 0.3;
    }
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    animationFrameRef.current = requestAnimationFrame(() => {
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${newTranslate}px)`;
      }
    });
    
    currentTranslateRef.current = newTranslate;
    startXRef.current = clientX;
  }, [isDragging, maxTranslateX, minTranslateX]);

  const handleEnd = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    
    const velocity = velocityRef.current;
    const threshold = slideWidth * 0.25;
    
    let newIndex = currentIndex;
    
    if (velocity > 0.5 && currentIndex > 0) {
      newIndex = currentIndex - 1;
    } else if (velocity < -0.5 && currentIndex < totalSlides - 1) {
      newIndex = currentIndex + 1;
    } else {
      const currentTranslate = currentTranslateRef.current;
      const expectedTranslate = -currentIndex * (slideWidth + padding);
      const diff = currentTranslate - expectedTranslate;
      
      if (diff > threshold && currentIndex > 0) {
        newIndex = currentIndex - 1;
      } else if (diff < -threshold && currentIndex < totalSlides - 1) {
        newIndex = currentIndex + 1;
      }
    }
    
    snapToIndex(newIndex);
    startAutoPlay();
  }, [isDragging, currentIndex, totalSlides, slideWidth, padding, snapToIndex, startAutoPlay]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX);
  }, [handleStart]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  }, [handleMove]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    handleStart(e.clientX);
  }, [handleStart]);

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleMove(e.clientX);
      }
    };

    const handleGlobalMouseUp = () => {
      if (isDragging) {
        handleEnd();
      }
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isDragging, handleMove, handleEnd]);

  useEffect(() => {
    if (!isDragging && !isTransitioning) {
      snapToIndex(currentIndex);
    }
  }, [currentIndex, isDragging, isTransitioning, snapToIndex]);

  useEffect(() => {
    startAutoPlay();
    return () => {
      stopAutoPlay();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [startAutoPlay, stopAutoPlay]);

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < totalSlides && !isTransitioning) {
      stopAutoPlay();
      snapToIndex(index);
      setTimeout(() => {
        startAutoPlay();
      }, autoPlayInterval);
    }
  }, [totalSlides, isTransitioning, stopAutoPlay, snapToIndex, startAutoPlay, autoPlayInterval]);

  const handleCardClick = useCallback((item: DailyLearning) => {
    // 拖动滑动后不触发跳转，避免误触
    if (hasDraggedRef.current) return;
    navigate(`/daily/${item.id}`, { state: { title: item.question } });
  }, [navigate]);

  useEffect(() => {
    currentTranslateRef.current = -currentIndex * (slideWidth + padding);
  }, []);

  return (
    <div className="px-4 mb-4">
      <div 
        ref={containerRef}
        className="relative overflow-hidden rounded-2xl"
        style={{ width: slideWidth, margin: '0 auto' }}
      >
        <div
          ref={trackRef}
          className="flex gap-[16px]"
          style={{
            transform: `translateX(0px)`,
            transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleEnd}
          onMouseDown={handleMouseDown}
        >
          {dailyLearningItems.map((item) => (
            <div
              key={item.id}
              className="relative rounded-2xl overflow-hidden flex-shrink-0 cursor-pointer active:cursor-grabbing"
              style={{ width: slideWidth, height: cardHeight }}
              onClick={() => handleCardClick(item)}
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-5">
                <div className="text-blue-100 text-sm mb-2 opacity-90">{item.title}</div>
                <div className="text-white text-lg font-bold mb-3">{item.question}</div>
                <div className="text-blue-100 text-sm opacity-90">{item.actionText}</div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
          {dailyLearningItems.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-white w-4'
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
