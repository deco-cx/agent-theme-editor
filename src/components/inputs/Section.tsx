import React from "react";
import { Card } from "../ui/card";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../ui/accordion";

interface SectionProps {
    title: string;
    description?: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
}

export const Section: React.FC<SectionProps> = ({
    title,
    description,
    children,
    defaultOpen = false,
}) => {
    return (
        <Card className="bg-white border-emerald-100 overflow-hidden">
            <Accordion
                type="single"
                collapsible
                defaultValue={defaultOpen ? "item-1" : undefined}
            >
                <AccordionItem value="item-1" className="border-0">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline cursor-pointer">
                        <div>
                            <h3 className="text-lg font-medium text-emerald-900">
                                {title}
                            </h3>
                            {description && (
                                <p className="text-sm text-emerald-600 mt-1">
                                    {description}
                                </p>
                            )}
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6">
                        {children}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </Card>
    );
};
