console.log("I am best");
let imgpresent = false;
//create instaces of favric canvas.......................................................

const canvas = new fabric.Canvas("canvas", {
  width: 900,
  height: 500,
  backgroundColor: "white",
  selection: false,
});
//end

//clear canvas...........................................................................
const clearCanvas = () => {
  // canvas.getObjects().forEach((o) => {
  //   if (o !== canvas.backgroundImage) {
  //     canvas.remove(o);
  //   }
  // });
  canvas.clear();
  canvas.backgroundColor = "white";
  imgpresent = false;
};
//end

//get and set img.........................................................................
const reader = new FileReader();
const inputFile = document
  .getElementById("myImg")
  .addEventListener("change", function (e) {
    resetImg = canvas.viewportTransform;
    console.log(resetImg);
    resetImg[0] = 1;
    resetImg[1] = 0;
    resetImg[2] = 0;
    resetImg[3] = 1;
    resetImg[4] = 0;
    resetImg[5] = 0;
    console.log(resetImg);

    reader.readAsDataURL(this.files[0]);
    imgpresent = true;
  });

reader.addEventListener("load", () => {
  fabric.Image.fromURL(reader.result, (img) => {
    // canvas.add(img);
    canvas.setBackgroundImage(img);
    img.scaleToHeight(500);
    img.scaleToWidth(600);
    canvas.centerObject(img);
    canvas.requestRenderAll();
  });
});

//end............

//mousse....................................................................................

canvas.on("mouse:wheel", function (event) {
  if (imgpresent) {
    canvas.setCursor("grab");
    var delta = event.e.deltaY;
    var zoom = canvas.getZoom();
    zoom *= 0.9995 ** delta;
    if (zoom > 100) zoom = 100;
    console.log(zoom);
    if (zoom < 1) zoom = 1;
    canvas.zoomToPoint({ x: event.e.offsetX, y: event.e.offsetY }, zoom);
    event.e.preventDefault();
    event.e.stopPropagation();
    var vpt = this.viewportTransform;
    console.log(vpt[4]);
    if (vpt[4] >= 0) {
      vpt[4] = 0;
    } else if (vpt[4] < canvas.getWidth() - 900 * zoom) {
      vpt[4] = canvas.getWidth() - 900 * zoom;
    }
    if (vpt[5] >= 0) {
      vpt[5] = 0;
    } else if (vpt[5] < canvas.getHeight() - 500 * zoom) {
      vpt[5] = canvas.getHeight() - 500 * zoom;
    }
  }
});
// end

//toggle zoom curser
const toggleMode = () => {
  console.log("hiii");
  if (imgpresent === false) {
    imgpresent = true;
  } else {
    imgpresent = false;
  }
};
