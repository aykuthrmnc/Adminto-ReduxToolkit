import SimpleBar, { Props } from 'simplebar-react';

type ScrollbarProps = Props & {
    className?: string;
    style?: Record<string, unknown>;
    children?: unknown;
};

const Scrollbar = ({ className, style, children, ...otherProps }: ScrollbarProps) => {
    return (
        <SimpleBar className={className} style={style} {...otherProps}>
            {children}
        </SimpleBar>
    );
};

export default Scrollbar;
