'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Flag } from 'lucide-react';
import { InfiniteSlider } from './InfiniteSlider';

function CountUpNumber({ targetNumber, suffix = '' }: { targetNumber: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          let startTimestamp: number | null = null;
          const duration = 2000; // 2 seconds count up duration

          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);

            // Smooth ease-out cubic animation curve
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeOutProgress * targetNumber));

            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setCount(targetNumber);
            }
          };

          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [targetNumber, hasAnimated]);

  return (
    <div ref={ref} className="text-5xl sm:text-4xl lg:text-7xl font-semibold text-[#000000] tracking-wide font-heading">
      {count}{suffix}
    </div>
  );
}

export function MoreAboutSection() {
  const stats = [
    { targetNumber: 1000, suffix: '+', label: 'Jobs listed' },
    { targetNumber: 800, suffix: '+', label: 'People hired' },
    { targetNumber: 5, suffix: 'K+', label: 'Companies' },
    { targetNumber: 10, suffix: '+', label: 'Countries available' },
  ];

  return (
    <section className="w-full bg-[#F3F7FE]  py-10 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-12">

          {/* Left Column: Eyebrow, Title, Client Logos */}
          <div className="w-full lg:w-[50%] space-y-6 flex flex-col items-center lg:items-start text-left lg:text-left">

            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-normal font-avenue text-[#1D74C1]">
              <Flag className="w-4 h-4 text-[#1D74C1]" />
              <span>More about JobBase</span>
            </div>

            {/* Heading */}
            <h2 className="text-[1.46rem] sm:text-3xl lg:text-[2.5rem] font-medium text-[#000000] leading-tight tracking-normal lg:leading-tight max-w-2xl font-body">
              <span className="text-[#1D74C1] font-body">
                The right role doesn't find you. You find it.
              </span>{' '}
              Discover Opportunities Built Around Your Strengths, Your Goals, And The Career You're Working Toward.
            </h2>

            {/* Client Logos Infinite Loop Slider */}
            <div className="pt-10 w-full max-w-xl relative overflow-hidden font-subheading text-sm sm:text-xl font-bold uppercase tracking-wider text-slate-700 ">
              {/* Left & Right Edge Fade Gradients */}
              <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-16 bg-gradient-to-r from-[#F3F7FE] to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-16 bg-gradient-to-l from-[#F3F7FE] to-transparent z-10 pointer-events-none" />

              <InfiniteSlider gap={36} duration={42} durationOnHover={60}>
                <div className="shrink-0 flex items-center gap-2">
                  <img src="https://cdn.simpleicons.org/spotify/1DB954" alt="Spotify" className="w-5 h-5 object-contain" />
                  <span className="font-subheading text-[#1DB954]">Spotify</span>
                </div>
                <div className="shrink-0 flex items-center gap-2">
                  <img src="https://thumb.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/960px-Microsoft_logo.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail" alt="Microsoft" className="w-5 h-5 object-contain" />
                  <span className="font-subheading text-[#00A4EF]">Microsoft</span>
                </div>
                <div className="shrink-0 flex items-center gap-2">
                  <img src="https://cdn.simpleicons.org/mcafee/C01818" alt="McAfee" className="w-5 h-5 object-contain" />
                  <span className="font-subheading text-[#C01818]">McAfee</span>
                </div>
                <div className="shrink-0 flex items-center gap-2">
                  <img src="https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/3840px-Google_%22G%22_logo.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail" alt="Google" className="w-5 h-5 object-contain" />
                  <span className="font-subheading font-bold">
                    <span className="text-[#4285F4]">G</span>
                    <span className="text-[#EA4335]">o</span>
                    <span className="text-[#FBBC05]">o</span>
                    <span className="text-[#4285F4]">g</span>
                    <span className="text-[#34A853]">l</span>
                    <span className="text-[#EA4335]">e</span>
                  </span>
                </div>
                <div className="shrink-0 flex items-center gap-2">
                  <img src="https://thumbs.dreamstime.com/b/amazon-logo-white-background-montreal-canada-july-printed-paper-98221126.jpg" alt="Amazon" className="w-5 h-5 object-contain" />
                  <span className="font-subheading text-black">Amazon</span>
                </div>
                <div className="shrink-0 flex items-center gap-2">
                  <img src="https://images.seeklogo.com/logo-png/31/1/flipkart-logo-png_seeklogo-318406.png" alt="Flipkart" className="w-5 h-5 object-contain" />
                  <span className="font-subheading text-[#007CD8]">Flipkart</span>
                </div>
                <div className="shrink-0 flex items-center gap-2">
                  <img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/adobe-icon.png" alt="Adobe" className="w-5 h-5 object-contain" />
                  <span className="font-subheading text-[#FF0000]">Adobe</span>
                </div>
                <div className="shrink-0 flex items-center gap-2">
                  <img src="https://cdn.simpleicons.org/atlassian/0052CC" alt="Atlassian" className="w-5 h-5 object-contain" />
                  <span className="font-subheading text-[#0052CC]">Atlassian</span>
                </div>
                <div className="shrink-0 flex items-center gap-2">
                  <img src="https://cdn.simpleicons.org/swiggy/FC8019" alt="Swiggy" className="w-5 h-5 object-contain" />
                  <span className="font-subheading text-[#FC8019]">Swiggy</span>
                </div>
                <div className="shrink-0 flex items-center gap-2">
                  <img src="https://cdn.simpleicons.org/zomato/E23744" alt="Zomato" className="w-5 h-5 object-contain" />
                  <span className="font-subheading text-[#E23744]">Zomato</span>
                </div>
                <div className="shrink-0 flex items-center gap-2">
                  <img src="https://cdn.simpleicons.org/razorpay/0066FF" alt="Razorpay" className="w-5 h-5 object-contain" />
                  <span className="font-subheading text-[#0066FF]">Razorpay</span>
                </div>
                <div className="shrink-0 flex items-center gap-2">
                  <img src="https://cdn.simpleicons.org/phonepe/5F259F" alt="PhonePe" className="w-5 h-5 object-contain" />
                  <span className="font-subheading text-[#5F259F]">PhonePe</span>
                </div>
                <div className="shrink-0 flex items-center gap-2">
                  <img src="https://cdn.simpleicons.org/uber/000000" alt="Uber" className="w-5 h-5 object-contain" />
                  <span className="font-subheading text-[#000000]">Uber</span>
                </div>
              </InfiniteSlider>
            </div>

          </div>

          {/* Right Column: 2x2 Stat Flex Layout with Scroll Count-Up Animation */}
          <div className="w-full lg:w-[38%] flex flex-wrap justify-center lg:justify-start text-center lg:text-left gap-8 sm:gap-10 pt-8 lg:pt-0 shrink-0 pr-6 sm:pr-0">
            {stats.map((stat, idx) => (
              <div key={idx} className="w-[calc(50%-16px)] sm:w-[calc(50%-20px)] space-y-1">
                <CountUpNumber targetNumber={stat.targetNumber} suffix={stat.suffix} />
                <div className="text-xs sm:text-sm font-medium text-slate-500 font-avenue">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
