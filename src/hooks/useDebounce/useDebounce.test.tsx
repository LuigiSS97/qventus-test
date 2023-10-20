import { act, renderHook } from "@testing-library/react-hooks";
import useDebouncedCallback from "./useDebounce"; // Import your custom hook

describe("useDebouncedCallback", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("does not call the callback immediately", () => {
    let callbackCount = 0;

    const { result } = renderHook(() =>
      useDebouncedCallback(() => {
        callbackCount++;
      }, 300)
    );

    act(() => {
      result.current();
    });

    expect(callbackCount).toBe(0);
  });

  it("calls the callback after the debounce timeout", async () => {
    let callbackCount = 0;

    const { result } = renderHook(() =>
      useDebouncedCallback(() => {
        callbackCount++;
      }, 300)
    );

    act(() => {
      result.current();
    });

    expect(callbackCount).toBe(0);

    act(() => {
      jest.advanceTimersByTime(350);
    });

    expect(callbackCount).toBe(1);
  });

  it("debounces multiple calls", async () => {
    let callbackCount = 0;

    const { result } = renderHook(() =>
      useDebouncedCallback(() => {
        callbackCount++;
      }, 300)
    );

    act(() => {
      result.current();
    });

    act(() => {
      result.current();
    });

    act(() => {
      result.current();
    });

    expect(callbackCount).toBe(0);

    act(() => {
      jest.advanceTimersByTime(350);
    });

    expect(callbackCount).toBe(1);
  });
});
