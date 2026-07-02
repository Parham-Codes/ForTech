"./mobileEdit.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import DbHttpAddress from "../../../dbHttpAddress";

function AdminMobileEdit() {
  const { adminProductID } = useParams();

  const navigate = useNavigate();

  // main
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [cardDesc, setCardDesc] = useState("");
  const [price, setPrice] = useState("");
  const [countStock, setCountStock] = useState("");
  const [inStock, setInStock] = useState(false);
  const [thumbnail, setThumbnail] = useState("");

  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");
  const [img3, setImg3] = useState("");

  // phoneInfo
  const [os, setOs] = useState("");
  const [chipset, setChipset] = useState("");
  const [cpu, setCpu] = useState("");
  const [gpu, setGpu] = useState("");
  const [ram, setRam] = useState("");
  const [storageOptions, setStorageOptions] = useState("");

  const [displaySize, setDisplaySize] = useState("");
  const [displayType, setDisplayType] = useState("");
  const [displayResolution, setDisplayResolution] = useState("");
  const [refreshRate, setRefreshRate] = useState("");

  const [batteryCapacity, setBatteryCapacity] = useState("");
  const [batteryCharging, setBatteryCharging] = useState("");

  // pageInfo
  const [pageTitle, setPageTitle] = useState("");
  const [metaDesc, setMetaDesc] = useState("");
  const [keywords, setKeywords] = useState("");
  const [features, setFeatures] = useState("");

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(
          `${DbHttpAddress}/products/${adminProductID}`,
        );
        const data = res.data;

        setBrand(data.brand || "");
        setModel(data.model || "");
        setShortDesc(data.short_description || "");
        setCardDesc(data.card_description || "");
        setPrice(data.price || "");
        setCountStock(data.count_stock || "");
        setInStock(data.in_stock ?? false);
        setThumbnail(data.thumbnail || "");

        setImg1(data.images?.[0] || "");
        setImg2(data.images?.[1] || "");
        setImg3(data.images?.[2] || "");

        setOs(data.phoneInfo?.os || "");
        setChipset(data.phoneInfo?.chipset || "");
        setCpu(data.phoneInfo?.cpu || "");
        setGpu(data.phoneInfo?.gpu || "");
        setRam(data.phoneInfo?.ram || "");
        setStorageOptions(data.phoneInfo?.storage_options?.join(", ") || "");

        setDisplaySize(data.phoneInfo?.display?.size_in || "");
        setDisplayType(data.phoneInfo?.display?.type || "");
        setDisplayResolution(data.phoneInfo?.display?.resolution || "");
        setRefreshRate(data.phoneInfo?.display?.refresh_rate_hz || "");

        setBatteryCapacity(data.phoneInfo?.battery?.capacity_mAh || "");
        setBatteryCharging(data.phoneInfo?.battery?.charging || "");

        setPageTitle(data.pageInfo?.title || "");
        setMetaDesc(data.pageInfo?.meta_description || "");
        setKeywords(data.pageInfo?.keywords?.join(", ") || "");
        setFeatures(data.pageInfo?.features?.join(", ") || "");
      } catch (err) {
        toast.error("خطا در دریافت اطلاعات محصول");
      }
    };

    getProduct();
  }, [adminProductID]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(`${DbHttpAddress}/products/${adminProductID}`, {
        brand,
        model,
        short_description: shortDesc,
        card_description: cardDesc,
        price,
        count_stock: countStock,
        thumbnail,

        images: [img1, img2, img3],

        phoneInfo: {
          os,
          chipset,
          cpu,
          gpu,
          ram,
          storage_options: storageOptions.split(","),
          display: {
            size_in: displaySize,
            type: displayType,
            resolution: displayResolution,
            refresh_rate_hz: refreshRate,
          },
          battery: {
            capacity_mAh: batteryCapacity,
            charging: batteryCharging,
          },
        },

        pageInfo: {
          title: pageTitle,
          meta_description: metaDesc,
          keywords: keywords.split(","),
          features: features.split(","),
        },
      });

      toast.success("محصول با موفقیت ویرایش شد");
    } catch (err) {
      toast.error("ویرایش محصول انجام نشد");
    }
  };

  return (
    <div className="adminProductEditPage mx-5 my-5">
      <div className="adminEditForm px-5 py-5">
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="ps-4 panelTIcolor">اطلاعات اصلی</h3>
          <button
            onClick={() => navigate("/admin/products")}
            className="btn btn-danger"
          >
            بازگشت
          </button>
        </div>
        <form onSubmit={submitHandler}>
          <label htmlFor="brand">برند</label>
          <input
            id="brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />

          <label htmlFor="model">مدل</label>
          <input
            id="model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />

          <label htmlFor="shortDesc">توضیح کوتاه</label>
          <textarea
            id="shortDesc"
            value={shortDesc}
            onChange={(e) => setShortDesc(e.target.value)}
          />

          <label htmlFor="cardDesc">توضیح کارت محصول</label>
          <textarea
            id="cardDesc"
            value={cardDesc}
            onChange={(e) => setCardDesc(e.target.value)}
          />

          <label htmlFor="price">قیمت</label>
          <input
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <label htmlFor="countStock">موجودی</label>
          <input
            id="countStock"
            value={countStock}
            onChange={(e) => setCountStock(e.target.value)}
          />

          <label htmlFor="inStock">موجود است؟</label>
          <select
            id="inStock"
            value={String(inStock)}
            onChange={(e) => setInStock(e.target.value === "true")}
            className=" paneltTXcolor rounded"
            style={{backgroundColor: '#161618' , border: '1px solid #525257' , width: '100%' , padding: '5px 8px'}}
          >
            <option value="true">موجود</option>
            <option value="false">ناموجود</option>
          </select>

          <label htmlFor="thumbnail">تصویر اصلی</label>
          <input
            id="thumbnail"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
          />

          <label htmlFor="img1">تصویر ۱</label>
          <input
            id="img1"
            value={img1}
            onChange={(e) => setImg1(e.target.value)}
          />

          <label htmlFor="img2">تصویر ۲</label>
          <input
            id="img2"
            value={img2}
            onChange={(e) => setImg2(e.target.value)}
          />

          <label htmlFor="img3">تصویر ۳</label>
          <input
            id="img3"
            value={img3}
            onChange={(e) => setImg3(e.target.value)}
          />

          <h3 className="ps-4 panelTIcolor mt-5">مشخصات فنی</h3>

          <label htmlFor="os">سیستم عامل</label>
          <input id="os" value={os} onChange={(e) => setOs(e.target.value)} />

          <label htmlFor="chipset">چیپست</label>
          <input
            id="chipset"
            value={chipset}
            onChange={(e) => setChipset(e.target.value)}
          />

          <label htmlFor="cpu">پردازنده</label>
          <input
            id="cpu"
            value={cpu}
            onChange={(e) => setCpu(e.target.value)}
          />

          <label htmlFor="gpu">گرافیک</label>
          <input
            id="gpu"
            value={gpu}
            onChange={(e) => setGpu(e.target.value)}
          />

          <label htmlFor="ram">رم</label>
          <input
            id="ram"
            value={ram}
            onChange={(e) => setRam(e.target.value)}
          />

          <label htmlFor="storageOptions">حافظه ها (با , جدا کن)</label>
          <input
            id="storageOptions"
            value={storageOptions}
            onChange={(e) => setStorageOptions(e.target.value)}
          />

          <h3 className="ps-4 panelTIcolor mt-5">نمایشگر</h3>

          <label htmlFor="displaySize">سایز نمایشگر</label>
          <input
            id="displaySize"
            value={displaySize}
            onChange={(e) => setDisplaySize(e.target.value)}
          />

          <label htmlFor="displayType">نوع نمایشگر</label>
          <input
            id="displayType"
            value={displayType}
            onChange={(e) => setDisplayType(e.target.value)}
          />

          <label htmlFor="displayResolution">رزولوشن</label>
          <input
            id="displayResolution"
            value={displayResolution}
            onChange={(e) => setDisplayResolution(e.target.value)}
          />

          <label htmlFor="refreshRate">نرخ نوسازی</label>
          <input
            id="refreshRate"
            value={refreshRate}
            onChange={(e) => setRefreshRate(e.target.value)}
          />

          <h3 className="ps-4 panelTIcolor mt-5">باتری</h3>

          <label htmlFor="batteryCapacity">ظرفیت باتری</label>
          <input
            id="batteryCapacity"
            value={batteryCapacity}
            onChange={(e) => setBatteryCapacity(e.target.value)}
          />

          <label htmlFor="batteryCharging">نوع شارژ</label>
          <input
            id="batteryCharging"
            value={batteryCharging}
            onChange={(e) => setBatteryCharging(e.target.value)}
          />

          <h3 className="ps-4 panelTIcolor mt-5">اطلاعات سئو</h3>

          <label htmlFor="pageTitle">عنوان صفحه</label>
          <input
            id="pageTitle"
            value={pageTitle}
            onChange={(e) => setPageTitle(e.target.value)}
          />

          <label htmlFor="metaDesc">متا توضیحات</label>
          <textarea
            id="metaDesc"
            value={metaDesc}
            onChange={(e) => setMetaDesc(e.target.value)}
          />

          <label htmlFor="keywords">کلمات کلیدی (با , جدا کن)</label>
          <input
            id="keywords"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />

          <label htmlFor="features">ویژگی ها (با , جدا کن)</label>
          <input
            id="features"
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
          />

          <button className="mt-5 btn btn-primary">ذخیره تغییرات</button>
        </form>
      </div>
    </div>
  );
}

export default AdminMobileEdit;
