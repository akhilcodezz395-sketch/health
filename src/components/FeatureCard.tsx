
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  href: string;
  className?: string;
  iconClass?: string;
}

const FeatureCard = ({
  title,
  description,
  icon,
  href,
  className,
  iconClass,
}: FeatureCardProps) => {
  return (
    <a
      href={href}
      className={cn(
        "feature-card flex flex-col items-center text-center",
        className
      )}
    >
      <div className={cn("mb-4 p-3 rounded-full", iconClass || "bg-primary/10 text-primary")}>
        {icon}
      </div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </a>
  );
};

export default FeatureCard;
