import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import * as htmlToImage from "html-to-image"
import { Link } from "react-router-dom"
import { customAlphabet } from "nanoid"
import download from "downloadjs"
import { pageButtons } from "../shared/pageButtons"
import profileImage from "../assets/img/profile.png"

function Home() {
  const [uploadedImage, setUploadedImage] = useState(null)
  const [playlistNumber, setPlaylistNumber] = useState(null)
  const [genreName, setGenreName] = useState("South Africa")
  const [imageDownloadName, setImageDownloadName] = useState("")
  const selectedPageIndex = 3

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
        <p>Playlist no. </p>
        <input
          required
          type="number"
          value={playlistNumber}
          onChange={e => setPlaylistNumber(e.target.value)}
          className="border w-32 rounded p-2 border-neutral-400"
        />
        <p>Genre: </p>
        <input
          required
          type="text"
          value={genreName}
          onChange={e => setGenreName(e.target.value)}
          className="border w-32 rounded p-2 border-neutral-400"
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
          className="cursor-pointer bg-center bg-cover w-[360px] h-[360px] flex-shrink-0 flex-col overflow-hidden flex items-center"
        >
          <div className="ml-4 mt-4 mr-auto w-12 h-12 opacity-20">
            <img src={profileImage} alt="" />
          </div>
          <div className="h-36 title_stroke mt-5 ml-2F w-full">
            <div className="poppins w-full text-[4rem] text-center font-bold tracking-wide uppercaseF">
              Top 50
            </div>
            <div className="poppins text-center text-[5rem] font-bold tracking-widest uppercase">
              {playlistNumber}
            </div>
          </div>
          <div className="h-36 title_stroke -mt-[9.3rem] w-full">
            <div className="poppins w-full playlist_titleF text-[4rem] text-center font-bold tracking-wide uppercaseF">
              Top 50
            </div>
            <div className="playlist_titleF title_strokeF poppins text-center text-[5rem] font-bold tracking-widest uppercase">
              {playlistNumber}
            </div>
          </div>
          <div className="h-36 -mt-36 w-full z-36">
            <div className="poppins w-full text-[4rem] text-center font-bold tracking-wide uppercaseF text-white">
              Top 50
            </div>
            <div className="poppins text-center text-[5rem] font-bold tracking-widest uppercase text-white">
              {playlistNumber}
            </div>
          </div>
          <div className=" poppins text-[1rem] font-bold tracking-[.5rem] uppercase text-white ">
            {genreName}
          </div>
          <input {...getInputProps()} />
        </div>
      </div>
    </div>
  )
}

export default Home
