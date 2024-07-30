// import React, { useEffect, useRef } from "react";
// import { Virtuoso } from "react-virtuoso";

// const InnerItem = React.memo(({ children }) => {
//   return <>{children}</>;
// });

// const getListHeight = (length) => {
//   return length < 6 ? length * 40 : 240;
// };

// const MenuList = ({ options, children, getValue, ...rest }) => {
//   const virtuosoRef = useRef(null);
//   const [option] = getValue();

//   useEffect(() => {
//     if (virtuosoRef?.current) {
//       let selectedOptionIndex = 0;

//       if (option) {
//         selectedOptionIndex = options.findIndex(
//           (item) => item.value === option.value
//         );
//       }

//       virtuosoRef.current.scrollToIndex({
//         index: selectedOptionIndex,
//         align: "start",
//         behavior: "auto"
//       });
//     }
//   }, [children, virtuosoRef, options, option]);

//   return Array.isArray(children) ? (
//     <Virtuoso
//       ref={virtuosoRef}
//       overscan={{ main: 12, reverse: 12 }}
//       style={{ height: getListHeight(children.length) + "px" }}
//       totalCount={children.length}
//       itemContent={(index) => <InnerItem children={children[index]} />}
//     />
//   ) : (
//     <div>{children}</div>
//   );
// };

// export default MenuList;
