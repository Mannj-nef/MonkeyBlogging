import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import slugify from "slugify";
import styled from "styled-components";
import ReactQuill, { Quill } from "react-quill";
import ImageUploader from "quill-image-uploader";
import "react-quill/dist/quill.snow.css";

import { Button } from "../../components/button";
import { Dropdown } from "../../components/dropdown";
import { Field } from "../../components/field";
import { Form } from "../../components/form";
import { ImageUpload, Input, Radio, Toggle } from "../../components/input";
import { Label } from "../../components/label";
import Heading from "../../components/layout/Heading";
import { db } from "../../firebase/firebase-config";
import useFetchFirebaseData from "../../hooks/useFetchFirebaseData";
import useFribaseImage from "../../hooks/useFribaseImage";
import PageNotfould from "../../pages/PageNotfould";
import { ROUTERLINK } from "../../router/Router";
import {
  FIREBASE_COLLECTION,
  POST_STATUS,
  SLUG_SLUGIFY,
  TOAST_TYPE,
} from "../../utils/constants";
import { imgbbAPI } from "../../utils/configApi";
import axios from "axios";

Quill.register("modules/imageUploader", ImageUploader);

const PostUpdateStyled = styled.div`
  form {
    max-width: 100%;
  }
`;

// const tollBarContent = ;

const PostUpdate = () => {
  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  const [content, setContent] = useState("");
  const regexImage = useRef(/%2F(\S+)\?/).current;
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { isSubmitting },
    watch,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      host: false,
      category: {},
      image: "",
      image_name: "",
      slug: "",
      status: 0,
      title: "",
      content,
    },
  });

  const watchStatus = Number(watch("status"));
  const watchHost = Number(watch("host"));
  const watchCategoryId = watch("category").id;

  const imageName = !!getValues("image_name") ? getValues("image_name") : null;

  const [searchParam] = useSearchParams();
  const postId = searchParam.get("id");

  const docRefPost = useRef(doc(db, FIREBASE_COLLECTION.POST, postId)).current;

  const { handleRemoveImage, handleSelectImage, imgDone, progressImage } =
    useFribaseImage(setValue, getValues, imageName, updateDeleteDoc);

  async function updateDeleteDoc() {
    await updateDoc(docRefPost, {
      image: "",
    });
    setValue("image", "");
  }

  const { data: category } = useFetchFirebaseData(
    watchCategoryId,
    FIREBASE_COLLECTION.CATEGRORIES
  );

  const modules = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["link", "image"],
      ],
      imageUploader: {
        // imgbbAPI
        upload: async (file) => {
          const bodyFormData = new FormData();
          bodyFormData.append("image", file);
          console.log(bodyFormData);
          const response = await axios({
            method: "post",
            url: imgbbAPI,
            data: bodyFormData,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          console.log(response);
          return response.data.data.url;
        },
      },
    }),
    []
  );

  const handleSelectCategory = (category) => {
    const { title } = category;
    setValue("category", category);
    setSelectCategory(title);
  };

  const onSubmit = async (values) => {
    const newValues = { ...values };
    newValues.status = Number(newValues.status);
    newValues.slug = slugify(newValues.slug || newValues.title, SLUG_SLUGIFY);
    newValues.content = content;

    try {
      await updateDoc(docRefPost, newValues);
      toast.success("uppdate post successfuly", TOAST_TYPE);
      navigate(ROUTERLINK.DASHBOARD_POST.path);
    } catch (error) {
      console.error(error);
      toast.error(error.message, TOAST_TYPE);
    }
  };

  // fetch data fullfied
  useEffect(() => {
    const unSubscribe = onSnapshot(docRefPost, (snapshot) => {
      const post = snapshot.data();
      const content = post.content ? post.content : "";
      reset(post);
      setValue("content", content);
      setContent(content);

      if (post.image?.match(regexImage)) {
        setValue("image", post.image);
      } else {
        setValue("image", "");
      }
    });
    return unSubscribe;
  }, [docRefPost, regexImage, reset, setValue]);

  // fetch data category
  useEffect(() => {
    const collRef = collection(db, FIREBASE_COLLECTION.CATEGRORIES);
    const unsubscribe = onSnapshot(collRef, (snapshot) => {
      const categories = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategories(categories);
    });
    return unsubscribe;
  }, [docRefPost]);

  // setSelectCategory
  useEffect(() => {
    if (category) {
      setSelectCategory(category.title);
    }
  }, [category]);

  if (!postId) return <PageNotfould></PageNotfould>;
  return (
    <PostUpdateStyled>
      <Heading className="heading">Add new post</Heading>
      <Form handle={handleSubmit(onSubmit)} className="form-control">
        <div className="form-wrapper-layout">
          <Field>
            <Label htmlFor="title">Title</Label>
            <Input
              control={control}
              placeholder="Enter your title"
              name="title"
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="slug">Slug</Label>
            <Input
              control={control}
              placeholder="Enter your slug"
              name="slug"
            ></Input>
          </Field>
        </div>
        <div className="form-wrapper-layout">
          <Field>
            <Label htmlFor="image">Image</Label>
            <ImageUpload
              image={getValues("image")}
              onChange={handleSelectImage}
              onRemoveImage={handleRemoveImage}
              progress={progressImage}
              imageDone={imgDone}
            ></ImageUpload>
          </Field>
          <Field>
            <Label htmlFor="category">Category</Label>
            <Dropdown>
              <Dropdown.Select placeholder={selectCategory}></Dropdown.Select>
              <Dropdown.List>
                {!!categories.length &&
                  categories.map((category) => (
                    <Dropdown.Option
                      key={category.id}
                      onClick={() => handleSelectCategory(category)}
                    >
                      {category.title}
                    </Dropdown.Option>
                  ))}
              </Dropdown.List>
            </Dropdown>
          </Field>
        </div>
        <div className="post-content entry-content">
          <Field>
            <Label htmlFor="content">Content</Label>
            <ReactQuill
              modules={modules}
              theme="snow"
              value={content}
              onChange={setContent}
              id="content"
              placeholder="Write something..."
            />
            <div className=""></div>
          </Field>
        </div>
        <div className="form-wrapper-layout">
          <Field>
            <Label htmlFor="status">Status</Label>
            <div className="flex flex-1 items-center gap-x-5">
              <Radio
                name="status"
                control={control}
                checked={watchStatus === POST_STATUS.APPROVED}
                onClick={() => setValue("status", POST_STATUS.APPROVED)}
                value={POST_STATUS.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={watchStatus === POST_STATUS.PENDING}
                onClick={() => setValue("status", POST_STATUS.PENDING)}
                value={POST_STATUS.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={watchStatus === POST_STATUS.REJECT}
                onClick={() => setValue("status", POST_STATUS.REJECT)}
                value={POST_STATUS.REJECT}
              >
                Reject
              </Radio>
            </div>
          </Field>
          <Field>
            <Label htmlFor="host">Feature post</Label>
            <Toggle
              on={watchHost}
              onClick={() => setValue("host", !watchHost)}
            ></Toggle>
          </Field>
        </div>
        <Button isLoading={isSubmitting} type="submit" className="w-[250px]">
          Update post
        </Button>
      </Form>
    </PostUpdateStyled>
  );
};

export default PostUpdate;
