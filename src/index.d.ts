import React from "react";

export interface AccordionProps {
    id: string;
    activeIndex: number;
    multiple: boolean;
    children: React.ReactNode;
    onTabChange: () => void;
}