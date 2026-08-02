import React from 'react'

export const GradientButton = ({ className, children }: { className?: string, children: React.ReactNode }) => {
  return (
    <button className={`${className} cursor-pointer font-medium relative px-10 py-3 group overflow-hidden rounded-full bg-foreground text-background hover:bg-background hover:text-foreground dark:hover:bg-foreground dark:hover:text-background transition-colors duration-300`}>
      <div className="absolute inset-0 z-0">
        <div
          className="absolute h-2 w-[80%] bg-[#26F9D6] blur-lg rounded-full group-hover:h-40 group-hover:w-40 transition-all duration-300"
          style={{
            offsetPath: "rect(0% 100% 100% 0% round 9999px)",
            animation: "move-around 4s linear infinite"
          }}
        />
        <div
          className="absolute h-2 w-[90%] bg-[#E1BFFF] blur-lg rounded-full group-hover:h-40 group-hover:w-40 transition-all duration-300"
          style={{
            offsetPath: "rect(0% 100% 100% 0% round 9999px)",
            animation: "move-around 4s linear infinite",
            animationDelay: "-2s"
          }}
        />
      </div>
      <span className='relative z-1'>{children}</span>
    </button>
  )
}
