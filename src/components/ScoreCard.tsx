interface ScoreCardProps {
  label: string;
  score: number;
  icon: React.ReactNode;
  color?: string;
}

const ScoreCard = ({ label, score, icon, color }: ScoreCardProps) => {
  const getBarColor = () => {
    if (score >= 75) return "bg-success";
    if (score >= 50) return "bg-warning";
    return "bg-destructive";
  };

  return (
    <div className="glass-card rounded-xl p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
          {icon}
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold text-foreground">{score}<span className="text-sm text-muted-foreground">/100</span></p>
        </div>
      </div>
      <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${getBarColor()}`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
};

export default ScoreCard;
