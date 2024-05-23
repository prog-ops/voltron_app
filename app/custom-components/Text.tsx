import {ComponentProps, ElementType, ReactNode} from "react";

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

// DPolymorphic component props
interface HeadingProps<C extends ElementType> {
    as?: C;
    children: ReactNode;
    className?: string;
}

// Default type
type DefaultHeadingProps = HeadingProps<'h1'>;

// Default size classes for different heading levels
const sizeClasses: { [key in HeadingLevel]: string } = {
    h1: 'text-4xl',
    h2: 'text-3xl',
    h3: 'text-2xl',
    h4: 'text-xl',
    h5: 'text-lg',
    h6: 'text-base',
};

// Use this to generate any HeadingLevel
const Heading = <E extends ElementType = 'h1'>({
    as, children, className, ...restProps}: HeadingProps<E> & Omit<ComponentProps<E>, keyof HeadingProps<E>>) => {
    const Tag = as || 'h1';
    const defaultClassName = sizeClasses[Tag as HeadingLevel] || '';
    return (
        <Tag className={`${defaultClassName} ${className || ''}`} {...restProps}>
            {children}
        </Tag>
    );
};

export { Heading }
