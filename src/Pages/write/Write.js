import { useContext, useState } from "react";
import axios from "../../http";
import { Context } from "../../context/Context";
import "./write.css"

export default function Write() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
      const newPost = {
        username: user.username,
        title,
        description,
      };
      if (file) {
        const data =new FormData();
        const filename = Date.now() + file.name;
        data.append("name", filename);
        data.append("file", file);
        newPost.photo = filename;
        try {
          await axios.post("/upload", data);
        } catch (err) {}
      }
      try {
        const res = await axios.post("/posts", newPost);
        window.location.replace("/post/" + res.data._id);
      } catch (err) {}
    }

  return (
    <div className="write">
      {file && (
            <img src={URL.createObjectURL(file)} alt="PostImage" className="writetImg" />
         )}
        <form  className="writeForm" onSubmit={handleSubmit}>
          <div className="writeFormGroup">
            <label htmlFor="fileInput">
             <i className="writeIcon fa-solid fa-plus"></i>
            </label>
            <input type="file" id="fileInput" style={{display:"none"}} onChange={(e) => setFile(e.target.files[0])}/>
            <input 
              placeholder="Title" 
              className="writeInput" 
              autoFocus={true} 
              type="text" 
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="writeFormGroup">
            <textarea 
              placeholder="Tell your Story.." 
              type="text" 
              className="writeInput writeText"
              onChange={(e) => setDescription(e.target.value)}>
            </textarea>
          </div>
          <button className="writeSubmit" type="submit">Publish</button>
        </form>
    </div>
  )
}
