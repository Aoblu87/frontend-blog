import { Link } from "react-router-dom";

export default function BlogItem(props) {
  const { title, cover, author, _id } = props;
  return (
    <>
      <Link to={`/blog/${_id}`} className="blog-link">
        <div className="card w-96 h-70 bg-base-100 shadow-xl p-2 mx-3 mb-5">
          <figure>
            <img
              src={cover}
              alt={title}
              className="aspect-square object-cover"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{title}</h2>

            <div className="card-actions flex justify-start align-middle mt-2">
              <div className="avatar flex align-middle">
                <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={author.avatar} />
                </div>
              </div>
              <div className="flex align-middle">
                <p className="flex align-middle">
                  di {author.firstName} {author.lastName}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
