import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import DbHttpAddress from "../../../dbHttpAddress";
import './mobileAdd.css'

function MobileAdd({ cancelHandler }) {
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

  const submitHandler = async (e) => {
    e.preventDefault();

    const fields = [
      brand,
      model,
      shortDesc,
      cardDesc,
      price,
      countStock,
      thumbnail,
      img1,
      img2,
      img3,
      os,
      chipset,
      cpu,
      gpu,
      ram,
      storageOptions,
      displaySize,
      displayType,
      displayResolution,
      refreshRate,
      batteryCapacity,
      batteryCharging,
      pageTitle,
      metaDesc,
      keywords,
      features,
    ];

    const isEmpty = fields.some((f) => !f || f.toString().trim() === "");

    if (isEmpty) {
      toast.error("همه فیلدها باید پر شوند");
      return;
    }

    const numberedPrice = Number(price);

    try {
      const res = await axios.get(`${DbHttpAddress}/products`);
      const list = res.data
        .filter((item) => item.id?.startsWith("P"))
        .sort((a, b) => {
          const numA = Number(a.id.replace("P00", ""));
          const numB = Number(b.id.replace("P00", ""));
          return numA - numB;
        });

      let newId = "P001";

      if (list.length > 0) {
        const lastItem = list[list.length - 1];
        const lastNum = Number(lastItem.id.replace("P00", ""));
        newId = `P00${lastNum + 1}`;
      }

      await axios.post(`${DbHttpAddress}/products`, {
        id: newId,
        category: "mobile",
        brand,
        model,
        short_description: shortDesc,
        card_description: cardDesc,
        price: numberedPrice,
        count_stock: countStock,
        in_stock: inStock,
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

      toast.success("محصول با موفقیت اضافه شد");

      // reseting form
      setBrand("");
      setModel("");
      setShortDesc("");
      setCardDesc("");
      setPrice("");
      setCountStock("");
      setInStock(false);
      setThumbnail("");
      setImg1("");
      setImg2("");
      setImg3("");
      setOs("");
      setChipset("");
      setCpu("");
      setGpu("");
      setRam("");
      setStorageOptions("");
      setDisplaySize("");
      setDisplayType("");
      setDisplayResolution("");
      setRefreshRate("");
      setBatteryCapacity("");
      setBatteryCharging("");
      setPageTitle("");
      setMetaDesc("");
      setKeywords("");
      setFeatures("");

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (err) {
      toast.error("محصول اضافه نشد");
    }
  };

  return (
    <div className="adminProductEditPage mx-5 my-5 py-4">
      <h1 className="mb-0 panelTIcolor text-center">موبایل</h1>
      <div className="adminEditForm px-5 py-5">
        <div className="d-flex justify-content-between align-items-center">
          <h3 className=" panelTIcolor">اطلاعات اصلی</h3>
          <button onClick={cancelHandler} className="btn btn-danger">
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
            className=" paneltTXcolor rounded"
            style={{
              backgroundColor: "#161618",
              border: "1px solid #525257",
              width: "100%",
              padding: "5px 8px",
            }}
            value={String(inStock)}
            onChange={(e) => setInStock(e.target.value === "true")}
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

          <button className="mt-5 btn btn-primary">اضافه کردن محصول</button>
        </form>
      </div>
    </div>
  );
}

export default MobileAdd;
