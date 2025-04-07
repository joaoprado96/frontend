// src/types.d.ts (ou direto no types.ts se já tiver)
declare module '*.svg?react' {
    import * as React from 'react';
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    export default ReactComponent;
}