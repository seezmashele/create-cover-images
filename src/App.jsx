import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { FastAverageColor } from "fast-average-color"
import * as htmlToImage from "html-to-image"
import download from "downloadjs"
// import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image"
import { customAlphabet } from "nanoid"

function App() {
  const [selectedPageIndex, setSelectedPageIndex] = useState(0)
  const [uploadedImage, setUploadedImage] = useState(null)
  const [imageDownloadName, setImageDownloadName] = useState("")
  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles && acceptedFiles[0]) {
      const file = acceptedFiles[0]
      const filename = file.name
      const imageURL = URL.createObjectURL(file)
      setUploadedImage(imageURL)
      GetAverageImageColor(imageURL)
      setImageDownloadName(nanoid())
    }
  }, [])
  const { getRootProps, getInputProps } = useDropzone({ onDrop })
  const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 12)
  const buttons = [
    { title: "Album" },
    { title: "Playlist" },
    { title: "Spotlight" }
  ]

  const GetAverageImageColor = url => {
    const container = document.getElementById("custom-image-container")
    const fac = new FastAverageColor()
    if (url) {
      fac
        .getColorAsync(url, {
          algorithm: "simple"
        })
        .then(color => {
          container.style.backgroundColor = color.rgba
        })
        .catch(e => {
          console.log(e)
        })
    }
  }

  const downloadImage = () => {
    const node = document.getElementById("custom-image-container")
    htmlToImage
      .toPng(node)
      .then(function (dataUrl) {
        download(
          dataUrl,
          imageDownloadName ? imageDownloadName + ".png" : "image.png"
        )
      })
      .catch(err => {
        console.log("oops", err)
      })
  }

  // set random nanoid file name on image change

  return (
    <div className=" w-full flex flex-col max-w-3xl mx-auto left-0 right-0 pb-20 select-none">
      <div className="h-16 border-bF border-neutral-500 flex items-center justify-center space-x-2">
        {buttons.map((item, index) => {
          return (
            <div
              key={"tab" + index}
              className={`w-24 select-none border-2 py-2 hover:bg-neutral-200 bg-neutral-100 font-semiboldf rounded cursor-pointer text-center ${
                index === selectedPageIndex
                  ? "border-blue-400"
                  : "border-transparent"
              }`}
            >
              {item.title}
            </div>
          )
        })}
      </div>
      <div className="w-full mt-5">
        <h3 className="font-semibold text-2xl text-center">
          Create an image for your posts
        </h3>
        <p className="mt-4 text-center">
          JavaScript application to save custom, minified images. Drag and drop
          the files below.
        </p>
      </div>

      <div className="w-full mt-6">
        <div
          {...getRootProps()}
          className="w-full h-32 border-2 cursor-pointer border-dashed border-neutral-300 flex items-center justify-center"
        >
          <input {...getInputProps()} />
          <div className="text-2xl font-semibold text-neutral-400">
            Drop image here (or click to upload)
          </div>
        </div>
      </div>

      <div className="w-full mt-6 flex justify-center items-center space-x-3">
        <p>Filename: </p>
        <input
          type="text"
          value={imageDownloadName ? imageDownloadName : "image"}
          onChange={e => console.log(e)}
          className="border rounded p-2 border-neutral-400"
        />
        <p>.webp</p>
        <button
          onClick={downloadImage}
          className="bg-blue-500 text-white rounded p-2 px-3 hover:bg-blue-600"
        >
          Download
        </button>
      </div>

      <div className="w-full mt-6 flex justify-center">
        <div
          {...getRootProps()}
          id="custom-image-container"
          className="cursor-pointer w-[520px] h-[390px] overflow-hidden bg-neutral-100 flex items-center justify-center"
        >
          <div className="w-[365px] h-[365px] shadow-2xlF album_image_shadow rounded-md overflow-hidden">
            <img
              draggable="false"
              className="w-full h-full object-cover object-top"
              src={uploadedImage ? uploadedImage : null}
              alt=""
            />
          </div>
          <input {...getInputProps()} />
        </div>
      </div>
    </div>
  )
}

export default App
