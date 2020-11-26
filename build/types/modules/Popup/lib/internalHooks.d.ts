import * as React from 'react';
import { Placement } from '@popperjs/core';
import { Modifier, StrictModifierNames } from 'react-popper';
import { PortalProps } from '@appbuckets/react-ui-core';
import { PopupPosition, PopupProps } from '../Popup.types';
declare type PopperModifiers = Modifier<StrictModifierNames>;
/**
 * Return memoized PortalProps using user defined portal props and
 * some other props value
 * @param portalProps User defined PortalProps
 * @param rest All PopupProps
 */
export declare function usePortalProps(
  portalProps: PortalProps | undefined,
  rest: PopupProps
): PortalProps;
export declare function usePopperPlacementMapping(
  position?: PopupPosition
): Placement;
/**
 * Merge user defined modifiers with default popper modifiers
 *
 * @param defaultModifiers An array of default modifiers
 * @param userDefinedModifiers The user default modifiers
 * @param deps An array of dependencies to append to useMemo
 */
export declare function usePopperModifiers(
  defaultModifiers: ReadonlyArray<PopperModifiers>,
  userDefinedModifiers: ReadonlyArray<PopperModifiers>,
  deps: ReadonlyArray<any>
): PopperModifiers[];
export declare function useReferenceProxy(
  reference: React.RefObject<HTMLElement> | HTMLElement | null
): HTMLElement;
export {};
