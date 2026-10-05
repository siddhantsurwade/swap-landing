import type { FC, ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';

export type NbButtonVariant = 'primary' | 'secondary';
export type NbButtonSize = 'xs' | 'sm' | 'md';

interface CommonProps {
  variant?: NbButtonVariant;
  size?: NbButtonSize;
  children: ReactNode;
  className?: string;
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsAnchor = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

export type NbButtonProps = ButtonAsButton | ButtonAsAnchor;

export const NbButton: FC<NbButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 font-bold rounded-md select-none transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-swap-primary cursor-pointer';

  const sizeClasses =
    size === 'xs'
      ? 'px-3.5 py-1 text-xs btn-nb-sm'
      : size === 'sm'
        ? 'px-4 py-2 text-sm btn-nb-sm'
        : 'px-7 py-3.5 text-base btn-nb';

  const variantClasses =
    variant === 'primary'
      ? 'bg-swap-primary text-swap-surface'
      : 'bg-swap-surface text-swap-text';

  const combinedClasses = `${baseClasses} ${variantClasses} ${sizeClasses} ${className}`.trim();

  if ('href' in props && typeof props.href === 'string') {
    const { href, ...anchorProps } = props as ButtonAsAnchor;
    return (
      <a href={href} className={combinedClasses} {...anchorProps}>
        {children}
      </a>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button type={buttonProps.type || 'button'} className={combinedClasses} {...buttonProps}>
      {children}
    </button>
  );
};

export default NbButton;
