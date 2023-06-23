import { PropTypes } from 'prop-types';

export const PrimaryTitleText = ({ children }) => {
    return (
        <h1 className="text-sky-100 text-4xl font-mono mb-16">
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

    SecondaryTitleText.defaultProps = {
        className: '',
    };

    SecondaryTitleText.propTypes = {
        children: PropTypes.node.isRequired,
        className: PropTypes.string,
    };

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