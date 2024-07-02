import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useState,
  useRef,
} from "react";
import styled from "styled-components";

export default function Slider({ min, max, onChange, disabled }) {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(null);
  const maxValRef = useRef(null);
  const range = useRef(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value); // Precede with '+' to convert the value from type string to type number

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, getPercent]);

  // Get min and max values when their state changes
  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal]);

  return (
    <SliderContainer>
      <SliderInput
        type="range"
        min={min}
        max={max}
        value={minVal}
        ref={minValRef}
        onChange={(event) => {
          const value = Math.min(+event.target.value, maxVal - 1);
          setMinVal(value);
          event.target.value = value.toString();
        }}
        zIndex={minVal > max - 100 ? 5 : 3}
      />
      <SliderInput
        type="range"
        min={min}
        max={max}
        value={maxVal}
        ref={maxValRef}
        onChange={(event) => {
          const value = Math.max(+event.target.value, minVal + 1);
          setMaxVal(value);
          event.target.value = value.toString();
        }}
        zIndex={4}
      />
      <SliderWrapper>
        <SliderTrack />
        <SliderRange ref={range} />
      </SliderWrapper>
    </SliderContainer>
  );
}

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 1024px; /* 최대 너비 설정 */
  margin-top: 1rem;
  margin-bottom: 3rem;
  display: flex;
  justify-content: center;
`;

const SliderWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const SliderTrack = styled.div`
  background-color: #383838;
  border-radius: 3px;
  height: 5px;
  position: absolute;
  width: 100%;
  z-index: 1;
`;

const SliderRange = styled.div`
  background-color: #2cadf9;
  border-radius: 3px;
  height: 5px;
  position: absolute;
  z-index: 2;
`;

const SliderInput = styled.input.attrs((props) => ({
  type: "range",
}))`
  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;
  position: absolute;
  pointer-events: none;
  height: 0;
  width: 100%; /* 컨테이너의 너비에 맞추기 */
  max-width: 1024px; /* 최대 너비 설정 */
  outline: none;
  z-index: ${(props) => props.zIndex};

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    background-color: #2cadf9;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    height: 18px;
    width: 18px;
    margin-top: 4px;
    pointer-events: all;
    position: relative;
  }

  &::-moz-range-thumb {
    background-color: #2cadf9;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    height: 18px;
    width: 18px;
    margin-top: 4px;
    pointer-events: all;
    position: relative;
  }
`;
