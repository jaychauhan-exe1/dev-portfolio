import React from 'react'

export const RawData = () => {
    return (
        <div className="flex flex-col gap-4 p-8">
            <div>
                <h1 className="text-xl">
                    Jay Singh Chauhan
                </h1>

            </div>
            <p>
                I’m a developer who enjoys <span className="underline">building things</span> that are simple, reliable, and easy to use. I focus on getting the details right and making sure things work smoothly—both for the people using them and for the systems behind the scenes.
            </p>
            <h4 className="font-medium">
                Experience
            </h4>
            <ul className="">

                <li className="w-fit pl-4">
                    <a href="https://www.fiverr.com/sellers/jaychauhan123/" className="underline underline-offset-2 hover:decoration-foreground/50 transition-colors duration-300">
                        Fiverr
                    </a>
                    - 4 years
                </li>
                <li className="pl-4">
                    Graphic Design - 1 year
                </li>
                <li className="pl-4">
                    Aciony Studio - 3 years
                </li>
            </ul>
            <h4 className="font-medium">
                Work
            </h4>
            <ul className="">
                <li className="pl-4">
                    <a href="https://www.fiverr.com/sellers/jaychauhan123/" className="underline underline-offset-2 hover:decoration-foreground/50 transition-colors duration-300">
                        Better Reports - Business analytics and reporting platform
                    </a>
                </li>
                <li className="pl-4">
                    <a href="https://www.better-reports.vercel.app/" className="underline underline-offset-2 hover:decoration-foreground/50 transition-colors duration-300">
                        Better Mobility - Android app for salesmen
                    </a>
                </li>
                <li className="pl-4">
                    <a href="https://www.think-file.vercel.app/" className="underline underline-offset-2 hover:decoration-foreground/50 transition-colors duration-300">
                        Think File - AI based file study platform
                    </a>
                </li>
                <li className="pl-4">
                    Manager - AI based project management system (working)
                </li>
            </ul>
            <h4 className="font-medium">
                Contact
            </h4>
            <a href="mailto:jaychauhan.exe@gmail.com" className="font-semibold underline underline-offset-2 hover:decoration-foreground/50 transition-colors duration-300">
                jaychauhan.exe@gmail.com
            </a>
        </div>
    )
}
