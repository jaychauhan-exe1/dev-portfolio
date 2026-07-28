import React from 'react'
import { constructMetadata } from "@/lib/metadata"
import ProjectsGallery from '@/components/projects/ProjectsGallery'
import { GoBack } from '@/components/ui/GoBack'
import projectsData from '@/content/projects.json'

export const metadata = constructMetadata({
    title: "Project Archive",
    description: "Explore the complete archive of digital products, branding systems, and intuitive user interfaces built with precision and modern technology by Jay Singh Chauhan.",
    canonical: "/archive",
})

export default function ArchivePage() {
    const featuredTitles = projectsData.featured;
    const allProjects = projectsData.projects;

    // Find all projects that are in the featured titles list
    const featuredCandidates = allProjects.filter(p => featuredTitles.includes(p.title));

    // Take the last 8 (latest 8) as active featured
    const activeFeatured = featuredCandidates.slice(-8);

    // All other projects (either never featured, or reverted) go to archive
    const archiveProjects = allProjects.filter(
        p => !activeFeatured.some(f => f.title === p.title)
    );

    // Reverse to display latest first
    const sortedArchiveProjects = [...archiveProjects].reverse();

    return (
        <div className='w-full pb-32 max-w-7xl mx-auto'>
            <div className='mt-10 lg:mt-20 flex flex-col gap-10'>
                <div className='flex flex-col gap-10 sm:text-left'>
                    <div className='w-fit'>
                        <GoBack />
                    </div>
                    <div className='flex flex-col gap-4'>
                        <h1 className='text-2xl tracking-tighter text-foreground'>Project Archive</h1>
                        <p className="text-foreground/50 text-base md:text-lg leading-relaxed max-w-3xl">
                            A complete record of past projects, experiments, and digital products designed and engineered by Jay Singh Chauhan.
                        </p>
                    </div>
                </div>
                <ProjectsGallery projects={sortedArchiveProjects} />
            </div>
        </div>
    )
}
