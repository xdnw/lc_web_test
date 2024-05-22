import { ReactNode } from "react";

interface MyProps { }

function Nested(props: React.PropsWithChildren<MyProps>) {
  return <div>before {props.children} after</div>;
}

export default Nested;