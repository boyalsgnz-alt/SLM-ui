import {ReactNode} from "react";
import './GlassEffectContainer.css';

interface GECProps {
    children: ReactNode;
    classes?: string;
}

export default function GlassEffectContainer({classes, children}: GECProps) {
    return (
        <div className={`glass-effect-container ${classes ?? ""}`} >
            {children}
        </div>
    );
}