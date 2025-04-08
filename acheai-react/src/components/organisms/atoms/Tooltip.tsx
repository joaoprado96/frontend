import { tw } from '@/utils/tw';
import { debounce } from 'lodash';
import {
  Children,
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { createPortal } from 'react-dom';

const styles = tw`
  fixed

  bg-white
  border border-gray-200
  
  px-2 py-1
  
  rounded shadow transition
  
  text-gray-800
  
  text-sm
  
  z-10
  
  min-w-max

  invisible opacity-0

  data-[peer-hover=true]:visible
  data-[peer-hover=true]:opacity-100
`;

type TooltipProps = {
  label: string;
  children: React.ReactNode;
  when?: boolean;
};

function getPositionForAllCorners(
  tooltipRect: DOMRect,
  peerRect: DOMRect,
  spacing = 4,
) {
  return {
    left: {
      top: peerRect.top + peerRect.height / 2 - tooltipRect.height / 2,
      left: peerRect.left - tooltipRect.width - spacing,
    },
    bottom: {
      top: peerRect.top + peerRect.height + spacing,
      left: peerRect.left + peerRect.width / 2 - tooltipRect.width / 2,
    },
    right: {
      top: peerRect.top + peerRect.height / 2 - tooltipRect.height / 2,
      left: peerRect.left + peerRect.width + spacing,
    },
    top: {
      top: peerRect.top - tooltipRect.height - spacing,
      left: peerRect.left + peerRect.width / 2 - tooltipRect.width / 2,
    },
  };
}

function getBestPosition(
  tooltipRect: DOMRect,
  positions: Record<string, { top: number; left: number }>,
) {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  const bestPosition = Object.entries(positions).reduce((best, [, value]) => {
    if (
      value.top >= 0 &&
      value.left >= 0 &&
      value.top + tooltipRect.height <= viewportHeight &&
      value.left + tooltipRect.width <= viewportWidth
    ) {
      return value;
    }

    return best;
  }, positions.top);

  return bestPosition;
}

export const Tooltip = (props: TooltipProps) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const peerRef = useRef<HTMLDivElement>(null);

  // Make sure we have only one child
  if (Children.count(props.children) !== 1) {
    throw new Error('Tooltip component must have exactly one child');
  }

  const child = Children.only(props.children);

  if (!isValidElement(child)) {
    throw new Error('Tooltip child must be a valid React element');
  }

  const updateTooltipPosition = useCallback(() => {
    const tooltip = tooltipRef.current;
    const peer = peerRef.current;

    if (!tooltip || !peer) {
      return;
    }

    const tooltipRect = tooltip.getBoundingClientRect();
    const peerRect = peer.getBoundingClientRect();

    const positions = getPositionForAllCorners(tooltipRect, peerRect);
    const position = getBestPosition(tooltipRect, positions);

    tooltip.style.top = `${position.top}px`;
    tooltip.style.left = `${position.left}px`;
  }, []);

  const onPeerHover = useCallback(() => {
    tooltipRef.current?.setAttribute('data-peer-hover', 'true');
  }, []);

  const onPeerLeave = useCallback(() => {
    tooltipRef.current?.setAttribute('data-peer-hover', 'false');
  }, []);

  useEffect(() => {
    const peer = peerRef.current;

    if (!peer) {
      return;
    }

    updateTooltipPosition();

    window.addEventListener('resize', debounce(updateTooltipPosition, 100));

    // Não vejo necessidade de recalcular a posição do tooltip ao scrollar no momento,
    // mas se precisar, basta descomentar a linha abaixo e a linha de cleanup correspondente no retorno dessa função
    // window.addEventListener('scroll', updateTooltipPosition);

    peer.addEventListener('mouseenter', onPeerHover);
    peer.addEventListener('mouseleave', onPeerLeave);

    return () => {
      window.removeEventListener('resize', updateTooltipPosition);
      // window.removeEventListener('scroll', updateTooltipPosition);

      peer.removeEventListener('mouseenter', onPeerHover);
      peer.removeEventListener('mouseleave', onPeerLeave);
    };
  }, [updateTooltipPosition, onPeerHover, onPeerLeave]);

  if (!isValidElement(child)) {
    throw new Error('Tooltip child must be a valid React element');
  }

  type ElementWithRefProps = {
    ref?: React.Ref<any>;
  };
  
  const cloned = cloneElement(child as React.ReactElement<ElementWithRefProps>, {
    ref: peerRef,
  });

  if (props.when !== undefined && !props.when) {
    return cloned;
  }

  return (
    <>
      {cloned}

      {createPortal(
        <div ref={tooltipRef} className={styles} role="tooltip">
          {props.label}
        </div>,
        document.body,
      )}
    </>
  );
};

Tooltip.displayName = 'Tooltip';
