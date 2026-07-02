import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import DbHttpAddress from "../../../dbHttpAddress";
import './laptopAdd.css'

function LaptopAdd({ cancelHandler }) {
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

  const [cpu, setCpu] = useState("");
  const [gpu, setGpu] = useState("");
  const [ram, setRam] = useState("");
  const [ssd, setSsd] = useState("");
  const [screen, setScreen] = useState("");
  const [display, setDisplay] = useState("");
  const [weight, setWeight] = useState("");
  const [battery, setBattery] = useState("");

  const [pageTitle, setPageTitle] = useState("");
  const [metaDesc, setMetaDesc] = useState("");
  const [keywords, setKeywords] = useState("");

  const editHandler = async (e) => {
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

      cpu,
      gpu,
      ram,
      ssd,
      screen,
      display,
      weight,
      battery,

      pageTitle,
      metaDesc,
      keywords,
    ];

    const isEmpty = fields.some((f) => !f || f.toString().trim() === "");

    if (isEmpty) {
      toast.error("همه فیلدها باید پر شوند");
      return;
    }

    try {
      const res = await axios.get(`${DbHttpAddress}/products`);
      const list = res.data
        .filter((item) => item.id?.startsWith("lap"))
        .sort((a, b) => {
          const numA = Number(a.id.replace("lap00", ""));
          const numB = Number(b.id.replace("lap00", ""));
          return numA - numB;
        });

      let newId = "lap001";

      if (list.length > 0) {
        const lastItem = list[list.length - 1];
        const lastNum = Number(lastItem.id.replace("lap00", ""));
        newId = `lap00${lastNum + 1}`;
      }

      await axios.post(`${DbHttpAddress}/products`, {
        id: newId,
        brand,
        model,
        short_description: shortDesc,
        card_description: cardDesc,
        price,
        count_stock: countStock,
        in_stock: inStock,
        thumbnail,
        images: [img1, img2, img3],

        laptopInfo: {
          cpu,
          gpu,
          ram,
          ssd,
          screen,
          display,
          weight,
          battery,
        },

        pageInfo: {
          title: pageTitle,
          meta_description: metaDesc,
          keywords: keywords.split(","),
        },
      });

      toast.success("محصول با موفقیت اضافه شد");

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
      toast.error("محصول اشافه نشد!");
    }
  };

  return (
    <div className="adminProductEditPage px-5 py-4 mx-5 my-5">
      <h1 className="mb-0 panelTIcolor text-center">لپ تاپ</h1>
      <div className="adminEditForm mt-4">
        <div className="d-flex justify-content-between align-items-center">
          <h3 className=" panelTIcolor">اطلاعات اصلی</h3>
          <button onClick={cancelHandler} className="btn btn-danger">
            بازگشت
          </button>
        </div>
        <form onSubmit={editHandler}>
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

          <label htmlFor="cardDesc">توضیحات کارت محصول</label>
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

          <label htmlFor="countStock">تعداد موجودی</label>
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

          <label htmlFor="thumbnail">تصویر اصلی (Thumbnail)</label>
          <input
            id="thumbnail"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
          />

          <label htmlFor="img1">تصویر شماره ۱</label>
          <input
            id="img1"
            value={img1}
            onChange={(e) => setImg1(e.target.value)}
          />

          <label htmlFor="img2">تصویر شماره ۲</label>
          <input
            id="img2"
            value={img2}
            onChange={(e) => setImg2(e.target.value)}
          />

          <label htmlFor="img3">تصویر شماره ۳</label>
          <input
            id="img3"
            value={img3}
            onChange={(e) => setImg3(e.target.value)}
          />

          <h3 className="ps-4 panelTIcolor mt-5">مشخصات لپ‌تاپ</h3>

          <label htmlFor="cpu">پردازنده (CPU)</label>
          <input
            id="cpu"
            value={cpu}
            onChange={(e) => setCpu(e.target.value)}
          />

          <label htmlFor="gpu">گرافیک (GPU)</label>
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

          <label htmlFor="ssd">حافظه SSD</label>
          <input
            id="ssd"
            value={ssd}
            onChange={(e) => setSsd(e.target.value)}
          />

          <label htmlFor="screen">اندازه صفحه</label>
          <input
            id="screen"
            value={screen}
            onChange={(e) => setScreen(e.target.value)}
          />

          <label htmlFor="display">نوع نمایشگر</label>
          <input
            id="display"
            value={display}
            onChange={(e) => setDisplay(e.target.value)}
          />

          <label htmlFor="weight">وزن</label>
          <input
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />

          <label htmlFor="battery">مشخصات باتری</label>
          <input
            id="battery"
            value={battery}
            onChange={(e) => setBattery(e.target.value)}
          />

          <h3 className="ps-4 panelTIcolor mt-5">اطلاعات سئو (SEO)</h3>

          <label htmlFor="pageTitle">عنوان صفحه</label>
          <input
            id="pageTitle"
            value={pageTitle}
            onChange={(e) => setPageTitle(e.target.value)}
          />

          <label htmlFor="metaDesc">متا دیسکریپشن</label>
          <textarea
            id="metaDesc"
            value={metaDesc}
            onChange={(e) => setMetaDesc(e.target.value)}
          />

          <label htmlFor="keywords">کلمات کلیدی (با کاما جدا کن)</label>
          <input
            id="keywords"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />

          <button className="btn btn-primary">افزودن محصول</button>
        </form>
      </div>
    </div>
  );
}

export default LaptopAdd;
