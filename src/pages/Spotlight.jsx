import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import * as htmlToImage from "html-to-image"
import { Link } from "react-router-dom"
import { customAlphabet } from "nanoid"
import download from "downloadjs"
import { pageButtons } from "../shared/pageButtons"

function Home() {
  const [uploadedImage, setUploadedImage] = useState(null)
  const [artistName, setArtistName] = useState("Name")
  const [imageDownloadName, setImageDownloadName] = useState("")
  const selectedPageIndex = 2

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
        <p>Artist: </p>
        <input
          required
          type="text"
          value={artistName}
          onChange={e => setArtistName(e.target.value)}
          className="border rounded p-2 border-neutral-400"
        />
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
          className="cursor-pointer bg-top bg-cover w-[480px] h-[360px] flex-col flex-shrink-0 overflow-hidden flex items-center justify-end"
        >
          <div className="h-60 flex justify-end items-end px-5">
            <div className="uppercase poppins title_stroke poppins_boldF poppins  text-5xlf text-[2.75rem] spotlight_titlef ml-2f leading-tight text-center tracking-widest">
              {artistName}
            </div>
          </div>
          <div className="h-60 -mt-[15.3rem] flex justify-end items-end  px-5">
            <div className="uppercase poppins ml-3F title_stroke poppins_boldF poppins  text-5xlf text-[2.75rem] spotlight_titlef ml-2f leading-tight text-center tracking-widest">
              {artistName}
            </div>
          </div>
          <div className="h-60 flex justify-end items-end -mt-60 px-5 -translate-y-fullF">
            <div className="uppercase  poppins_boldF poppins text-[2.75rem] leading-tight text-center tracking-widest text-white">
              {artistName}
            </div>
          </div>
          <div className="mt-5 mb-5 border-2 border-white roundedF w-fullF text-center pt-1.5 pb-1 pr-2 poppins_bold text-[1.2rem] tracking-[.45rem] pl-4 uppercase text-white ">
            Spotlight
          </div>
          <input {...getInputProps()} />
        </div>
      </div>
    </div>
  )
}

export default Home
