"use client";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
export function Carousel({ children, autoPlay = true, interval = 5000, showDots = true, showArrows = true, }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const next = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % children.length);
    }, [children.length]);
    const prev = () => {
        setCurrentIndex((prev) => (prev - 1 + children.length) % children.length);
    };
    const goToSlide = (index) => {
        setCurrentIndex(index);
    };
    useEffect(() => {
        if (!autoPlay || isHovered)
            return;
        const timer = setInterval(next, interval);
        return () => clearInterval(timer);
    }, [autoPlay, interval, isHovered, next]);
    return (<div className="relative overflow-hidden rounded-xl" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {children.map((child, index) => (<div key={index} className="w-full flex-shrink-0">
            {child}
          </div>))}
      </div>

      {showArrows && children.length > 1 && (<>
          <Button variant="secondary" size="icon" onClick={prev} className="absolute left-4 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm">
            <ChevronLeft className="h-5 w-5"/>
          </Button>
          <Button variant="secondary" size="icon" onClick={next} className="absolute right-4 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm">
            <ChevronRight className="h-5 w-5"/>
          </Button>
        </>)}

      {showDots && children.length > 1 && (<div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {children.map((_, index) => (<button key={index} onClick={() => goToSlide(index)} className={`h-2 rounded-full transition-all ${index === currentIndex ? "w-6 bg-white" : "w-2 bg-white/50"}`}/>))}
        </div>)}
    </div>);
}
