import React, { PropsWithChildren } from "react";
export default function MockNextLink(
  props: PropsWithChildren<{ href: string }>
) {
  // eslint-disable-next-line jsx-a11y/anchor-is-valid
  return <a {...props}>{props.children}</a>;
}
