import { Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { ENV } from "../../../../utils";
import { DateTime } from "luxon";
import "./PostItem.scss";

export function PostItem(props) {
  const { post } = props;
  const date = new Date(post.createdAt);

  return (
    <Link className="post-list-item" to={`/blog/${post.path}`}>
      <Image src={`${ENV.BASE_PATH}/${post.miniature}`} fluid />
      <h2>{post.title}</h2>
      <span>
        {DateTime.fromISO(date.toISOString())
          .setLocale("en")
          .toFormat("LLLL dd', ' yyyy")}
      </span>
    </Link>
  );
}
