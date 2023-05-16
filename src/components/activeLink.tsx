import clsx from "clsx";
import Link, { type LinkProps } from "next/link";
import { useRouter } from "next/router";
import { type PropsWithChildren, useState, useEffect } from "react";

type ActiveLinkProps = LinkProps & {
  className?: string;
  activeClassName: string;
  inActiveClassName: string;
};

export default function ActiveLink({
  children,
  activeClassName,
  inActiveClassName,
  className,
  ...props
}: PropsWithChildren<ActiveLinkProps>) {
  const [isActive, setIsActive] = useState(false);
  const { asPath, isReady } = useRouter();

  useEffect(() => {
    // Check if the router fields are updated client-side
    if (isReady) {
      // Dynamic route will be matched via props.as
      // Static route will be matched via props.href
      const linkPathname = new URL(
        (props.as || props.href) as string,
        location.href
      ).pathname;

      // Using URL().pathname to get rid of query and hash
      const activePathname = new URL(asPath, location.href).pathname;
      setIsActive(linkPathname === activePathname);
    }
  }, [
    asPath,
    isReady,
    props.as,
    props.href,
    activeClassName,
    className,
    setIsActive,
  ]);

  return (
    <Link
      className={clsx(
        isActive ? activeClassName : inActiveClassName,
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
