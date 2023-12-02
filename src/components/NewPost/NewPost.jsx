import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styles from "./styles.module.scss";
import cn from "classnames";

export default function NewPost() {
  return (
    <>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        Add Post
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box max-h-fit">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
            <h3 className="font-bold text-lg flex justify-center">New Post</h3>
            <label className="form-control w-full max-w-[100%] mb-3">
              <div className="label">
                <span className="label-text font-bold">Title</span>
              </div>
              <input
                type="text"
                placeholder="Announcing new software"
                className="input input-bordered w-full max-w-[100%] mb-3"
              />
            </label>
            <label className="form-control w-full max-w-[100%] mb-3">
              <div className="label">
                <span className="label-text font-bold">Category</span>
              </div>
              <select className="select select-bordered">
                <option disabled selected>
                  Pick one
                </option>
                <option>Software</option>
                <option>Job's Interviews</option>
                <option>AI </option>
                <option>Frontend</option>
                <option>Backend</option>
              </select>
            </label>
            <label className="form-control w-full max-w-[100%] mb-3">
              <div className="label">
                <span className="label-text font-bold">Add cover</span>
              </div>
              <input
                type="file"
                className="file-input file-input-bordered w-full max-w-[100%] mb-3"
              />
            </label>
            <label className="form-control w-full max-w-[100%] mb-3">
              <div className="label">
                <span className="label-text font-bold">Read time</span>
              </div>
              <select className="select select-bordered select-xs w-full max-w-[100%] mb-3">
                <option disabled selected>
                  Minute
                </option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </label>
            <label
              className={cn(
                "form-control w-full max-w-[100%] mb-3 ",
                styles.newBlogContentContainer
              )}
            >
              <div className="label">
                <span className="label-text font-bold">Comment</span>
              </div>
              <ReactQuill
                theme="snow"
                className={cn("max-h-24", styles.newBlogContent)}
              />
            </label>
            <div className="flex justify-end my-5 ">
              <button className="btn btn-success ">Success</button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}
