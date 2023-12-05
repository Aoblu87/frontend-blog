import AddComments from "./AddComment/AddComment";
import CommentsList from "./CommentsList/CommentsList";
export default function Comments(props) {
  const { id } = props;
  return (
    <div className="container mx-auto my-5">
      <div className="flex justify-center mb-5">
        <h1 className="text-xl"></h1>
      </div>
      <div className="flex flex-col my-5">
        <CommentsList id={id} />
      </div>
      <div className="flex flex-col justify-center my-6">
        <AddComments />
      </div>
    </div>
  );
}
