import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import styled from "styled-components";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import * as yup from "yup";

import Button from "../../components/button/Button";
import { Dropdown } from "../../components/dropdown";
import Field from "../../components/field/Field";
import { Form } from "../../components/form";
import { Input, Toggle, Radio, ImageUpload } from "../../components/input/";
import Label from "../../components/label/Label";
import Heading from "../../components/layout/Heading";
import {
  FIREBASE_COLLECTION,
  POST_STATUS,
  SLUG_SLUGIFY,
  TOAST_TYPE,
  VALIDATE_YUP,
} from "../../utils/constants";

import useFribaseImage from "../../hooks/useFribaseImage";
import { db } from "../../firebase/firebase-config";
import { toast } from "react-toastify";
import { useAuthContext } from "../../contexts/auth-context";
import { useNavigate } from "react-router-dom";
import { ROUTERLINK } from "../../router/Router";

const PostAddNewStyled = styled.div`
  .form-control {
    max-width: 100%;
    margin-top: 40px;
  }
`;

const schema = yup.object({
  title: VALIDATE_YUP.TEXT,
});

const PostAddNew = () => {
  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState("Select the category");
  const { userInfo } = useAuthContext();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    getValues,
    formState,
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: {
      status: 2,
      category: {},
      author: {},
      title: "",
      slug: "",
      image: "",
      host: false,
    },
  });
  const { isSubmitting } = formState;

  const {
    handleRemoveImage,
    handleSelectImage,
    imgDone,
    progressImage,
    handlechangeID,
  } = useFribaseImage(setValue, getValues);

  const watchHost = watch("host");
  const watchStatus = Number(watch("status"));

  const handleSelectCategory = (category) => {
    const { title } = category;
    setValue("category", category);
    setSelectCategory(title);
  };

  const onSubmit = async (values) => {
    const cloneValues = { ...values };
    const collRef = collection(db, FIREBASE_COLLECTION.POST);

    try {
      cloneValues.status = Number(cloneValues.status);
      cloneValues.slug = slugify(
        cloneValues.slug || cloneValues.title,
        SLUG_SLUGIFY
      );

      await addDoc(collRef, {
        ...cloneValues,
        time: serverTimestamp(),
      });
      toast.success("Create new post successful", TOAST_TYPE);
      reset({
        status: 2,
        category: "",
        title: "",
        slug: "",
        image: "",
        host: false,
      });
      handlechangeID();
      setSelectCategory("Select the category");
      navigate(ROUTERLINK.DASHBOARD_POST.path);
    } catch (error) {
      console.error(error);
      toast.error("Create post failed", TOAST_TYPE);
    }
  };
  // real time query data categrory
  useEffect(() => {
    const colRef = collection(db, FIREBASE_COLLECTION.CATEGRORIES);
    const q = query(colRef, where("status", "==", POST_STATUS.APPROVED));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const result = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setCategories(result);
    });

    return unsubscribe;
  }, []);

  // get user
  useEffect(() => {
    const colRef = collection(db, FIREBASE_COLLECTION.USER);
    if (!userInfo?.email) return;

    const queryUser = query(colRef, where("email", "==", userInfo?.email));
    const unsubscribe = onSnapshot(queryUser, (snapshot) => {
      const user = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(user);
      setValue("author", ...user);
    });
    return unsubscribe;
  }, [userInfo, setValue]);

  // add title
  useEffect(() => {
    document.title = "Monkey Blogging - Add new post";
  }, []);

  return (
    <PostAddNewStyled>
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
        <Button isLoading={isSubmitting} type="submit" className="w-[250px]">
          Add new post
        </Button>
      </Form>
    </PostAddNewStyled>
  );
};

export default PostAddNew;
