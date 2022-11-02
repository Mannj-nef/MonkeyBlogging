import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import styled from "styled-components";

import PostMeta from "../module/posts/PostMeta";
import Layout from "../components/layout";
import PostCategory from "../module/posts/PostCategory";
import PostImage from "../module/posts/PostImage";
import PostTitle from "../module/posts/PostTitle";
import Heading from "../components/layout/Heading";
import PostItem from "../module/posts/PostItem";
import { FIREBASE_COLLECTION } from "../utils/constants";
import { db } from "../firebase/firebase-config";
import PageNotfould from "./PageNotfould";
import useFetchFirebaseData from "../hooks/useFetchFirebaseData";
import AuthorBox from "../components/auth/AuthorBox";

const PostDetailPageStyled = styled.div`
  .post-header {
    margin-top: 82px;
    display: flex;
    align-items: center;
    gap: 67px;
  }
  .post-image {
    flex: 1;
  }
  .post-info {
    flex: 1;
    .post-title {
      color: ${(props) => props.theme.color.green23};
      font-size: 36px;
      line-height: 48px;
      max-width: 525px;
      margin-bottom: 20px;
    }
  }
  .post-content {
    max-width: 820px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
  }
  .entry-content {
    margin-top: 51px;
    color: ${(props) => props.theme.color.black23};

    /* .content-title {
      font-weight: 600;
      text-transform: capitalize;
      margin-bottom: 25px;
    }
    .content-desc {
      font-weight: 500;
      margin-bottom: 35px;
      text-align: justify;
      line-height: 32px;
    }
    figure {
      img {
        border-radius: 20px;
      }
      figcaption {
        margin-top: 20px;
        margin-bottom: 35px;
        max-width: 515px;
        width: 100%;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
        color: ${(props) => props.theme.color.gray6B};
        font-weight: 600;
      }
    } */
  }
  .author {
    margin-top: 37px;
    margin-bottom: 78px;
    display: flex;
    gap: 43px;
    align-items: center;
    color: ${(props) => props.theme.color.black23};
    border-radius: 20px;
    padding-right: 20px;
    background-color: ${(props) => props.theme.color.gray};
    .author-image {
      height: 237px;
      width: 237px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 20px;
      }
    }
    .author-content {
      flex: 1;
      h3 {
        color: ${(props) => props.theme.color.green23};
        margin-bottom: 15px;
        font-weight: 600;
        font-size: 22px;
      }
      p {
        font-weight: 500;
        font-size: 18px;
        line-height: 28px;
      }
    }
  }
  .post-related {
    margin-bottom: 100px;
    .post-heading {
      color: ${(props) => props.theme.color.green23};
    }
  }
`;

const colRefPost = collection(db, FIREBASE_COLLECTION.POST);
// const colRefCategory = collection(db, FIREBASE_COLLECTION.CATEGRORIES);

const PostDetailPage = () => {
  const { slug } = useParams();
  const [postDetail, setPostDetail] = useState({});
  const [postRelated, setPostRelated] = useState([]);

  const date = new Date(postDetail?.time?.seconds * 1000).toLocaleDateString();

  const { data: category } = useFetchFirebaseData(
    postDetail?.category?.id,
    FIREBASE_COLLECTION.CATEGRORIES
  );
  const { data: author } = useFetchFirebaseData(
    postDetail?.author?.id,
    FIREBASE_COLLECTION.USER
  );

  useEffect(() => {
    const queryPost = query(colRefPost, where("slug", "==", slug));

    const unsubscribe = onSnapshot(queryPost, (snapshor) => {
      const postDetail = snapshor.docs.map((doc) => doc.data());
      setPostDetail(...postDetail);
    });
    return unsubscribe;
  }, [slug]);

  // fetch post related
  useEffect(() => {
    if (!category?.title) return;
    const queryCategrory = query(
      colRefPost,
      where("category.title", "==", category?.title)
    );
    const unsubscribe = onSnapshot(queryCategrory, (snapshot) => {
      const postRelated = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPostRelated(postRelated);
    });
    return unsubscribe;
  }, [category]);

  useEffect(() => {
    document.title = "MonkeyBlogging - Detail";
  }, []);

  if (!postDetail) return <PageNotfould></PageNotfould>;
  if (!postDetail.slug) return null;

  return (
    <PostDetailPageStyled>
      <Layout>
        <div className="container">
          <div className="post-header">
            <PostImage
              className="post-image h-[370px]"
              url={postDetail?.image}
            ></PostImage>
            <div className="post-info">
              <PostCategory
                to={`/category/${category?.slug}?id=${postDetail?.category?.id}`}
              >
                {category?.title}
              </PostCategory>
              <PostTitle className="post-title">{postDetail?.title}</PostTitle>
              <PostMeta
                toAuthor={`/author/${author?.userName}?id=${postDetail?.author?.id}`}
                authorName={author?.userName}
                date={date}
              ></PostMeta>
            </div>
          </div>
          <div className="post-content">
            <div className="entry-content">
              {parse(postDetail?.content || "")}

              {/* <figure>
                <img
                  src="https://images.unsplash.com/photo-1580522154071-c6ca47a859ad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  alt="monkey blogging"
                />
                <figcaption>
                  Gastronomy atmosphere set aside. Slice butternut cooking home.
                </figcaption>
              </figure> */}

              <h3 className="content-tiauthortle">chương 2</h3>
              <p className="content-desc">
                Gastronomy atmosphere set aside. Slice butternut cooking home.
                Delicious romantic undisturbed raw platter will meld. Thick
                Skewers skillet natural, smoker soy sauce wait roux. slices
                rosette bone-in simmer precision alongside baby leeks. Crafting
                renders aromatic enjoyment, then slices taco. Minutes
                undisturbed cuisine lunch magnificent mustard curry. Juicy share
                baking sheet pork. Meals ramen rarities selection, raw pastries
                richness magnificent atmosphere. Sweet soften dinners, cover
                mustard infused skillet, Skewers on culinary experience.
              </p>
            </div>

            <AuthorBox
              author={author || {}}
              authorId={postDetail?.author?.id}
            ></AuthorBox>
          </div>
          <div className="post-related">
            <Heading className="post-heading">Bài viết liên quan</Heading>
            <div className="grid-layout ">
              {!!postRelated.length &&
                postRelated
                  .slice(0, 4)
                  .map((post) => (
                    <PostItem key={post.id} post={post}></PostItem>
                  ))}
            </div>
          </div>
        </div>
      </Layout>
    </PostDetailPageStyled>
  );
};

export default PostDetailPage;
