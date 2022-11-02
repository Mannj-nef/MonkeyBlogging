import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import styled from "styled-components";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { Button } from "../../components/button";
import { Field } from "../../components/field";
import { Form } from "../../components/form";
import { IconEyeClose, IconEyeOpen } from "../../components/icons";
import {
  ImageUpload,
  Input,
  InputTogglePassword,
  Radio,
} from "../../components/input";
import { Label } from "../../components/label";
import {
  FIREBASE_COLLECTION,
  ROLE,
  SLUG_SLUGIFY,
  TOAST_TYPE,
  USER_STATUS,
} from "../../utils/constants";
import DashboardHeading from "../dashboard/DashboardHeading";
import { auth, db } from "../../firebase/firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import useFribaseImage from "../../hooks/useFribaseImage";
import slugify from "slugify";
import { useNavigate } from "react-router-dom";
import { ROUTERLINK } from "../../router/Router";

const UserAddNewStyled = styled.div`
  .form-control {
    max-width: 100%;
  }
`;

const UserAddNew = () => {
  const {
    handleSubmit,
    formState,
    watch,
    control,
    setValue,
    getValues,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      displayName: "",
      userName: "",
      password: "",
      email: "",
      status: 2,
      role: 1,
    },
  });

  const navigate = useNavigate();

  const { isSubmitting } = formState;

  const watchStatus = Number(watch("status"));
  const watchRole = Number(watch("role"));

  const {
    handleRemoveImage,
    handleSelectImage,
    imgDone,
    progressImage,
    handlechangeID,
  } = useFribaseImage(setValue, getValues);

  const onSubmit = async (values) => {
    const cloneValues = { ...values };
    cloneValues.email = cloneValues.email.toLowerCase();
    const { email, password, image } = cloneValues;
    const imageDafault =
      "https://kucuklerocakbasi.com.tr/themes/tastyigniter-orange/assets/avatar.png";

    cloneValues.role = Number(cloneValues.role);
    cloneValues.status = Number(cloneValues.status);
    cloneValues.userName = slugify(
      cloneValues.userName || cloneValues.displayName,
      SLUG_SLUGIFY
    );
    delete cloneValues.image_name;
    if (cloneValues.image) delete cloneValues.image;

    try {
      const colRef = collection(db, FIREBASE_COLLECTION.USER);

      await createUserWithEmailAndPassword(auth, email, password);

      await addDoc(colRef, {
        ...cloneValues,
        avatar: image || imageDafault,
        time: serverTimestamp(),
      });

      reset({
        displayName: "",
        userName: "",
        password: "",
        email: "",
        status: 2,
        role: 1,
      });
      handlechangeID();
      toast.success("Add user successly", TOAST_TYPE);
      navigate(ROUTERLINK.DASHBOARD_USER.path);
    } catch (error) {
      console.log(error);
      toast.error(error.message, TOAST_TYPE);
    }
  };
  return (
    <UserAddNewStyled>
      <DashboardHeading title="New user" desc="Add new user"></DashboardHeading>
      <Form handle={handleSubmit(onSubmit)} className="form-control">
        <div className="w-[200px] h-[200px] mx-auto rounded-full mb-10">
          <ImageUpload
            image={getValues("image")}
            onChange={handleSelectImage}
            onRemoveImage={handleRemoveImage}
            progress={progressImage}
            imageDone={imgDone}
            rounder="100%"
            height="100%"
          ></ImageUpload>
        </div>
        <div className="form-wrapper-layout">
          <Field>
            <Label htmlFor="displayName"> Fullname</Label>
            <Input
              control={control}
              placeholder="Enter your fullname"
              name="displayName"
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="userName">User name</Label>
            <Input
              control={control}
              placeholder="Enter your user name"
              name="userName"
            ></Input>
          </Field>
        </div>
        <div className="form-wrapper-layout">
          <Field>
            <Label htmlFor="password"> PassWord</Label>
            <InputTogglePassword
              control={control}
              placeholder="Enter your password"
              name="password"
              iconShow={<IconEyeOpen />}
              iconHide={<IconEyeClose />}
            ></InputTogglePassword>
          </Field>
          <Field>
            <Label htmlFor="email">Email</Label>
            <Input
              control={control}
              placeholder="Enter your Email Address"
              name="email"
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
                checked={watchStatus === USER_STATUS.ACTIVE}
                onClick={() => setValue("status", USER_STATUS.ACTIVE)}
                value={USER_STATUS.ACTIVE}
              >
                Active
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={watchStatus === USER_STATUS.PENDING}
                onClick={() => setValue("status", USER_STATUS.PENDING)}
                value={USER_STATUS.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={watchStatus === USER_STATUS.BANNED}
                onClick={() => setValue("status", USER_STATUS.BANNED)}
                value={USER_STATUS.BANNED}
              >
                Banned
              </Radio>
            </div>
          </Field>
          <Field>
            {/* role */}
            <Label htmlFor="role">Role</Label>
            <div className="flex flex-1 items-center gap-x-5">
              <Radio
                name="role"
                control={control}
                checked={watchRole === ROLE.USER}
                onClick={() => setValue("role", ROLE.USER)}
                value={ROLE.USER}
              >
                User
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={watchRole === ROLE.ADMIN}
                onClick={() => setValue("role", ROLE.ADMIN)}
                value={ROLE.ADMIN}
              >
                Admin
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={watchRole === ROLE.MODERATOR}
                onClick={() => setValue("role", ROLE.MODERATOR)}
                value={ROLE.MODERATOR}
              >
                Moderator
              </Radio>
            </div>
          </Field>
        </div>
        <Button isLoading={isSubmitting} type="submit" className="w-[250px]">
          Add new post
        </Button>
      </Form>
    </UserAddNewStyled>
  );
};

export default UserAddNew;
