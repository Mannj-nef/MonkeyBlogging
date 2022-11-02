import React from "react";
import { doc } from "firebase/firestore";
import { ActionDelete, ActionEdit, ActionView } from "../../components/action";
import { db } from "../../firebase/firebase-config";
import useFetchFirebaseData from "../../hooks/useFetchFirebaseData";
import { FIREBASE_COLLECTION, POST_STATUS } from "../../utils/constants";
import LabelStatus from "../../components/label/LabelStatus";
import { useNavigate } from "react-router-dom";
import { ROUTERLINK } from "../../router/Router";

const PostTableTr = ({ post }) => {
  const { data: userName } = useFetchFirebaseData(
    post?.author?.id,
    FIREBASE_COLLECTION.USER
  );
  const { data: categoryName } = useFetchFirebaseData(
    post?.category?.id,
    FIREBASE_COLLECTION.CATEGRORIES
  );

  const navigate = useNavigate();

  const date = new Date(post.time?.seconds * 1000).toLocaleDateString("vi-VI");

  const renderStatusUser = (status) => {
    const statusNumber = Number(status);
    switch (statusNumber) {
      case POST_STATUS.APPROVED:
        return <LabelStatus type="success">Approved</LabelStatus>;
      case POST_STATUS.PENDING:
        return <LabelStatus type="warning">Pending</LabelStatus>;
      case POST_STATUS.REJECT:
        return <LabelStatus type="danger">Reject</LabelStatus>;
      default:
        break;
    }
  };

  return (
    <tr>
      <td>{post.id.slice(0, 5) + "..."}</td>
      <td>
        <div className="flex items-center gap-5">
          <div className="w-[80px] h-[60px]">
            <img
              src={post.image}
              alt="img-lap"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">{post.title}</h3>
            <time className="text-sm text-gray-500">Date: {date}</time>
          </div>
        </div>
      </td>
      <td>
        <span>{categoryName?.title}</span>
      </td>
      <td>
        <span>{userName?.displayName}</span>
      </td>
      <td>
        <span>{renderStatusUser(post.status)}</span>
      </td>
      <td>
        <div className="action flex items-center gap-x-3 text-gray-500">
          <ActionView to={post?.slug}></ActionView>
          <ActionEdit
            handle={() =>
              navigate(
                `${ROUTERLINK.DASHBOARD_UPDATE_POST.path}?id=${post?.id}`
              )
            }
          ></ActionEdit>
          <ActionDelete
            docRef={doc(db, FIREBASE_COLLECTION.POST, post.id)}
          ></ActionDelete>
        </div>
      </td>
    </tr>
  );
};

export default PostTableTr;
