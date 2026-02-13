"use client";

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2 } from "lucide-react";

export type BootStatus = 'idle' | 'shutting-down' | 'starting-up' | 'cancelling';

interface BootScreensProps {
    status: BootStatus;
}

export default function BootScreens({ status }: BootScreensProps) {
    return (
        <AnimatePresence>
            {status !== 'idle' && (
                <motion.div
                    initial={{ filter: "blur(10px)", opacity: 0 }}
                    animate={{ filter: "blur(0px)", opacity: 1 }}
                    exit={{ filter: "blur(10px)", opacity: 0 }}
                    transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
                    className="z-[100] fixed top-0 left-1/2 -translate-x-1/2 bg-background h-screen w-full max-w-2xl overflow-y-auto"
                >
                    <div className='flex items-center justify-center h-screen gap-3 text-lg font-medium tracking-wide'>
                        {status === 'shutting-down' && "Shutting Down"}
                        {status === 'starting-up' && "Starting Up"}
                        {status === 'cancelling' && "Cancelling..."}

                        {status !== 'cancelling' && (
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            >
                                <Loader2 size={20} className="text-foreground" />
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
