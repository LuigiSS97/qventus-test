import { renderHook, act } from "@testing-library/react-hooks";
import useThrottle from "./useThrottle";

const mockCallback = jest.fn();
describe("useThrottle", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should throttle the function call", () => {
    const { result } = renderHook(() => useThrottle(mockCallback, 1000));

    const throttleFn = result.current;
    throttleFn();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it("should throttle the function call event with function called repeated times", () => {
    const { result } = renderHook(() => useThrottle(mockCallback, 1000));

    const throttleFn = result.current;
    throttleFn();
    throttleFn();
    throttleFn();

    expect(mockCallback).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it("should cancel previous timers and use the latest call", () => {
    const { result } = renderHook(() => useThrottle(mockCallback, 2000));

    const throttleFn = result.current;
    throttleFn();
    throttleFn();

    act(() => {
      jest.advanceTimersByTime(500);
    });

    throttleFn();

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
});
