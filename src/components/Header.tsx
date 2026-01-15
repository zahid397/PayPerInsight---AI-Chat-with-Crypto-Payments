import { BrainCircuit, Radio } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full p-4 flex justify-between items-center border-b border-white/10 bg-background/80 backdrop-blur-md z-50">
      <div className="flex items-center gap-2 text-primary font-bold text-xl tracking-widest uppercase">
        <BrainCircuit className="w-8 h-8" />
        <span className="bg-gradient-to-r from-primary to-white bg-clip-text text-transparent">
          PayPerInsight
        </span>
      </div>
      <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono tracking-wider">
        <Radio className="w-3 h-3 animate-pulse" />
        ARC TESTNET ACTIVE
      </div>
    </header>
  );
}
