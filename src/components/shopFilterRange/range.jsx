import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./range.css";
import { useEffect, useState } from "react";

export default function FilterRange({ min, max, onChange }) {
  const [v, setV] = useState([min, max]);

  useEffect(() => {
    setV([min, max]);
  }, [min, max]);

  return (
    <div className="filter-section">
      <h4>محدوده قیمت</h4>

      <Slider
        range
        min={0}
        max={max}
        step={500_000}
        value={v}
        onChange={(value) => {
          setV(value);
          onChange(value);
        }}
        allowCross={false}
      />

      <div className="price-values">
        <span>{Number(v[1]).toLocaleString()} تومان</span>
        <span>تا</span>
        <span>{Number(v[0]).toLocaleString()} تومان</span>
      </div>
    </div>
  );
}
