import { LucideIcon } from "lucide-react";

interface BannerPlaceholderProps {
    title: string;
    icon: LucideIcon;
    gradient?: string;
}

const BannerPlaceholder = ({
    title,
    icon: Icon,
    gradient = "from-primary/20 via-primary/10 to-accent/20"
}: BannerPlaceholderProps) => {
    return (
        <div
            className={`flex h-full w-full items-center justify-center bg-gradient-to-r ${gradient}`}
            style={{ minHeight: "200px" }}
        >
            <div className="flex items-center gap-4 text-foreground/80">
                <Icon className="h-16 w-16" strokeWidth={1.5} />
                <div>
                    <p className="text-2xl font-bold uppercase tracking-tight">{title}</p>
                    <p className="text-sm text-muted-foreground">Banner promocional</p>
                </div>
            </div>
        </div>
    );
};

export default BannerPlaceholder;
