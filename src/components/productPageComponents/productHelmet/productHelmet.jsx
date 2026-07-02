import { Helmet } from "react-helmet-async";

function ProductHelmet({data}) {
  return (
    <>
      <Helmet>

        <title>{data?.pageInfo?.title || data?.model}</title>


        <meta
          name="description"
          content={data?.pageInfo?.meta_description || data?.short_description}
        />


        {data?.pageInfo?.keywords && (
          <meta name="keywords" content={data.pageInfo.keywords.join(", ")} />
        )}


        {data?.pageInfo?.features?.map((item, i) => (
          <meta key={i} name="feature" content={item} />
        ))}

        <meta property="og:title" content={data?.pageInfo?.title} />
        <meta
          property="og:description"
          content={data?.pageInfo?.meta_description}
        />
        <meta property="og:image" content={data?.thumbnail} />
        <meta property="og:type" content="product" />


        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
    </>
  );
}

export default ProductHelmet;
