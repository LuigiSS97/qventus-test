import { renderHook, act } from "@testing-library/react-hooks";
import useThrottle from "./useThrottle"; // Import your custom hook

const mockCallback = jest.fn();
describe("useThrottle", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should throttle the function call", () => {
    // Initialize the hook with a delay of 1000ms
    const { result } = renderHook(() => useThrottle(mockCallback, 1000));

    // Call the throttled function multiple times in quick succession
    const throttleFn = result.current;
    throttleFn();

    // Fast-forward time by 1000ms
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Ensure that the callback has been called after the delay
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it("should throttle the function call event with function called repeated times", () => {
    // Initialize the hook with a delay of 1000ms
    const { result } = renderHook(() => useThrottle(mockCallback, 1000));

    // Call the throttled function multiple times in quick succession
    const throttleFn = result.current;
    throttleFn();
    throttleFn();
    throttleFn();

    // Ensure that the callback hasn't been called yet
    expect(mockCallback).not.toHaveBeenCalled();

    // Fast-forward time by 1000ms
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Ensure that the callback has been called after the delay
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it("should cancel previous timers and use the latest call", () => {
    // Initialize the hook with a delay of 1000ms
    const { result } = renderHook(() => useThrottle(mockCallback, 2000));

    // Call the throttled function twice
    const throttleFn = result.current;
    throttleFn();
    throttleFn();

    // Fast-forward time by 500ms
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Call the throttled function again
    throttleFn();

    // Fast-forward time by another 1000ms
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    // Ensure that the callback has been called only once, with the latest call
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
});
