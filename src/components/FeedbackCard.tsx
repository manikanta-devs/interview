import { Lightbulb } from "lucide-react";

interface FeedbackCardProps {
  title: string;
  message: string;
  type?: "tip" | "warning" | "success";
}

const FeedbackCard = ({ title, message, type = "tip" }: FeedbackCardProps) => {
  const borderColor = type === "success"
    ? "border-success/30"
    : type === "warning"
    ? "border-warning/30"
    : "border-primary/30";

  return (
    <div className={`glass-card rounded-xl p-4 border ${borderColor}`}>
      <div className="flex items-start gap-3">
        <Lightbulb className="w-5 h-5 text-primary mt-0.5 shrink-0" />
        <div>
          <p className="font-semibold text-sm text-foreground mb-1">{title}</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default FeedbackCard;
