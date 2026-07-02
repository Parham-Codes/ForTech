import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function SkeletonLoading() {
  return (
    <div style={{ width: "275px" , padding: '5px' , height: "400px" , borderRadius:"10px" , margin:"0 auto    " }}>
      <Skeleton height={188} />
      <Skeleton height={60} style={{ marginTop: "10px" }} />
      <Skeleton height={30} width="100%" style={{float: 'left' , marginTop:"30px"}}/>
      <Skeleton height={44} style={{float: 'left' , marginTop:"20px" }}/>
    </div>
  );
}