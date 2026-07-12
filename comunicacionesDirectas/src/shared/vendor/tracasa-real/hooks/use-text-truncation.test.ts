import { renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useTextTruncation } from './use-text-truncation';

describe('useTextTruncation', () => {
  let addEventListenerSpy: ReturnType<typeof vi.spyOn>;
  let removeEventListenerSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('devuelve un ref y el estado inicial de truncamiento como false', () => {
    const { result } = renderHook(() => useTextTruncation([]));

    expect(result.current[0]).toBeDefined();
    expect(result.current[0].current).toBeNull();
    expect(result.current[1]).toBe(false);
  });

  it('detecta texto truncado cuando scrollWidth > clientWidth', async () => {
    const { result } = renderHook(() => useTextTruncation(['test']));

    const mockElement = {
      scrollWidth: 200,
      clientWidth: 100,
      scrollHeight: 50,
      clientHeight: 50,
    } as HTMLElement;

    // Asignar mediante Object.defineProperty para simular la asignación del ref
    Object.defineProperty(result.current[0], 'current', {
      value: mockElement,
      writable: true,
    });

    // Trigger resize so the hook recalculates (hook listens to 'resize')
    // y esperar a que el efecto se ejecute
    window.dispatchEvent(new Event('resize'));
    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(result.current[1]).toBe(true);
  });

  it('no detecta truncamiento cuando scrollWidth === clientWidth', async () => {
    const { result } = renderHook(() => useTextTruncation(['test']));

    const mockElement = {
      scrollWidth: 100,
      clientWidth: 100,
      scrollHeight: 50,
      clientHeight: 50,
    } as HTMLElement;

    Object.defineProperty(result.current[0], 'current', {
      value: mockElement,
      writable: true,
    });

    // Trigger resize so the hook recalculates (hook listens to 'resize')
    window.dispatchEvent(new Event('resize'));
    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(result.current[1]).toBe(false);
  });

  it('recalcula el truncamiento cuando cambian las dependencias', async () => {
    const { result, rerender } = renderHook(
      ({ deps }) => useTextTruncation(deps),
      {
        initialProps: { deps: ['texto corto'] },
      },
    );

    const mockElement = {
      scrollWidth: 100,
      clientWidth: 100,
      scrollHeight: 50,
      clientHeight: 50,
    } as HTMLElement;

    Object.defineProperty(result.current[0], 'current', {
      value: mockElement,
      writable: true,
    });

    await new Promise((resolve) => setTimeout(resolve, 50));
    expect(result.current[1]).toBe(false);

    // Cambiar dependencias y propiedades del elemento
    Object.defineProperty(mockElement, 'scrollWidth', {
      configurable: true,
      value: 200,
    });

    rerender({ deps: ['texto muy largo que se trunca'] });
    // Trigger recalculation (same pattern as other tests)
    window.dispatchEvent(new Event('resize'));
    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(result.current[1]).toBe(true);
  });

  it('registra y limpia el listener de resize', () => {
    const { unmount } = renderHook(() => useTextTruncation([]));

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'resize',
      expect.any(Function),
    );

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'resize',
      expect.any(Function),
    );
  });

  it('maneja correctamente el caso cuando el ref es null', async () => {
    const { result } = renderHook(() => useTextTruncation([]));

    expect(result.current[0].current).toBeNull();
    expect(result.current[1]).toBe(false);

    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(result.current[1]).toBe(false);
  });

  it('detecta truncamiento vertical cuando scrollHeight > clientHeight', async () => {
    const { result } = renderHook(() => useTextTruncation(['test']));

    const mockElement = {
      scrollWidth: 100,
      clientWidth: 100,
      scrollHeight: 200,
      clientHeight: 100,
    } as HTMLElement;

    Object.defineProperty(result.current[0], 'current', {
      value: mockElement,
      writable: true,
    });

    window.dispatchEvent(new Event('resize'));
    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(result.current[1]).toBe(true);
  });

  it('detecta truncamiento cuando hay overflow horizontal Y vertical', async () => {
    const { result } = renderHook(() => useTextTruncation(['test']));

    const mockElement = {
      scrollWidth: 200,
      clientWidth: 100,
      scrollHeight: 200,
      clientHeight: 100,
    } as HTMLElement;

    Object.defineProperty(result.current[0], 'current', {
      value: mockElement,
      writable: true,
    });

    window.dispatchEvent(new Event('resize'));
    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(result.current[1]).toBe(true);
  });
});
