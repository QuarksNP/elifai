import { icons } from 'lucide-react';

export type IconName = keyof typeof icons;

interface IconProps {
    name: IconName;
    color?: string;
    size?: number;
    className?: string;
}

const Icon = ({ name, color, size, className }: IconProps) => {
    const LucideIcon = icons[name];

    return <LucideIcon {...{ color, size, className }} />;
};

export { Icon };