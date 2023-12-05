export default function AddComments() {
  return (
    <>
      <div>
        <h1 className="text-xl flex justify-center font-bold">Add comment</h1>
      </div>
      <form>
        <div className="flex flex-col items-center my-5">
          <div className="flex flex-row ">
            <div className="flex flex-col mb-3 mx-5">
              <label>Author</label>
              <input
                type="text"
                placeholder="34523454353"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="flex flex-col mb-3 mx-5">
              <label>Created At</label>
              <input
                type="text"
                placeholder="23 Gennaio 2034"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
          </div>
          <div className="flex flex-col my-5">
            <div className="rating flex flex-col items-center mx-5">
              <div className="mb-3 ">
                <label>Rating:</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="rating-1"
                  className="mask mask-star"
                />
                <input
                  type="radio"
                  name="rating-1"
                  className="mask mask-star"
                  defaultChecked={true}
                />
                <input
                  type="radio"
                  name="rating-1"
                  className="mask mask-star"
                />
                <input
                  type="radio"
                  name="rating-1"
                  className="mask mask-star"
                />
                <input
                  type="radio"
                  name="rating-1"
                  className="mask mask-star"
                />
              </div>
            </div>
            <div className="my-6 mx-5">
              <textarea
                className="textarea textarea-primary"
                placeholder="Very interesting..."
                type="text"
                // required
                // value={text}
                // onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
