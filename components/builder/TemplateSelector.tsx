"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { TEMPLATES, TemplateId } from "@/lib/templates.config";
import { PremiumGate, PremiumBadge } from "@/components/shared/PremiumGate";
import { Lock } from "lucide-react";

export type { TemplateId };

interface TemplateSelectorProps {
    selectedId: string;
    onSelect: (id: TemplateId) => void;
}

export function TemplateSelector({ selectedId, onSelect }: TemplateSelectorProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TEMPLATES.map((t, index) => {
                const isPremiumTemplate = index >= 4; // Templates 5-10
                
                const card = (
                    <button
                        key={t.id}
                        onClick={() => !isPremiumTemplate && onSelect(t.id)}
                        className={cn(
                            "relative p-4 rounded-xl border text-left transition-all duration-300 group hover:scale-[1.02] w-full",
                            selectedId === t.id
                                ? "border-primary bg-primary/10 shadow-[0_0_20px_-5px_rgba(6,182,212,0.3)]"
                                : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                        )}
                    >
                        {isPremiumTemplate && (
                            <div className="absolute top-2 right-2 z-20">
                                <PremiumBadge />
                            </div>
                        )}

                        <div className={cn(
                            "mb-3 w-10 h-10 rounded-lg flex items-center justify-center text-white", 
                            t.color,
                            isPremiumTemplate && "blur-[1px]"
                        )}>
                            {isPremiumTemplate ? <Lock className="h-5 w-5" /> : t.icon}
                        </div>

                        <div className={cn(isPremiumTemplate && "blur-[1px]")}>
                            <h3 className={cn("font-bold text-sm", selectedId === t.id ? "text-primary" : "text-foreground")}>
                                {t.name}
                            </h3>
                            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                                {t.description}
                            </p>
                        </div>

                        {/* Active Checkmark */}
                        {selectedId === t.id && !isPremiumTemplate && (
                            <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                                <Check className="h-3 w-3" />
                            </div>
                        )}
                        
                        {isPremiumTemplate && (
                            <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="flex flex-col items-center gap-2">
                                    <Lock className="h-5 w-5 text-white" />
                                    <span className="text-[10px] font-bold text-white uppercase tracking-widest">Unlock Premium</span>
                                </div>
                            </div>
                        )}
                    </button>
                );

                if (isPremiumTemplate) {
                    return (
                        <PremiumGate key={t.id} fallback={card}>
                            {/* When the user IS premium, the PremiumGate renders the children. 
                                In this case, we want the button to be clickable normally. */}
                            <button
                                onClick={() => onSelect(t.id)}
                                className={cn(
                                    "relative p-4 rounded-xl border text-left transition-all duration-300 group hover:scale-[1.02] w-full",
                                    selectedId === t.id
                                        ? "border-primary bg-primary/10 shadow-[0_0_20px_-5px_rgba(6,182,212,0.3)]"
                                        : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                                )}
                            >
                                <div className={cn("mb-3 w-10 h-10 rounded-lg flex items-center justify-center text-white", t.color)}>
                                    {t.icon}
                                </div>
                                <h3 className={cn("font-bold text-sm", selectedId === t.id ? "text-primary" : "text-foreground")}>
                                    {t.name}
                                </h3>
                                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                                    {t.description}
                                </p>
                                {selectedId === t.id && (
                                    <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                                        <Check className="h-3 w-3" />
                                    </div>
                                )}
                            </button>
                        </PremiumGate>
                    );
                }

                return card;
            })}
        </div>
    );
}
