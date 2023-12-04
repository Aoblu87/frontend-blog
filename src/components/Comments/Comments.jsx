import AddComments from "./AddComment/AddComment";
import CommentsList from "./CommentsList/CommentsList";
export default function Comments(props) {
  const { id } = props;
  return (
    <div className="container mx-auto my-5">
      <div className="flex flex-col">
        <CommentsList id={id} />
      </div>
      <div className="column-1">
        <AddComments />
      </div>
    </div>
  );
}
