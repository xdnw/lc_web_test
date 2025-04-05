// import React, {useEffect} from 'react';
// import type {DraggableSyntheticListeners} from '@dnd-kit/core';
// import type {Transform} from '@dnd-kit/utilities';

// import {Handle} from '@/components/dnd/Handle';
// import {Remove} from '@/components/dnd/Remove';
// import styles from '@/components/dnd/Item.module.css';

// import {cn} from "../../lib/utils";

// export interface Props {
//     dragOverlay?: boolean;
//     color?: string;
//     disabled?: boolean;
//     dragging?: boolean;
//     handle?: boolean;
//     handleProps?: any;
//     height?: number;
//     index?: number;
//     fadeIn?: boolean;
//     transform?: Transform | null;
//     listeners?: DraggableSyntheticListeners;
//     sorting?: boolean;
//     style?: React.CSSProperties;
//     transition?: string | null;
//     wrapperStyle?: React.CSSProperties;
//     value: React.ReactNode;
//     onRemove?(): void;
//     renderItem?(args: {
//         dragOverlay: boolean;
//         dragging: boolean;
//         sorting: boolean;
//         index: number | undefined;
//         fadeIn: boolean;
//         listeners: DraggableSyntheticListeners;
//         ref: React.Ref<HTMLElement>;
//         style: React.CSSProperties | undefined;
//         transform: Props['transform'];
//         transition: Props['transition'];
//         value: Props['value'];
//     }): React.ReactElement;
// }

// export const Item = React.memo(
//     React.forwardRef<HTMLLIElement, Props>(
//         (
//             {
//                 color,
//                 dragOverlay,
//                 dragging,
//                 disabled,
//                 fadeIn,
//                 handle,
//                 handleProps,
//                 height,
//                 index,
//                 listeners,
//                 onRemove,
//                 renderItem,
//                 sorting,
//                 style,
//                 transition,
//                 transform,
//                 value,
//                 wrapperStyle,
//                 ...props
//             },
//             ref
//         ) => {
//             useEffect(() => {
//                 if (!dragOverlay) {
//                     return;
//                 }

//                 document.body.style.cursor = 'grabbing';

//                 return () => {
//                     document.body.style.cursor = '';
//                 };
//             }, [dragOverlay]);

//             return renderItem ? (
//                 renderItem({
//                     dragOverlay: Boolean(dragOverlay),
//                     dragging: Boolean(dragging),
//                     sorting: Boolean(sorting),
//                     index,
//                     fadeIn: Boolean(fadeIn),
//                     listeners,
//                     ref,
//                     style,
//                     transform,
//                     transition,
//                     value,
//                 })
//             ) : (
//                 <li
//                     className={cn(
//                         styles.Wrapper,
//                         fadeIn && "animate-fadeIn",
//                         sorting && "z-10",
//                         dragOverlay && "z-999 scale-[1.05] shadow-lg"
//                     )}
//                     style={
//                         {
//                             ...wrapperStyle,
//                             transition: [transition, wrapperStyle?.transition]
//                                 .filter(Boolean)
//                                 .join(', '),
//                             '--translate-x': transform
//                                 ? `${Math.round(transform.x)}px`
//                                 : undefined,
//                             '--translate-y': transform
//                                 ? `${Math.round(transform.y)}px`
//                                 : undefined,
//                             '--scale-x': transform?.scaleX
//                                 ? `${transform.scaleX}`
//                                 : undefined,
//                             '--scale-y': transform?.scaleY
//                                 ? `${transform.scaleY}`
//                                 : undefined,
//                             '--index': index,
//                             '--color': color,
//                         } as React.CSSProperties
//                     }
//                     ref={ref}
//                 >
//                     <div
//                         className={cn(
//                             "relative flex grow items-center p-4 bg-white shadow-md outline-hidden rounded-md box-border list-none transform origin-center transition-shadow",
//                             dragging && "opacity-50 z-0",
//                             handle && "cursor-grab",
//                             dragOverlay && "animate-pop",
//                             disabled && "text-gray-400 bg-gray-200 cursor-not-allowed",
//                             color && "before:content-[''] before:absolute before:top-1/2 before:left-0 before:h-full before:w-1 before:bg-[var(--color)] before:transform before:-translate-y-1/2"
//                         )}
//                         style={style}
//                         data-cypress="draggable-item"
//                         {...(!handle ? listeners : undefined)}
//                         {...props}
//                         tabIndex={!handle ? 0 : undefined}
//                     >
//                         {value}
//                         <span className="flex self-start mt-[-12px] ml-auto mb-[-15px] mr-[-10px]">
//                             {onRemove ? (
//                                 <Remove className="invisible group-hover:visible" onClick={onRemove} />
//                             ) : null}
//                             {handle ? <Handle {...handleProps} {...listeners} /> : null}
//                         </span>
//                     </div>
//                 </li>
//             );
//         }
//     )
// );