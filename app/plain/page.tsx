import { constructMetadata } from "@/lib/metadata"

export const metadata = constructMetadata({
  title: "Minimal Index",
  description: "A fast, accessible, and clutter-free minimalist version of Jay Singh Chauhan's portfolio for efficient reading of experience and projects.",
  canonical: "/plain",
})

export default function Plain() {
  return (
    <div className="flex flex-col gap-4 p-8">
      <div>
        <h1 className="text-xl">
          Jay Singh Chauhan
        </h1>

      </div>
      <p>
        I’m a full stack <a href="https://www.ibm.com/think/topics/product-engineering" className="underline underline-offset-2"> product engineer </a> and designer who enjoys building things that are simple, reliable, and easy to use. I focus on getting the details right and making sure things work smoothly—both for the people using them and for the systems behind the scenes.
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
          <a href="https://www.insightsmafia.com" className="underline underline-offset-2 hover:decoration-foreground/50 transition-colors duration-300">
            Graphics & UI/UX Designer
          </a>
          - 1 year
        </li>
        {/* <li className="pl-4">
          Aciony Studio - 1 year
        </li> */}
      </ul>
      <h4 className="font-medium">
        Work & Projects
      </h4>
      <ul className="flex flex-col gap-1">
        <li className="pl-4">
          Train station web design concept - A concept inspired by Changi Airport in Singapore
        </li>
        <li className="pl-4">
          Focas - AI Scheduling Assistant powered by AI to optimize productivity
        </li>
        <li className="pl-4">
          <a href="https://mevasa.in" className="underline underline-offset-2 hover:decoration-foreground/50 transition-colors duration-300">
            Mevasa - Modern baby products e-commerce platform
          </a>
        </li>
        <li className="pl-4">
          <a href="https://www.think-file.vercel.app/" className="underline underline-offset-2 hover:decoration-foreground/50 transition-colors duration-300">
            Think File - AI based document intelligence and RAG application
          </a>
        </li>
        <li className="pl-4">
          Reflecto - Experimental lighting and ray study in UI design
        </li>
        <li className="pl-4">
          Toastloshi - Sensory digital experience for a luxury bakery
        </li>
        <li className="pl-4">
          <a href="https://github.com/jaychauhan-exe1/bettermobility" className="underline underline-offset-2 hover:decoration-foreground/50 transition-colors duration-300">
            Sales Mobility - Comprehensive field sales management ecosystem
          </a>
        </li>
        <li className="pl-4">
          <a href="https://tevino.in" className="underline underline-offset-2 hover:decoration-foreground/50 transition-colors duration-300">
            Tevino Men - Premium luxury fashion web presence
          </a>
        </li>
        <li className="pl-4">
          Hosting Solutions - Professional server infrastructure and hosting pages
        </li>
        <li className="pl-4">
          <a href="https://manager-project-jay.vercel.app/" className="underline underline-offset-2 hover:decoration-foreground/50 transition-colors duration-300">
            Manager - Enterprise project collaboration and management system
          </a>
        </li>
        <li className="pl-4">
          Floraflo - Vibrant flower and bespoke bouquet marketplace
        </li>
        <li className="pl-4">
          <a href="https://talentvelocity.co.in" className="underline underline-offset-2 hover:decoration-foreground/50 transition-colors duration-300">
            Talent Velocity - HR and recruitment solutions platform
          </a>
        </li>
      </ul>
      <h4 className="font-medium">
        Contact
      </h4>
      <a href="mailto:work@jaysinghchauhan.com" className="font-semibold underline underline-offset-2 hover:decoration-foreground/50 transition-colors duration-300">
        work@jaysinghchauhan.com
      </a>
    </div>
  )
}
