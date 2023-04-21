import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import * as htmlToImage from "html-to-image"
import { Link } from "react-router-dom"
import { customAlphabet } from "nanoid"
import download from "downloadjs"
import { pageButtons } from "../shared/pageButtons"

function Home() {
  const [uploadedImage, setUploadedImage] = useState(null)
  const [imageDownloadName, setImageDownloadName] = useState("")
  const selectedPageIndex = 1

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles && acceptedFiles[0]) {
      const imageURL = URL.createObjectURL(acceptedFiles[0])
      setUploadedImage(imageURL)
      setImageDownloadName("img-" + nanoid())
    }
  }, [])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })
  const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 8)

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

  return (
    <div className=" w-full flex flex-col max-w-3xl mx-auto left-0 right-0 pb-20 select-none">
      <div className="h-16 border-bF border-neutral-500 flex items-center justify-center space-x-2">
        {pageButtons.map((item, index) => {
          return (
            <Link to={item.path} key={"tab" + index}>
              <div
                className={`w-24 select-none border-2 py-2 hover:bg-neutral-200 bg-neutral-100 font-semiboldf rounded cursor-pointer text-center ${
                  index === selectedPageIndex
                    ? "border-blue-400"
                    : "border-transparent"
                }`}
              >
                {item.title}
              </div>
            </Link>
          )
        })}
      </div>
      <div className="w-full mt-5">
        <h3 className="font-semibold text-2xl text-center">
          Create an image for your posts
        </h3>
        <p className="mt-4 text-center">
          JavaScript application to save custom images. Drag and drop the files
          below.
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
          required
          type="text"
          value={imageDownloadName}
          onChange={e => setImageDownloadName(e.target.value)}
          className="border rounded p-2 border-neutral-400"
        />
        <p>.png</p>
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
          style={{ backgroundImage: `url(${uploadedImage})` }}
          id="custom-image-container"
          className="cursor-pointer bg-center bg-cover  w-[520px] h-[390px] flex-col overflow-hidden flex items-center"
        >
          <div className="h-56 bg-slate-600F mt-16">
            <div className="poppins hit-the-floor text-6xl drop-shadow-sm text-center font-bold tracking-widest uppercase text-white">
              Playlist
            </div>
            <div className="hit-the-floor poppins mt-3 drop-shadow-sm text-center text-8xl font-bold tracking-widest uppercase text-white">
              #5
            </div>
          </div>
          <div className="hit-the-floor poppins text-4xl font-bold tracking-[1rem] uppercase text-white drop-shadow ">
            deep house
          </div>
          <input {...getInputProps()} />
        </div>
      </div>
    </div>
  )
}

export default Home
