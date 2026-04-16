import { Link } from "react-router-dom";
import { ArrowLeft, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

const PageHeader = ({ title, subtitle }: PageHeaderProps) => (
  <header className="border-b border-border">
    <div className="container mx-auto px-4 py-4 flex items-center gap-4">
      <Link to="/">
        <Button variant="ghost" size="icon">
          <ArrowLeft className="w-5 h-5" />
        </Button>
      </Link>
      <div className="flex items-center gap-2">
        <Brain className="w-6 h-6 text-primary" />
        <div>
          <h1 className="text-lg font-bold text-foreground leading-tight">{title}</h1>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
    </div>
  </header>
);

export default PageHeader;
