import { redirect } from "next/navigation";

export default function AtsAnalysisPage() {
    // Redirect to the main page's upload section
    redirect("/#upload");
}