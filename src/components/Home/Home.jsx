import BlogList from "../BlogList/BlogList";

export default function Home(props) {
  const { result } = props;
  return (
    <>
      <div className="container my-5 flex justify-center ">
        <BlogList result={result} />
      </div>
    </>
  );
}
