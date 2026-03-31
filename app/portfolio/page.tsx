"use client"

import React, { useState, useRef, useEffect } from 'react'
import { GoBack } from '@/components/ui/GoBack'
import Image from 'next/image'
import { motion } from 'motion/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ImageLightbox } from '@/components/ui/ImageLightbox'

const PROJECTS = [
    {
        title: "Focas - AI Scheduling Assistant",
        description: "A daily habit-tracking and scheduling application powered by AI to help users optimize their productivity and maintain a balanced lifestyle.",
        images: [
            "/designs/focas/Focas.png",
            "/designs/focas/Slide%2016_9%20-%202.png",
            "/designs/focas/Slide%2016_9%20-%203.png",
        ]
    },
    {
        title: "Mevasa - Modern Baby Products",
        description: "An exquisitely animated and modern e-commerce platform for baby products, using playful motion and a soft aesthetic to appeal to young parents.",
        images: [
            "/designs/mevasa/Mevasa%20-%20Homepage.png",
            "/designs/mevasa/Mevasa%20Design.png",
            "/designs/mevasa/Mevasa%20hero.png",
            "/designs/mevasa/Product%20Page.png",
            "/designs/mevasa/Product%20page%20%231.png",
        ]
    },
    {
        title: "Medi-Ecom - Digital Pharmacy",
        description: "A secure and user-friendly online pharmaceutical platform, providing a seamless medical shopping experience with a clean, trustworthy interface.",
        images: [
            "/designs/medi-ecom/medi-ecom%20-%20hero.png",
            "/designs/medi-ecom/medi-ecom%20-%20homepage.png",
        ]
    },
    {
        title: "Reflecto - Lighting & Ray Study",
        description: "An experimental Figma project exploring advanced lighting effects, ray tracing, and realistic reflections in digital interface design.",
        images: [
            "/designs/reflecto/Reflecto%20dribble%20shot%20%231.png",
        ]
    },
    {
        title: "Toastloshi - Artisan Bakery",
        description: "A sensory digital experience for a luxury bakery, focusing on premium food photography and an elegant layout that captures the essence of artisanal baking.",
        images: [
            "/designs/toastloshi/toastloshi%20-%20hero.png",
            "/designs/toastloshi/toastloshi%20-%20homepage.png",
            "/designs/toastloshi/about%20us.png",
            "/designs/toastloshi/envolope.png",
            "/designs/toastloshi/gallery.png",
        ]
    },
    {
        title: "Hosting Solutions - Server Infrastructure",
        description: "Comprehensive landing and service pages for a professional hosting provider, designed to communicate reliability and high-performance infrastructure.",
        images: [
            "/designs/hosting/Green%20Hosting%20-%20Hero.png",
            "/designs/hosting/Green%20Hosting%20-%20Homepage.png",
            "/designs/hosting/features.png",
            "/designs/hosting/services.png",
        ]
    },
    {
        title: "Floragao - Flower & Bokeh Shop",
        description: "A beautiful online marketplace for flowers and bespoke bouquets, featuring a vibrant design that highlights the artistry of floral arrangements.",
        images: [
            "/designs/Floragao/floragao-hero.png",
            "/designs/Floragao/floragao-homepage.png",
            "/designs/Floragao/categories.png",
            "/designs/Floragao/features.png",
            "/designs/Floragao/shop.png",
        ]
    },
    {
        title: "Tevino Men - Luxury Fashion",
        description: "A premium menswear brand based in New Delhi, featuring a high-end web presence that reflects the exclusivity and sophistication of its luxury clothing lines.",
        images: [
            "/designs/Tevino/Tevino%20dribble%20shot%20%231.png",
            "/designs/Tevino/Tevino%20dribble%20shot%20%232.png",
            "/designs/Tevino/Tevino%20dribble%20shot.png",
        ]
    },
    {
        title: "Talent Velocity - HR Solutions",
        description: "A robust recruitment and human resources platform built for the Indian market, connecting top talent with industry-leading organizations.",
        images: [
            "/designs/Talent%20Velocity/Talent%20.png",
            "/designs/Talent%20Velocity/Talent%20Velocity%20-%20hero.png",
        ]
    }
]

// Layout Constants
const ACTIVE_HEIGHT = 310;
const INACTIVE_HEIGHT = 180;
const RATIO = 1.338;
const ACTIVE_WIDTH = ACTIVE_HEIGHT * RATIO;
const INACTIVE_WIDTH = INACTIVE_HEIGHT * RATIO;
const ITEM_GAP = 32;

export default function Portfolio() {
    return (
        <div className='w-full pb-32 max-w-7xl mx-auto'>
            <div className='mt-20 flex flex-col gap-12'>
                <div className='flex flex-col gap-6 mb-8 sm:text-left'>
                    <div className='w-fit'>
                        <GoBack />
                    </div>
                    <div className='flex flex-col gap-2 mt-4'>
                        <h1 className='text-2xl tracking-tighter text-foreground'>Portfolio</h1>
                        <p className="text-foreground/50 text-base md:text-lg leading-relaxed">
                            A curated selection of digital products, branding systems, and intuitive user interfaces built with precision and modern technology.
                        </p>
                    </div>
                </div>

                <div className='flex flex-col gap-24'>
                    {PROJECTS.map((project, index) => (
                        <PortfolioCard key={index} project={project} />
                    ))}
                </div>
            </div>
        </div>
    )
}

const PortfolioCard = ({ project }: { project: typeof PROJECTS[0] }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMounted, setIsMounted] = useState(false);
    const [translateX, setTranslateX] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Calculate translation for desktop - Stable dependency array
    useEffect(() => {
        if (typeof window !== 'undefined' && window.innerWidth >= 768) {
            let offset = 0;
            for (let i = 0; i < activeIndex; i++) {
                offset += INACTIVE_WIDTH + ITEM_GAP;
            }
            setTranslateX(-offset);
        }
    }, [activeIndex]);

    const navigateToImage = (index: number) => {
        const actualIndex = (index + project.images.length) % project.images.length;
        setActiveIndex(actualIndex);

        if (typeof window !== 'undefined' && window.innerWidth < 768 && scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const children = container.children;
            if (children[actualIndex]) {
                const target = children[actualIndex] as HTMLElement;
                const offset = target.offsetLeft - (container.clientWidth / 2) + (target.clientWidth / 2);
                container.scrollTo({ left: offset, behavior: 'smooth' });
            }
        }
    };

    const navigate = (direction: 'prev' | 'next') => {
        const nextIdx = direction === 'prev' ? activeIndex - 1 : activeIndex + 1;
        navigateToImage(nextIdx);
    }

    if (!isMounted) return <div className='h-[500px]' />;

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const displayImages = [...project.images, ...project.images];

    return (
        <div className='flex flex-col group/card relative'>
            <div className='flex flex-col gap-2 px-4 sm:px-0'>
                <h2 className='text-lg font-medium tracking-tight'>{project.title}</h2>
                <p className="text-foreground/60 text-base leading-relaxed max-w-2xl">
                    {project.description}
                </p>
            </div>

            {/* Container */}
            <div className={`relative w-full h-[360px] flex items-center overflow-hidden`}>
                <motion.div
                    ref={scrollContainerRef}
                    initial={false}
                    className={`flex gap-4 sm:gap-8 items-end h-full w-full ${isMobile ? 'overflow-x-auto no-scrollbar snap-x snap-mandatory px-4' : ''}`}
                    animate={!isMobile ? { x: translateX } : {}}
                    transition={{ type: "spring", stiffness: 150, damping: 25, mass: 0.5 }}
                >
                    {(isMobile ? project.images : displayImages).map((img: string, i: number) => {
                        const isPrimary = i < project.images.length;
                        const isActive = isPrimary && i === activeIndex;

                        const currentHeight = isActive ? ACTIVE_HEIGHT : INACTIVE_HEIGHT;
                        const mobileWidth = "calc(100vw - 48px)";
                        const desktopWidth = isActive ? `${ACTIVE_WIDTH}px` : `${INACTIVE_WIDTH}px`;

                        return (
                            <motion.div
                                key={i}
                                layout
                                initial={false}
                                onClick={() => {
                                    if (isPrimary && !isActive) {
                                        navigateToImage(i);
                                    } else if (!isPrimary) {
                                        navigateToImage(i % project.images.length);
                                    }
                                }}
                                className={`relative shrink-0 cursor-pointer overflow-hidden rounded-3xl border border-border/30 bg-card shadow-sm flex items-end justify-center ${isMobile ? 'snap-center' : ''}`}
                                style={{ width: isMobile ? mobileWidth : 'auto' }}
                                animate={{
                                    height: `${currentHeight}px`,
                                    width: isMobile ? mobileWidth : desktopWidth,
                                    opacity: isActive ? 1 : 0.45,
                                    scale: isActive ? 1 : 0.98,
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 220,
                                    damping: 24,
                                    mass: 0.8
                                }}
                            >
                                <div className="relative w-full h-full">
                                    {isActive ? (
                                        <ImageLightbox src={img} alt={`${project.title} - ${i}`}>
                                            <div className="relative w-full h-full cursor-zoom-in">
                                                <Image
                                                    src={img}
                                                    alt={project.title}
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 768px) 100vw, 33vw"
                                                />
                                            </div>
                                        </ImageLightbox>
                                    ) : (
                                        <div className="relative w-full h-full">
                                            <Image
                                                src={img}
                                                alt={project.title}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                            />
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )
                    })}
                </motion.div>
            </div>

            {/* Navigation Controls */}
            <div className="mt-8 flex items-center justify-between w-full max-w-5xl px-4 sm:px-0">
                {/* Horizontal Rectangles on Left */}
                <div className="flex gap-2 items-center">
                    {project.images.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => navigateToImage(i)}
                            className="group relative py-2 px-1"
                        >
                            <motion.div
                                className={`h-[4px] rounded-full transition-all duration-500 ease-out ${activeIndex === i
                                    ? 'bg-foreground w-12'
                                    : 'bg-foreground/15 w-8 group-hover:bg-foreground/30'
                                    }`}
                            />
                        </button>
                    ))}
                </div>

                {/* Arrows on Right */}
                <div className='flex items-center gap-4'>
                    <button
                        onClick={() => navigate('prev')}
                        className="text-foreground/40 hover:text-foreground hover:bg-foreground/5 p-2 rounded-full transition-all duration-300"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={() => navigate('next')}
                        className="text-foreground/40 hover:text-foreground hover:bg-foreground/5 p-2 rounded-full transition-all duration-300"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>
        </div>
    )
}
