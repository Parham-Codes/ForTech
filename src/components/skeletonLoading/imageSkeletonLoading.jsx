import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function SkeletonLoading() {
  return (
    <div
      style={{
        width: "270px",
        padding: "5px",
        borderRadius: "10px",
        margin: "0 auto",
      }}
    >
      <Skeleton height={222} />
    </div>
  );
}
