import React from 'react'
import { constructMetadata } from "@/lib/metadata"
import ProjectsGallery from '@/components/projects/ProjectsGallery'
import { GoBack } from '@/components/ui/GoBack'

export const metadata = constructMetadata({
    title: "Work & Projects",
    description: "Explore a curated selection of digital products, branding systems, and intuitive user interfaces built with precision and modern technology by Jay Singh Chauhan.",
    canonical: "/projects",
})

export default function ProjectsPage() {
    return (
        <div className='w-full pb-32 max-w-7xl mx-auto'>
            <div className='mt-20 flex flex-col gap-10'>
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
                <ProjectsGallery />
            </div>
        </div>
    )
}