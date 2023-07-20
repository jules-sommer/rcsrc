export const PrimaryTitleText = ({ children, className = '' }) => {
    return (
        <h1 className={`text-sky-100 text-4xl font-mono mb-16 ${className}`}>
            {children}
        </h1>
    );
};

export const PrimaryBodyText = ({ children, className = '' }) => {
    return (
        <p className={`text-sm leading-8 text-sky-100/60 subpixel-antialiased ${className}`}>
            {children}
        </p>
    );
};

export const SecondaryTitleText = ({ children, className = '' }) => {
    
    return (
        <h2 className={`text-sky-100/75 text-2xl font-sans leading-loose tracking-wide mb-6 ${className}`}>
            {children}
        </h2>
    );
};

export const SecondaryBodyText = ({ children, className = '' }) => {
    return (
        <p className={`text-sm leading-8 text-sky-100/60 subpixel-antialiased ${className}`}>
            {children}
        </p>
    );
};