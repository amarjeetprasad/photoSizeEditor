import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import Content from "./Content";
import "./Home.css";

function Home(props) {
  const [imageStyle, setImageStyle] = useState({
    display: "block"
  });
  const [imageStyle1, setImageStyle1] = useState({ display: "none" });
  const [src, setScr] = useState(null);
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [crop, setCrop] = useState({
    unit: "px",
    x: 50,
    y: 50,
    width: 100,
    height: 100
  });

  const [rotate, setRotate] = useState(0);

  function getCroppedImg() {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    // New lines to be added
    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    // As Base64 string
    const base64Image = canvas.toDataURL("image/jpeg");
    setResult(base64Image);
    setScr(base64Image);
    setCrop({
      unit: "px",
      x: 130,
      y: 50,
      width: 0,
      height: 0
    });
    setImageStyle({ display: "none" });
    setImageStyle1({ display: "block" });
  }

  useEffect(() => {
    const dropArea = document.querySelector(".drag-drop-area");
    const headerText = document.querySelector(".drop-area-text");
    const btn = document.querySelector(".drag-drop-area");
    const inp = document.querySelector(".input-tag");
    const preview = document.querySelector("#preview");

    let file;
    let url = null;

    btn.onclick = () => {
      inp.click();
    };

    inp.addEventListener("change", () => {
      file = inp.files[0];
      let validImageExtensions = ["image/jpeg", "image/jpg", "image/png"];
      if (validImageExtensions.includes(file.type)) {
        headerText.textContent = "File is uploading please wait.....";
      } else {
        headerText.textContent = "Drag & Drop a file here or Click";
      }
      dropArea.classList.add("none");

      commonFun();
    });

    //drag & drop functionality
    dropArea.addEventListener("dragover", (e) => {
      e.preventDefault();
      headerText.textContent = "Release to Upload File";
    });

    dropArea.addEventListener("dragleave", () => {
      headerText.textContent = "Drag & Drop a file here or Click";
    });

    dropArea.addEventListener("drop", (e) => {
      e.preventDefault();
      file = e.dataTransfer.files[0];
      commonFun();
    });

    function commonFun() {
      let file_type = file.type;

      let validImageExtensions = ["image/jpeg", "image/jpg", "image/png"];

      if (validImageExtensions.includes(file_type)) {
        let reader = new FileReader();
        reader.onload = () => {
          url = reader.result;
          setScr(url);
          preview.style.display = "flex";
          dropArea.style.display = "none";
        };
        reader.readAsDataURL(file);
      } else {
        alert("This is not valid image!");
        headerText.textContent = "Drag & Drop a file here or Click";
        dropArea.classList.remove("none");
      }
    }

    //editor script

    const zoomin = document.querySelector("#zoomin"),
      zoomout = document.querySelector("#zoomout"),
      leftRo = document.querySelector(".left"),
      rightRo = document.querySelector(".right"),
      image = document.getElementById("imgDisplayed"),
      canvas = document.getElementById("result"),
      ctx = canvas.getContext("2d");

    let zoom = 1;
    let deg = 0;

    zoomin.onclick = () => {
      var img = document.querySelector("#image");
      zoom = zoom + 0.1;
      img.style.transform = `rotate(${deg}deg) scale(${zoom})`;
    };

    zoomout.onclick = () => {
      var img = document.querySelector("#image");
      zoom = zoom - 0.1;
      img.style.transform = `rotate(${deg}deg) scale(${zoom})`;
    };

    leftRo.onclick = () => {
      var img = document.querySelector("#image");
      var RotateDeg = document.querySelector("#RotateDeg");
      deg = deg - 90;
      RotateDeg.value = deg;
      img.style.transform = `rotate(${deg}deg) scale(${zoom})`;
    };

    rightRo.onclick = () => {
      var img = document.querySelector("#image");
      var RotateDeg = document.querySelector("#RotateDeg");
      deg = deg + 90;
      RotateDeg.value = deg;
      img.style.transform = `rotate(${deg}deg) scale(${zoom})`;
    };

    function RotateImage(image, deg) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(deg * (Math.PI / 180));
      ctx.translate(-(canvas.width / 2), -(canvas.height / 2));
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      ctx.restore();
    }

    const subbtn = document.getElementById("btn");

    subbtn.onclick = (e) => {
      e.preventDefault();

      let Radio = document.getElementsByName("unit");
      let height = document.querySelector("#height").value;
      let width = document.querySelector("#width").value;
      var RotateDeg = document.querySelector("#RotateDeg").value;

      let radio = "cm";

      for (let i = 0; i < Radio.length; i++) {
        if (Radio[i].checked) {
          radio = Radio[i].value;
          break;
        }
      }

      if (!radio || !width || !height) {
        alert("please fill all fields!");
      } else {
        window.scrollTo(0, 500);
        if (radio === "cm") {
          height *= 37.795275591;
          width *= 37.795275591;
        } else if (radio === "mm") {
          height *= 3.7795275591;
          width *= 3.7795275591;
        } else if (radio === "in") {
          height *= 96;
          width *= 96;
        }

        canvas.width = width;
        canvas.height = height;

        // ctx.drawImage(image, 0, 0, width, height);

        RotateImage(image, RotateDeg);

        const downCont = document.querySelector(".down-cont");

        downCont.style.display = "block";

        const btn1 = document.querySelector("#down");
        btn1.addEventListener("click", download);
        function download() {
          if (window.navigator.msSaveBlob) {
            window.navigator.msSaveBlob(canvas.msToBlob(), "image.png");
          } else {
            const a = document.createElement("a");
            document.body.appendChild(a);
            a.href = canvas.toDataURL("image/jpeg");
            a.download = "image.jpg";
            a.click();
            document.body.removeChild(a);
          }
          window.location.reload();
        }
      }
    };
  }, []);

  return (
    <div>
      <div className="drag-drop-area">
        <div className="icon">
          <i className="bi bi-cloud-arrow-up-fill"></i>
        </div>
        <p className="drop-area-text">Drag & Drop a file here or Click</p>
        <input className="input-tag" type="file" name="" id="" hidden />
      </div>
      <div id="preview" style={{ display: "none" }}>
        {src && (
          <div id="image">
            <ReactCrop
              onImageLoaded={setImage}
              src={src}
              crop={crop}
              alt="uploaded file"
              onChange={(newCrop) => setCrop(newCrop)}
              className="image"
              style={imageStyle}
              id="imageUp"
            />
            <img src={result} alt="result" style={imageStyle1} />
          </div>
        )}
      </div>
      {src &&
        (!result ? (
          <div className="crop-btn">
            <button onClick={getCroppedImg}>Crop Done</button>
          </div>
        ) : null)}
      <div className="editor-area">
        <div className="zoom">
          <i className="bi bi-zoom-in" id="zoomin" title="zoom in"></i>
          <i className="bi bi-zoom-out" id="zoomout" title="zoom out"></i>
        </div>
        <div className="rotate">
          <i
            className="bi bi-arrow-counterclockwise left"
            title="left rotate"
          ></i>
          <i className="bi bi-arrow-clockwise right" title="right rotate"></i>
          <input type="number" hidden id="RotateDeg" />
        </div>
      </div>

      <form>
        <div className="radiobtn">
          MM
          <input type="radio" name="unit" value="mm" /> CM
          <input type="radio" name="unit" value="cm" />
          IN
          <input type="radio" name="unit" value="in" /> PX
          <input type="radio" name="unit" value="px" />
        </div>

        <div className="input-feild">
          <label htmlFor="height">Height</label>
          <input
            type="number"
            step="any"
            min="0"
            id="height"
            placeholder=""
            required
          />
          <label htmlFor="width">Width</label>
          <input
            type="number"
            step="any"
            min="0"
            id="width"
            placeholder=""
            required
          />
        </div>
        <input type="submit" value="Resize" name="" id="btn" />
      </form>

      <div className="wrapper">
        <div className="down-cont" style={{ display: "none" }}>
          <span>Your image resized successfully</span>
          <button id="down">Download</button>
        </div>
        <canvas id="result" style={{ display: "none" }}>
          <img src={result ? result : src} id="imgDisplayed" alt="" />
        </canvas>
      </div>
      <Content />
    </div>
  );
}

export default Home;
