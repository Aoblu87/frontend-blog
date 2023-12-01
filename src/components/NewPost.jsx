import { useState } from "react";
import ReactQuill from "react-quill";

export default function NewPost() {
  return (
    <>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        Nuovo Post
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Hello!</h3>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Title</span>
            </div>
            <input
              type="text"
              placeholder="Announcing new software"
              className="input input-bordered w-full max-w-xs"
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Category</span>
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
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Add cover</span>
            </div>
            <input
              type="file"
              className="file-input file-input-bordered w-full max-w-xs"
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Read time</span>
            </div>
            <select className="select select-bordered select-xs w-full max-w-xs">
              <option disabled selected>
                Minute
              </option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </label>
        </div>
      </dialog>
    </>
  );
}
