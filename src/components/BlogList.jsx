import BlogItem from "./BlogItem";

export default function BlogList() {
  return (
    <>
      <div className="container my-5 flex justify-center">
        <div className="grid-rows-3 ">
          <BlogItem />
        </div>
      </div>
    </>
  );
}
