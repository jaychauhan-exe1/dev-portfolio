import React from 'react';
import { getProjectBySlug, getNextProject, slugify } from '@/lib/slugify';
import { GoBack } from '@/components/ui/GoBack';
import { constructMetadata } from '@/lib/metadata';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: { params: any }) {
  const resolvedParams = await params;
  const project = getProjectBySlug(resolvedParams.slug);
  if (!project) {
    return constructMetadata({
      title: "Project Not Found",
      description: "The requested project details could not be found.",
    });
  }

  return constructMetadata({
    title: `${project.title} — Work`,
    description: project.description,
    image: project.images[0],
    canonical: `/projects/${resolvedParams.slug}`,
  });
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const project = getProjectBySlug(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  const nextProject = getNextProject(project.title);
  const nextSlug = slugify(nextProject.title);

  return (
    <div className="w-full pb-32 max-w-5xl mx-auto ">
      <div className="mt-10 lg:mt-20 flex flex-col">
        {/* Navigation Header */}
        <div className="w-fit mb-8 lg:mb-12">
          <GoBack />
        </div>

        {/* Project Header */}
        <div className="flex flex-col gap-4 mb-10 md:mb-14">
          <h1 className="text-2xl tracking-tight text-foreground">
            {project.title}
          </h1>
          <p className="text-foreground/60 text-base md:text-lg leading-relaxed max-w-3xl">
            {project.description}
          </p>
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-8 border-t border-border text-sm tracking-wide mb-14">
          <div>
            <span className="text-foreground/40 uppercase text-[12px] font-mono tracking-wider block mb-1.5">Role</span>
            <span className="text-foreground/80 text-base sm:text-base">{project.role || "N/A"}</span>
          </div>
          <div>
            <span className="text-foreground/40 uppercase text-[12px] font-mono tracking-wider block mb-1.5">Client</span>
            <span className="text-foreground/80 text-base sm:text-base">{project.client || "N/A"}</span>
          </div>
          <div>
            <span className="text-foreground/40 uppercase text-[12px] font-mono tracking-wider block mb-1.5">Year</span>
            <span className="text-foreground/80 text-base sm:text-base">{project.year || "N/A"}</span>
          </div>
        </div>

        {/* The Challenge */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 mb-16 md:mb-24">
          <div>
            <h2 className="text-sm uppercase tracking-wider text-foreground/50">
              The Challenge
            </h2>
          </div>
          <div className="md:col-span-2 flex flex-col gap-4">
            {project.challenge_title && (
              <h3 className="text-lg md:text-lg text-foreground">
                {project.challenge_title}
              </h3>
            )}
            <p className="text-foreground/70 text-base leading-relaxed whitespace-pre-line">
              {project.challenge || project.description}
            </p>
          </div>
        </div>

        {/* Stacks of Images */}
        <div className="flex flex-col gap-10 md:gap-16 border-b border-border pb-16">
          {project.images.map((image, idx) => (
            <div
              key={idx}
              className="w-full overflow-hidden rounded-2xl md:rounded-3xl border border-border/20 bg-card/20 transition-all duration-500 hover:border-border/40"
            >
              <img
                src={image}
                alt={`${project.title} screen ${idx + 1}`}
                className="w-full h-auto block object-cover"
                loading={idx === 0 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>

        {/* Next Project Bottom Navigation */}
        <div className="mt-20">
          <Link
            href={`/projects/${nextSlug}`}
            className="group block relative w-full aspect-[4/3] md:aspect-[16/10] hover:shadow-lg border border-border overflow-hidden rounded-3xl transition-all duration-500"
          >
            {nextProject.images[0] && (
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <img
                  src={nextProject.images[0]}
                  alt={nextProject.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                {/* Gradient overlay to ensure text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-background via-transparent to-transparent"></div>
              </div>
            )}

            <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 sm:p-8 md:p-10">
              <div className="flex flex-col gap-1 max-w-lg">
                <h3 className="text-xl sm:text-lg md:text-xl tracking-tight text-foreground leading-tight">
                  {nextProject.title}
                </h3>
                <div className="mt-2">
                  <span className="text-xs sm:text-sm text-foreground/70 underline underline-offset-4 decoration-foreground/20 group-hover:text-foreground/80 group-hover:decoration-foreground/40 transition-all duration-300">
                    View Next Project
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>

      </div>
    </div>
  );
}
