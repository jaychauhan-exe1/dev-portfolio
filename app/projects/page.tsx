import React from 'react'
import { constructMetadata } from "@/lib/metadata"
import { GoBack } from '@/components/ui/GoBack'
import Image from 'next/image'
import Link from 'next/link'
import projectsData from '@/content/projects.json'
import { slugify } from '@/lib/slugify'


export const metadata = constructMetadata({
    title: "Work & Projects",
    description: "Explore a curated selection of digital products, branding systems, and intuitive user interfaces built with precision and modern technology by Jay Singh Chauhan.",
    canonical: "/projects",
})

export default function ProjectsPage() {
    const featuredTitles = projectsData.featured;
    const allProjects = projectsData.projects;

    // Find all projects that are in the featured titles list
    const featuredCandidates = allProjects.filter(p => featuredTitles.includes(p.title));

    // Take the last 8 (latest 8) as active featured
    const activeFeatured = featuredCandidates.slice(-8);

    // Reverse to display latest first
    const sortedProjects = [...activeFeatured].reverse();

    return (
        <div className='w-full pb-32 max-w-7xl mx-auto'>
            <div className='mt-10 lg:mt-20 flex flex-col gap-10'>
                <div className='flex flex-col gap-10 sm:text-left'>
                    <div className='w-fit'>
                        <GoBack />
                    </div>
                    <div className='flex flex-col gap-4'>
                        <h1 className='text-2xl tracking-tighter text-foreground'>Work & Projects</h1>
                        <p className="text-foreground/50 text-base md:text-lg leading-relaxed max-w-3xl">
                            A curated selection of digital products, branding systems, and intuitive user interfaces built with precision and modern technology.
                        </p>
                    </div>
                </div>

                {/* Projects Grid */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 mt-6'>
                    {sortedProjects.map((project, idx) => {
                        const slug = slugify(project.title);
                        return (
                            <Link href={`/projects/${slug}`} key={idx} className='flex flex-col group'>
                                {/* Image Container */}
                                <div className='relative w-full aspect-[16/10] overflow-hidden rounded-3xl border border-border/30 bg-card shadow-sm'>
                                    <Image
                                        src={project.images[0] || "/designs/ALMN/ALMN-hero-mockup.webp"}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        priority={idx < 2}
                                    />
                                </div>

                                {/* Details Container */}
                                <div className='flex justify-between items-start gap-4 mt-4 px-1'>
                                    <h2 className='text-base md:text-lg font-medium text-foreground tracking-tight'>
                                        {project.title}
                                    </h2>
                                    <span className='text-sm text-foreground/50 font-cabin-sketch whitespace-nowrap shrink-0 mt-0.5 md:mt-1'>
                                        {project.tag || (project.tags && project.tags[0]) || ''}
                                    </span>
                                </div>

                                {/* Action Container */}
                                <div className='mt-1 px-1'>
                                    <span className="text-sm underline underline-offset-4 decoration-foreground/20 group-hover:decoration-foreground transition-all duration-300 text-foreground font-medium">
                                        View Project
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </div>


                {/* Footer Section */}
                <div className="mt-20 text-center text-sm md:text-base text-foreground/50 leading-relaxed">
                    Wanna see more of my work?{' '}
                    <Link
                        href="/archive"
                        className="text-foreground underline underline-offset-4 decoration-foreground/20 hover:decoration-foreground transition-all duration-300 font-medium"
                    >
                        Click here to view Archives.
                    </Link>
                </div>
            </div>
        </div>
    )
}