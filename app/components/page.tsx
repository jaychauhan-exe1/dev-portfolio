import fs from 'fs';
import path from 'path';
import { ComponentShowcase } from '@/components/ui/ComponentShowcase';
import { Navbar } from '@/components/ui/Navbar';
import TechStack from '@/components/ui/TechStack';
import { Tooltip } from '@/components/ui/Tooltip';
import ExpandableContent from '@/components/expandableContent';
import { CatCursorWrapper } from '@/components/ui/CatCursorWrapper';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
    title: 'Components | Jay Singh Chauhan',
    description: 'A collection of custom components built for this portfolio.',
};

export default function ComponentsPage() {
    const getComponentCode = (filePath: string) => {
        try {
            return fs.readFileSync(path.join(process.cwd(), filePath), 'utf8');
        } catch (e) {
            return 'Code not found...';
        }
    };

    const navbarCode = getComponentCode('components/ui/Navbar.tsx');
    const catCursorCode = getComponentCode('components/ui/CatCursor.tsx');
    const techStackCode = getComponentCode('components/ui/TechStack.tsx');
    const tooltipCode = getComponentCode('components/ui/Tooltip.tsx');
    const expandableContentCode = getComponentCode('components/expandableContent.tsx');

    const expandableDummyData = [
        {
            title: 'Aaj nahi kal baat karte hai',
            year: 'Pakka Promise',
            description: 'Lorem Ipsum is the best text placeholder ever. Kyuki isse accha text placeholder koi nahi hai. Aur jab aaj baat hi nahi karni to placeholder lagana pad jata hai. \n\n Isiliye kalse placeholder nahi par kal to kabhi aata hi nahi hai, ye to kuch gadbad hai.',
        },
        {
            title: 'Kal to aaj se accha hoga',
            year: 'Sahi mein?',
            description: 'Jab kal aaj se accha hoga to aaj kal se accha kyu nahi ho sakta? Isiliye kal par mat टालो, aaj hi baat karte hai. Bery gud beta. Kal se kuch to naya hoga jab aaj kuch naya nahi hua to.\n\n Aaj to yehi hona tha isiliye kal kisne dekha hai jo karna hai aaj hi karo aur kuch to dhang se likhlo yaha ',
        }
    ];

    return (
        <div className="flex flex-col max-w-4xl mx-auto pb-10 mt-20">
            <div className='flex flex-col gap-6'>
                <Link className='flex gap-1 items-center mb-10' href="/">
                    <ArrowLeftIcon size={12} />
                    <span className='text-sm underline'>Go back</span>
                </Link>
            </div>
            <div className="mb-10">
                <h1 className="text-2xl mb-4">UI Components</h1>
                <p className="text-foreground/70">
                    A collection of the custom components used across my portfolio.
                    Feel free to view the source code and use them in your own projects!
                </p>
            </div>

            <div className="flex flex-col gap-10">
                <ComponentShowcase
                    title="Navbar"
                    description="A floating, sticky navigation bar with fluid spring animations. Includes a dynamic boot/shutdown animation when navigating."
                    code={navbarCode}
                >
                    <div className="relative w-full h-[200px] bg-border/20 rounded-xl overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-x-0 bottom-4 pointer-events-auto transform-none flex justify-center">
                            <Navbar isDemo={true} className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-border/20 border p-2 rounded-full border-border dark:border-border backdrop-blur-sm z-50 pointer-events-auto" />
                        </div>
                    </div>
                </ComponentShowcase>

                <ComponentShowcase
                    title="Tech Stack Orbit"
                    description="An animated orbiting tech stack component. It displays languages and tools in continuous rotating circles using purely CSS/Framer Motion."
                    code={techStackCode}
                >
                    <div className="w-full flex justify-center py-10 transform scale-75 md:scale-100">
                        <TechStack />
                    </div>
                </ComponentShowcase>

                <ComponentShowcase
                    title="Expandable Content"
                    description="An accordion-style list element that expands and collapses content with a smooth layout transition. Perfect for experience or FAQs."
                    code={expandableContentCode}
                >
                    <div className="w-full max-w-2xl px-4">
                        <ExpandableContent items={expandableDummyData} />
                    </div>
                </ComponentShowcase>

                <ComponentShowcase
                    title="Tooltip"
                    description="A highly responsive tooltip wrapper component. Supports dynamic positioning and slick fade-in animations."
                    code={tooltipCode}
                >
                    <div className="flex gap-10">
                        <Tooltip content="I am a simple tooltip!">
                            <button className="px-4 py-2 bg-foreground text-background rounded-md">Hover me</button>
                        </Tooltip>
                        <Tooltip content="Another one!">
                            <button className="px-4 py-2 border border-border rounded-md hover:bg-border/50 transition-colors">Or me</button>
                        </Tooltip>
                    </div>
                </ComponentShowcase>

                <ComponentShowcase
                    title="Cat Cursor"
                    description="A playful custom cursor component featuring Tom the cat interacting dynamically with mouse movements and clicks. Works best on desktop."
                    code={catCursorCode}
                >
                    <div className="w-full h-[300px] flex items-center justify-center border border-dashed border-border/50 rounded-xl relative overflow-hidden bg-background">
                        <p className="text-foreground/50 z-10 pointer-events-none">Interact within this box with the cat cursor!</p>
                        {/* We render a sandboxed instance of the CatCursor strictly for this preview box */}
                        <div className="absolute inset-0 z-0">
                            <CatCursorWrapper variant="black" forceActive={true} contained={true} />
                        </div>
                    </div>
                </ComponentShowcase>
            </div>
        </div>
    );
}