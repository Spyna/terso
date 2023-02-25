import React from "react";
import { Link as ReactouRouterLink } from "react-router-dom";

export type LinkProps = {
  href: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

/**
 * The public API for rendering a history-aware.
 * 
 * @returns a link to navigate to a route
 * @example 
 * <Link href="/posts">Posts</Link>
 * <Link href="/post/:id">Post Xyz</Link>
 * 
 */
export default function Link({ href, children }: LinkProps) {
  return <ReactouRouterLink to={href}>{children}</ReactouRouterLink>;
}
