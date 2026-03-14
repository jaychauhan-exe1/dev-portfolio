'use client';

import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ComponentShowcaseProps {
  title: string;
  description: string;
  code: string;
  children: React.ReactNode;
}

export const ComponentShowcase = ({ title, description, code, children }: ComponentShowcaseProps) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [copied, setCopied] = useState(false);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code: ', err);
    }
  };

  return (
    <div className="flex flex-col gap-4 my-10 border border-border rounded-xl bg-background">
      <div className="p-6 pb-4 border-b border-border/50">
        <h3 className="text-xl font-bold font-cabin-sketch mb-2">{title}</h3>
        <p className="text-foreground/70 text-sm">{description}</p>
      </div>

      <div className="px-6 flex items-center justify-between">
        <div className="flex bg-border/40 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-4 py-1.5 text-sm rounded-md transition-colors ${activeTab === 'preview'
              ? 'bg-background text-foreground shadow-sm'
              : 'text-foreground/60 hover:text-foreground'
              }`}
          >
            Preview
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-4 py-1.5 text-sm rounded-md transition-colors ${activeTab === 'code'
              ? 'bg-background text-foreground shadow-sm'
              : 'text-foreground/60 hover:text-foreground'
              }`}
          >
            Code
          </button>
        </div>

        {activeTab === 'code' && (
          <button
            onClick={handleCopyCode}
            className="flex items-center gap-2 text-xs bg-border/40 hover:bg-border/60 transition-colors px-3 py-1.5 rounded-md text-foreground"
          >
            {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
            {copied ? 'Copied!' : 'Copy Code'}
          </button>
        )}
      </div>

      <div className="p-6 relative min-h-[300px] flex flex-col justify-center bg-muted/20">
        <AnimatePresence mode="wait">
          {activeTab === 'preview' ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="w-full flex justify-center items-center"
            >
              <div className="w-full max-w-full flex justify-center items-center p-4">
                {children}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="code"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="w-full h-[400px] overflow-y-auto text-sm"
            >
              <pre className="p-4 rounded-lg bg-border/40 text-foreground font-mono text-xs md:text-sm overflow-x-auto border border-border/40">
                <code>{code}</code>
              </pre>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
