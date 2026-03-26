"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { TEMPLATES, getTemplateById } from "@/lib/templates.config";
import { ResumeData } from "@/lib/types";

interface ResumePreviewProps {
  data: ResumeData;
  template: string;
}

export const ResumePreview = React.memo(({ data, template }: ResumePreviewProps) => {
  const selectedTemplateConfig = getTemplateById(template);
  const SelectedTemplate = selectedTemplateConfig?.component || TEMPLATES[0].component;

  return (
    <div className="text-black bg-white" id="resume-preview">
      <div
        className={cn(
          "w-full min-h-[297mm] h-auto mx-auto bg-white shadow-2xl transition-all duration-300",
          "print:shadow-none print:w-full print:h-full print:m-0"
        )}
      >
        <SelectedTemplate data={data} />
      </div>
    </div>
  );
});

ResumePreview.displayName = "ResumePreview";
