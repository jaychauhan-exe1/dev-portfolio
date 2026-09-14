"use client"

import React, { useState, useRef, useEffect } from 'react'
import { GoBack } from '@/components/ui/GoBack'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronLeft, ChevronRight, Link as LinkIcon } from 'lucide-react'
import { ImageLightbox } from '@/components/ui/ImageLightbox'
import { slugify } from '@/lib/slugify'

export interface Project {
    title: string;
    description: string;
    tags: string[];
    images: string[];
    tag?: string;
    link?: string;
}

interface ProjectsGalleryProps {
    projects: Project[];
    view?: 'archive' | 'homepage';
    showTagsFilter?: boolean;
    size?: 'default' | 'small';
    layout?: 'stack' | 'side-by-side';
}

// Layout Constants
const PROJECTS_PER_PAGE = 5;

export default function ProjectsGallery({
    projects,
    view = 'archive',
    showTagsFilter = view === 'archive',
    size = view === 'homepage' ? 'small' : 'default',
    layout = view === 'homepage' ? 'side-by-side' : 'stack',
}: ProjectsGalleryProps) {
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const scrollRef = useRef<HTMLDivElement>(null);

    const allTags = Array.from(new Set((projects || []).flatMap((p) => p.tags))).sort();

    const filteredProjects = selectedTag
        ? (projects || []).filter((p) => p.tags.includes(selectedTag))
        : (projects || []);

    const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);
    const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
    const paginatedProjects = filteredProjects.slice(startIndex, startIndex + PROJECTS_PER_PAGE);

    // Reset page on tag change
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedTag]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <>
            {/* Tag Cloud */}
            {showTagsFilter && (
                <div className="flex flex-wrap gap-2 -mt-4">
                    <button
                        onClick={() => setSelectedTag(null)}
                        className={`px-4 py-1.5 rounded-full text-xs transition-all border ${!selectedTag
                            ? "bg-primary text-foreground border-primary"
                            : "border-border hover:border-primary/50 text-foreground/60"
                            }`}
                    >
                        All
                    </button>
                    {allTags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => setSelectedTag(tag)}
                            className={`px-4 py-1.5 rounded-full text-xs transition-all border ${selectedTag === tag
                                ? "bg-primary text-foreground border-primary"
                                : "border-border hover:border-primary/50 text-foreground/60"
                                }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            )}

            <div className={`flex flex-col ${layout === 'side-by-side' ? 'gap-12 mt-0' : (size === 'small' ? 'gap-16 mt-0' : 'gap-24 mt-2')}`}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={(selectedTag ?? 'all') + currentPage}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className={`flex flex-col ${layout === 'side-by-side' ? 'gap-12' : (size === 'small' ? 'gap-16' : 'gap-24')}`}
                    >
                        {paginatedProjects.map((project) => (
                            <PortfolioCard key={project.title} project={project} view={view} size={size} layout={layout} />
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="mt-20 flex justify-center items-center gap-4">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                        className={`p-2 rounded-full transition-all duration-300 ${currentPage === 1
                            ? "text-foreground/10 cursor-not-allowed"
                            : "text-foreground/40 hover:text-foreground hover:bg-foreground/5 cursor-pointer"
                            }`}
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <div className="flex gap-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`w-10 h-10 rounded-full text-sm font-medium transition-all duration-300 ${currentPage === page
                                    ? "bg-foreground text-background"
                                    : "bg-foreground/5 text-foreground/50 hover:bg-foreground/10 hover:text-foreground"
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                        className={`p-2 rounded-full transition-all duration-300 ${currentPage === totalPages
                            ? "text-foreground/10 cursor-not-allowed"
                            : "text-foreground/40 hover:text-foreground hover:bg-foreground/5 cursor-pointer"
                            }`}
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            )}
        </>
    )
}

const PortfolioCard = ({
    project,
    view = 'archive',
    size = 'default',
    layout = 'stack',
}: {
    project: Project;
    view?: 'archive' | 'homepage';
    size?: 'default' | 'small';
    layout?: 'stack' | 'side-by-side';
}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMounted, setIsMounted] = useState(false);
    const [translateX, setTranslateX] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const isHomepageView = view === 'homepage' && !isMobile;
    const isSideBySide = (layout === 'side-by-side' || view === 'homepage') && !isMobile;
    const isSmall = size === 'small' || isSideBySide;

    const ACTIVE_HEIGHT = isSideBySide ? 165 : (isSmall ? 210 : 310);
    const INACTIVE_HEIGHT = isSideBySide ? 110 : (isSmall ? 125 : 180);
    const RATIO = 1.338;
    const ACTIVE_WIDTH = ACTIVE_HEIGHT * RATIO;
    const INACTIVE_WIDTH = INACTIVE_HEIGHT * RATIO;
    const ITEM_GAP = isSideBySide ? 16 : (isSmall ? 24 : 32);

    useEffect(() => {
        setIsMounted(true);
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Calculate translation for desktop - Stable dependency array
    useEffect(() => {
        if (!isMobile) {
            let offset = 0;
            for (let i = 0; i < activeIndex; i++) {
                offset += INACTIVE_WIDTH + ITEM_GAP;
            }
            setTranslateX(-offset);
        }
    }, [activeIndex, isMobile, INACTIVE_WIDTH, ITEM_GAP]);

    const handleScroll = () => {
        if (!isMobile || !scrollContainerRef.current) return;
        
        const container = scrollContainerRef.current;
        const scrollLeft = container.scrollLeft;
        const containerWidth = container.clientWidth;
        
        // Exact calculation based on child positions
        const children = Array.from(container.children);
        const containerCenter = scrollLeft + containerWidth / 2;
        
        let closestIndex = activeIndex;
        let minDistance = Infinity;

        children.forEach((child, index) => {
            const childEl = child as HTMLElement;
            const childCenter = childEl.offsetLeft + childEl.clientWidth / 2;
            const distance = Math.abs(childCenter - containerCenter);
            
            if (distance < minDistance) {
                minDistance = distance;
                closestIndex = index;
            }
        });

        if (closestIndex !== activeIndex && closestIndex < project.images.length) {
            setActiveIndex(closestIndex);
        }
    };

    const navigateToImage = (index: number) => {
        const actualIndex = (index + project.images.length) % project.images.length;
        setActiveIndex(actualIndex);

        if (isMobile && scrollContainerRef.current) {
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

    if (!isMounted) return <div className={isSmall ? 'h-[360px]' : 'h-[500px]'} />;

    const displayImages = [...project.images, ...project.images];
    const currentImg = project.images[activeIndex] || project.images[0];

    return (
        <div className={`flex flex-col ${isSideBySide ? 'md:flex-row md:items-center md:justify-between gap-6 md:gap-8' : 'gap-4'} group/card relative`}>
            {/* Text details on left */}
            <div className={`flex flex-col gap-2.5 px-4 sm:px-0 ${isSideBySide ? 'md:flex-1 md:max-w-[58%]' : ''}`}>
                <motion.div className="group/title pr-6 w-fit" whileHover="hover">
                    <h2 className="relative text-foreground text-lg font-medium tracking-tight">
                        {project.link ? (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline underline-offset-4 decoration-foreground/20 decoration-1 hover:decoration-foreground transition-colors duration-300 ease-out"
                            >
                                {project.title}
                            </a>
                        ) : (
                            <Link
                                href={`/projects/${slugify(project.title)}`}
                                className="underline underline-offset-4 decoration-foreground/20 decoration-1 hover:decoration-foreground transition-colors duration-300 ease-out"
                            >
                                {project.title}
                            </Link>
                        )}
                        <motion.a
                            variants={{
                                initial: { opacity: 0, x: -10, scale: 0.8, rotate: -15 },
                                hover: { opacity: 1, x: 26, scale: 1, rotate: 0 }
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            href={project.link || `/projects/${slugify(project.title)}`}
                            target={project.link ? "_blank" : "_self"}
                            rel={project.link ? "noopener noreferrer" : undefined}
                            className="absolute bg-transparent opacity-0 hover:bg-border/40 p-1.5 rounded-full top-1/2 -translate-y-1/2 right-0 flex items-center justify-center transition-colors duration-200"
                        >
                            <LinkIcon size={12} className="text-foreground" />
                        </motion.a>
                    </h2>
                </motion.div>
                <p className="text-foreground/60 text-sm md:text-base leading-relaxed">
                    {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-1">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="text-[10px] uppercase tracking-wider text-foreground/40 bg-foreground/5 px-2 py-0.5 rounded border border-foreground/5"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Right side Image & Controls */}
            {isHomepageView ? (
                /* Homepage View: Single image frame, Draggable, No nav arrows */
                <div className="flex flex-col items-center w-full md:w-[240px] lg:w-[260px] shrink-0 select-none">
                    <motion.div
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.2}
                        onDragEnd={(_, info) => {
                            const threshold = 30;
                            if (info.offset.x < -threshold || info.velocity.x < -200) {
                                setActiveIndex((prev) => (prev + 1) % project.images.length);
                            } else if (info.offset.x > threshold || info.velocity.x > 200) {
                                setActiveIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
                            }
                        }}
                        style={{ cursor: 'grab' }}
                        whileTap={{ cursor: 'grabbing' }}
                        className="relative w-full h-[150px] md:h-[160px] overflow-hidden rounded-xl md:rounded-2xl border border-border/30 bg-card shadow-sm"
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                transition={{ duration: 0.25 }}
                                className="relative w-full h-full"
                            >
                                <ImageLightbox src={currentImg} alt={`${project.title} - ${activeIndex}`}>
                                    <div className="relative w-full h-full cursor-zoom-in">
                                        {currentImg.toLowerCase().endsWith('.mp4') ? (
                                            <video
                                                autoPlay
                                                loop
                                                muted
                                                playsInline
                                                className="w-full h-full object-cover pointer-events-none"
                                            >
                                                <source src={currentImg} type="video/mp4" />
                                            </video>
                                        ) : (
                                            <Image
                                                src={currentImg}
                                                alt={project.title}
                                                fill
                                                className="object-cover pointer-events-none"
                                                sizes="(max-width: 768px) 100vw, 260px"
                                                draggable={false}
                                                onDragStart={(e) => e.preventDefault()}
                                            />
                                        )}
                                    </div>
                                </ImageLightbox>
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>

                    {/* Indicator dashes ONLY (No nav arrows) */}
                    <div className="mt-3 flex items-center justify-center gap-1.5 w-full px-1">
                        {project.images.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveIndex(i)}
                                className="group relative py-1.5 px-0.5 cursor-pointer"
                            >
                                <motion.div
                                    className={`h-[3px] rounded-full transition-all duration-500 ease-out ${activeIndex === i
                                        ? 'bg-foreground w-7'
                                        : 'bg-foreground/20 w-4 group-hover:bg-foreground/40'
                                        }`}
                                />
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                /* Archive View: Multi-image horizontal slider with nav arrows */
                <div className={`flex flex-col items-center ${isSideBySide ? 'w-full md:w-[320px] lg:w-[360px] shrink-0' : 'w-full'}`}>
                    <div className={`relative w-full ${isSideBySide ? 'h-[190px]' : (isSmall ? 'h-[250px]' : 'h-[360px]')} flex items-center overflow-hidden`}>
                        <motion.div
                            ref={scrollContainerRef}
                            initial={false}
                            className={`flex gap-4 sm:gap-8 items-end h-full w-full select-none ${isMobile ? 'overflow-x-auto no-scrollbar snap-x snap-mandatory px-4' : ''}`}
                            animate={!isMobile ? { x: translateX } : {}}
                            onScroll={isMobile ? handleScroll : undefined}
                            drag={!isMobile ? "x" : false}
                            dragConstraints={!isMobile ? { left: -(project.images.length - 1) * (INACTIVE_WIDTH + ITEM_GAP), right: 0 } : undefined}
                            dragElastic={0.2}
                            onDragEnd={(_, info) => {
                                if (!isMobile) {
                                    const threshold = 50;
                                    if (info.offset.x < -threshold && activeIndex < project.images.length - 1) {
                                        navigateToImage(activeIndex + 1);
                                    } else if (info.offset.x > threshold && activeIndex > 0) {
                                        navigateToImage(activeIndex - 1);
                                    }
                                }
                            }}
                            style={{ cursor: !isMobile ? 'grab' : 'default' }}
                            whileTap={!isMobile ? { cursor: 'grabbing' } : {}}
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
                                        className={`relative shrink-0 cursor-pointer overflow-hidden rounded-2xl md:rounded-3xl border border-border/30 bg-card shadow-sm flex items-end justify-center ${isMobile ? 'snap-center snap-always' : ''}`}
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
                                        <div className="relative w-full h-full select-none pointer-events-none">
                                            {isActive ? (
                                                <ImageLightbox src={img} alt={`${project.title} - ${i}`}>
                                                    <div className="relative w-full h-full cursor-zoom-in pointer-events-auto">
                                                        {img.toLowerCase().endsWith('.mp4') ? (
                                                            <video
                                                                autoPlay
                                                                loop
                                                                muted
                                                                playsInline
                                                                className="w-full h-full object-cover"
                                                            >
                                                                <source src={img} type="video/mp4" />
                                                            </video>
                                                        ) : (
                                                            <Image
                                                                src={img}
                                                                alt={project.title}
                                                                fill
                                                                className="object-cover"
                                                                sizes="(max-width: 768px) 100vw, 33vw"
                                                                draggable={false}
                                                                onDragStart={(e) => e.preventDefault()}
                                                            />
                                                        )}
                                                    </div>
                                                </ImageLightbox>
                                            ) : (
                                                <div className="relative w-full h-full">
                                                    {img.toLowerCase().endsWith('.mp4') ? (
                                                        <video
                                                            autoPlay
                                                            loop
                                                            muted
                                                            playsInline
                                                            className="w-full h-full object-cover"
                                                        >
                                                            <source src={img} type="video/mp4" />
                                                        </video>
                                                    ) : (
                                                        <Image
                                                            src={img}
                                                            alt={project.title}
                                                            fill
                                                            className="object-cover"
                                                            sizes="(max-width: 768px) 100vw, 33vw"
                                                            draggable={false}
                                                            onDragStart={(e) => e.preventDefault()}
                                                        />
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </motion.div>
                    </div>

                    {/* Navigation Controls */}
                    <div className={`mt-3 flex items-center justify-between w-full ${isSideBySide ? 'px-1' : 'max-w-5xl px-4 sm:px-0'}`}>
                        {/* Horizontal Rectangles on Left */}
                        <div className="flex gap-1.5 items-center">
                            {project.images.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => navigateToImage(i)}
                                    className="group relative py-1.5 px-0.5"
                                >
                                    <motion.div
                                        className={`h-[3px] rounded-full transition-all duration-500 ease-out ${activeIndex === i
                                            ? 'bg-foreground w-6'
                                            : 'bg-foreground/15 w-4 group-hover:bg-foreground/30'
                                            }`}
                                    />
                                </button>
                            ))}
                        </div>

                        {/* Arrows on Right */}
                        <div className='flex items-center gap-1.5'>
                            <button
                                onClick={() => navigate('prev')}
                                className="text-foreground/40 hover:text-foreground hover:bg-foreground/5 p-1 rounded-full transition-all duration-300"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <button
                                onClick={() => navigate('next')}
                                className="text-foreground/40 hover:text-foreground hover:bg-foreground/5 p-1 rounded-full transition-all duration-300"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
