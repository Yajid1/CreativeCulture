interface AppLogoIconProps {
    className?: string;
}

export default function AppLogoIcon({ className }: AppLogoIconProps) {
    return (
        <img
            src="/images/Logo Pemkot.png"
            alt="Logo Pemkot Bandung"
            className={`object-contain ${className || ''}`}
        />
    );
}
